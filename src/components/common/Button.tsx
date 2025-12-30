'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  pulse?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  pulse = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium rounded-xl',
    'transition-all duration-300 transform',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'hover:scale-105 active:scale-95',
    fullWidth && 'w-full',
    pulse && 'animate-pulse'
  ].filter(Boolean).join(' ');

  const variantClasses = {
    primary: [
      'bg-gradient-to-r from-blue-600 to-purple-600',
      'hover:from-blue-700 hover:to-purple-700',
      'text-white shadow-lg hover:shadow-xl',
      'focus:ring-blue-500'
    ].join(' '),
    secondary: [
      'bg-slate-200 hover:bg-slate-300',
      'text-slate-800',
      'focus:ring-slate-500'
    ].join(' '),
    danger: [
      'bg-gradient-to-r from-red-500 to-red-600',
      'hover:from-red-600 hover:to-red-700',
      'text-white shadow-lg hover:shadow-xl',
      'focus:ring-red-500'
    ].join(' '),
    success: [
      'bg-gradient-to-r from-green-500 to-emerald-600',
      'hover:from-green-600 hover:to-emerald-700',
      'text-white shadow-lg hover:shadow-xl',
      'focus:ring-green-500'
    ].join(' '),
    outline: [
      'border-2 border-blue-500 hover:border-blue-600',
      'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
      'focus:ring-blue-500'
    ].join(' '),
    ghost: [
      'text-slate-600 hover:text-slate-800 hover:bg-slate-100',
      'focus:ring-slate-500'
    ].join(' ')
  };

  const sizeClasses = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const LoadingSpinner = () => (
    <svg
      className={`animate-spin ${iconSizeClasses[size]}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoadingSpinner />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className={`${iconSizeClasses[size]} ${children ? 'mr-2' : ''}`}>
          {icon}
        </span>
      )}
      
      {!loading && children && (
        <span>{children}</span>
      )}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className={`${iconSizeClasses[size]} ${children ? 'ml-2' : ''}`}>
          {icon}
        </span>
      )}
    </button>
  );
}

// Icon components for common use cases
export const IconCaretRight = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const IconCheck = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const IconX = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const IconDownload = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
