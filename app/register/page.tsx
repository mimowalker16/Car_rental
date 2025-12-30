'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormInput } from '@/src/components/common/FormInput';
import { AlgerianPhoneInput } from '@/src/components/common/AlgerianPhoneInput';
import { useAuth } from '@/src/hooks/useAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.name);
      router.push('/dashboard');    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      setErrors({
        form: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-pink-500/10 rounded-full blur-xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Glassmorphism Container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 transform hover:scale-110 transition-transform">
              <span className="text-2xl font-bold text-white font-playfair">T</span>
            </div>
            <h2 className="text-3xl font-playfair font-bold text-white mb-2">
              Join Techno Cars
            </h2>
            <p className="text-blue-100/80">
              Create your account and start your premium journey
            </p>
            <p className="mt-4 text-sm text-blue-100/60">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-blue-300 hover:text-blue-200 font-medium transition-colors underline underline-offset-2"
              >
                Sign in here
              </Link>
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.form && (
              <div className="rounded-xl bg-red-500/10 border border-red-400/20 p-4 backdrop-blur-sm">
                <p className="text-sm text-red-200">{errors.form}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <FormInput
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />              <FormInput
                label="Email address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />

              <AlgerianPhoneInput
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                error={errors.phone}
              />
              
              <FormInput
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
              />

              <FormInput
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 
                rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] 
                hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400/30
                ${isLoading ? 'opacity-75 cursor-not-allowed scale-100' : 'hover:from-blue-600 hover:to-purple-600'}
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}