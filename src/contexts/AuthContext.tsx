'use client';

import { createContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import { UserRole } from '../types/database';

interface AuthContextType {
  user: User | null;
  userRole: UserRole;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function getUserRole() {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setUserRole(data.role);
        }
      } else {
        setUserRole('guest');
      }
    }

    getUserRole();
  }, [user]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
  const signOut = async () => {
    try {
      // Check if there's an active session before attempting to sign out
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } else {
        // If no session, just clear the local state
        console.log('No active session found, clearing local state');
        setUser(null);
        setUserRole('guest');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
      // Even if signOut fails, clear local state
      setUser(null);
      setUserRole('guest');
      // Don't re-throw the error to prevent UI breaking
    }
  };const signUp = async (email: string, password: string, name: string) => {
    const { error: authError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { name }
      }
    });
    if (authError) throw authError;
    
    // Note: User profile is automatically created by database trigger
    // No manual database insert needed
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userRole,
      isLoading, 
      signIn, 
      signOut, 
      signUp 
    }}>
      {children}
    </AuthContext.Provider>
  );
}