// buttons/Button.jsx
import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button'
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all flex items-center gap-2';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-blue-800',
    secondary: 'bg-secondary text-white hover:bg-amber-600',
    danger: 'bg-danger text-white hover:bg-red-600'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};