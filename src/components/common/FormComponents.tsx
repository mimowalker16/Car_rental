'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

// Base Input Component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
}

export function Input({
  label,
  error,
  helpText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  ...props
}: InputProps) {
  const baseClasses = [
    'block w-full transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    error && 'border-red-500 focus:ring-red-500/50'
  ].filter(Boolean).join(' ');

  const variantClasses = {
    default: 'border border-gray-300 rounded-xl px-4 py-3 bg-white',
    filled: 'border-0 rounded-xl px-4 py-3 bg-gray-100 focus:bg-white',
    outlined: 'border-2 border-gray-300 rounded-xl px-4 py-3 bg-transparent'
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="text-gray-400">
              {rightIcon}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}

// Textarea Component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'filled' | 'outlined';
}

export function Textarea({
  label,
  error,
  helpText,
  variant = 'default',
  className = '',
  ...props
}: TextareaProps) {
  const baseClasses = [
    'block w-full transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
    error && 'border-red-500 focus:ring-red-500/50'
  ].filter(Boolean).join(' ');

  const variantClasses = {
    default: 'border border-gray-300 rounded-xl px-4 py-3 bg-white',
    filled: 'border-0 rounded-xl px-4 py-3 bg-gray-100 focus:bg-white',
    outlined: 'border-2 border-gray-300 rounded-xl px-4 py-3 bg-transparent'
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}

// Select Component
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  placeholder?: string;
  variant?: 'default' | 'filled' | 'outlined';
}

export function Select({
  label,
  error,
  helpText,
  placeholder,
  variant = 'default',
  className = '',
  children,
  ...props
}: SelectProps) {
  const baseClasses = [
    'block w-full transition-all duration-300 appearance-none',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
    error && 'border-red-500 focus:ring-red-500/50'
  ].filter(Boolean).join(' ');

  const variantClasses = {
    default: 'border border-gray-300 rounded-xl px-4 py-3 bg-white',
    filled: 'border-0 rounded-xl px-4 py-3 bg-gray-100 focus:bg-white',
    outlined: 'border-2 border-gray-300 rounded-xl px-4 py-3 bg-transparent'
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}

// Checkbox Component
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export function Checkbox({
  label,
  description,
  className = '',
  ...props
}: CheckboxProps) {
  return (
    <div className="flex items-start">
      <input
        type="checkbox"
        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300 ${className}`}
        {...props}
      />
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}

// Radio Group Component
interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  variant?: 'default' | 'cards';
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  error,
  variant = 'default'
}: RadioGroupProps) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className={variant === 'cards' ? 'space-y-3' : 'space-y-2'}>
        {options.map((option) => (
          <div key={option.value}>
            {variant === 'cards' ? (
              <label className={`relative flex cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                value === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-500">{option.description}</div>
                  )}
                </div>
                <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                  value === option.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {value === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </label>
            ) : (
              <div className="flex items-start">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 transition-all duration-300"
                />
                <div className="ml-3">
                  <label className="text-sm font-medium text-gray-700">
                    {option.label}
                  </label>
                  {option.description && (
                    <p className="text-sm text-gray-500">{option.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
