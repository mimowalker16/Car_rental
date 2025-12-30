'use client';

import { useAuth } from '@/src/hooks/useAuth';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/src/config/supabase';
import { AlgerianPhoneInput } from '@/src/components/common/AlgerianPhoneInput';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  created_at: string;
  avatar_url?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const loadProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);      setEditForm({
        name: data.name || '',
        phone: data.phone || '',
        address: data.address || ''
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user, loadProfile]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {      const { error } = await supabase
        .from('users')
        .update({
          name: editForm.name,
          phone: editForm.phone,
          address: editForm.address
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setProfile(prev => prev ? {
        ...prev,
        name: editForm.name,
        phone: editForm.phone,
        address: editForm.address
      } : null);

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="relative z-10 backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white/60 rounded-full animate-spin"></div>
            <p className="text-white/90 font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
                  My Profile
                </h1>
                <p className="text-white/80 text-lg">Manage your personal information and preferences</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Edit Profile</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setIsEditing(false);                        setEditForm({
                          name: profile?.name || '',
                          phone: profile?.phone || '',
                          address: profile?.address || ''
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/20 p-6 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || (
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    )}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  {profile?.name || user?.email?.split('@')[0] || 'User'}
                </h2>
                <p className="text-slate-600 mb-4">{profile?.email || user?.email}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-slate-500">Member since:</span>
                    <span className="text-slate-900 font-medium">
                      {formatDate(profile?.created_at || '')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Completion</h3>
                <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Basic Info</span>
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Complete
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Contact Details</span>
                  <span className={`text-sm font-medium flex items-center ${profile?.phone ? 'text-green-600' : 'text-yellow-600'}`}>
                    {profile?.phone ? (
                      <>
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Complete
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Incomplete
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Form */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/20 p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Personal Information</h3>
                {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <AlgerianPhoneInput
                        value={editForm.phone}
                        onChange={(phone) => setEditForm({ ...editForm, phone })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full address"
                    />
                  </div>
                </div>              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <dt className="text-sm font-medium text-slate-500 mb-1">Full Name</dt>
                      <dd className="text-lg text-slate-900">{profile?.name || 'Not provided'}</dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-slate-500 mb-1">Email</dt>
                      <dd className="text-lg text-slate-900">{profile?.email}</dd>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <dt className="text-sm font-medium text-slate-500 mb-1">Phone Number</dt>
                      <dd className="text-lg text-slate-900">{profile?.phone || 'Not provided'}</dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-slate-500 mb-1">Account Status</dt>
                      <dd className="text-lg text-green-600 font-medium">Active</dd>
                    </div>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-slate-500 mb-1">Address</dt>
                    <dd className="text-lg text-slate-900">{profile?.address || 'Not provided'}</dd>
                  </div>
                </div>
              )}
            </div>

            {/* Security Section */}
            <div className="mt-8 backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/20 p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Account Security</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <div>
                    <h4 className="font-medium text-slate-900">Password</h4>
                    <p className="text-sm text-slate-600">Last updated 30 days ago</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                    Change Password
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
                  <div>
                    <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-600">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
