'use client';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showPercentage = false,
  animated = false,
  className = ''
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-600 mt-1 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}

// Status Badge Component
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'warning';
  text?: string;
  pulse?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  text,
  pulse = false,
  className = ''
}: StatusBadgeProps) {
  const statusConfig = {
    active: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      dotColor: 'bg-green-500',
      defaultText: 'Active'
    },
    inactive: {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      dotColor: 'bg-gray-500',
      defaultText: 'Inactive'
    },
    pending: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      dotColor: 'bg-yellow-500',
      defaultText: 'Pending'
    },
    completed: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      dotColor: 'bg-blue-500',
      defaultText: 'Completed'
    },
    cancelled: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      dotColor: 'bg-red-500',
      defaultText: 'Cancelled'
    },
    warning: {
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      dotColor: 'bg-orange-500',
      defaultText: 'Warning'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor} ${className}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${config.dotColor} ${pulse ? 'animate-pulse' : ''}`} />
      {text || config.defaultText}
    </span>
  );
}

// Step Indicator Component
interface StepIndicatorProps {
  steps: Array<{
    label: string;
    completed?: boolean;
    active?: boolean;
    icon?: React.ReactNode;
  }>;
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

export function StepIndicator({
  steps,
  variant = 'horizontal',
  className = ''
}: StepIndicatorProps) {
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={`${isHorizontal ? 'flex items-center' : 'flex flex-col'} ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className={`flex items-center ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
          {/* Step Circle */}
          <div className="relative flex items-center justify-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                step.completed
                  ? 'bg-green-500 text-white'
                  : step.active
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step.completed ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : step.icon ? (
                step.icon
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
          </div>

          {/* Step Label */}
          <div className={`${isHorizontal ? 'ml-3' : 'mt-2 text-center'}`}>
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                step.completed || step.active ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`${
                isHorizontal
                  ? 'flex-1 h-px mx-4 bg-gray-300'
                  : 'w-px h-8 mx-auto mt-2 bg-gray-300'
              } transition-colors duration-300 ${
                step.completed ? 'bg-green-500' : ''
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Skeleton Loading Components
export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 rounded animate-pulse ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          } h-4`}
        />
      ))}
    </div>
  );
}

export function SkeletonImage({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`}>
      <div className="flex items-center justify-center h-full">
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
