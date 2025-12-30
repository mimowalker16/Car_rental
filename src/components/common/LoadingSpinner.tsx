'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
  text?: string;
}

export function LoadingSpinner({ size = 'md', variant = 'primary', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const variantClasses = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-purple-500 border-t-transparent', 
    white: 'border-white/60 border-t-transparent'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`animate-spin rounded-full border-2 ${sizeClasses[size]} ${variantClasses[variant]}`}></div>
      {text && (
        <p className="text-sm text-slate-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100 animate-pulse">
      <div className="h-56 bg-gradient-to-br from-slate-200 to-slate-300"></div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
          </div>
          <div className="h-12 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
