'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth';
import Link from 'next/link';
import { User } from '@/src/types/database';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AdminUsersPage() {
  const router = useRouter();
  const { userRole } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const supabase = createClientComponentClient();

  const loadUsers = useCallback(async () => {
    try {
      let query = supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (roleFilter !== 'all') {
        query = query.eq('role', roleFilter);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, roleFilter]);

  useEffect(() => {
    if (userRole !== 'admin') {
      router.push('/dashboard');
      return;
    }

    loadUsers();
  }, [userRole, router, loadUsers]);

  const handleRoleUpdate = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;
      await loadUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">        <div className="sm:flex sm:items-center mb-8">
          <div className="sm:flex-auto">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Users Management
            </h1>
            <p className="mt-2 text-white/80 text-lg">
              View and manage user accounts across the platform
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as 'all' | 'admin' | 'user')}
              className="block w-full rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:ring-2 focus:ring-white/40 px-4 py-3"
            >
              <option value="all" className="bg-gray-800 text-white">All Roles</option>
            <option value="admin" className="bg-gray-800 text-white">Admins</option>            <option value="user" className="bg-gray-800 text-white">Users</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/20">
              <thead className="bg-white/5">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Phone
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Joined
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-transparent">{users.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="font-medium text-white">{user.name || 'N/A'}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white/80">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white/80">
                        {user.phone || 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white/80">                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold backdrop-blur border
                          ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-200 border-purple-500/30' : 'bg-green-500/20 text-green-200 border-green-500/30'}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white/80">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex space-x-4">
                          <Link
                            href={`/dashboard/admin/users/${user.id}`}
                            className="text-blue-300 hover:text-blue-200 transition-colors"
                          >
                            View Details
                          </Link>
                          {user.id !== userRole && (
                            <button
                              onClick={() => handleRoleUpdate(
                                user.id,
                                user.role === 'admin' ? 'user' : 'admin'
                              )}
                              className="text-purple-300 hover:text-purple-200 transition-colors"                            >
                              Make {user.role === 'admin' ? 'User' : 'Admin'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}