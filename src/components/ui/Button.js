import React from 'react';

export const Button = ({ children, className, size = 'md', variant = 'default', ...props }) => {
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-base',
  };

  const variantClasses = {
    default: '',
    outline: 'border border-input dark:border-dark-input bg-transparent hover:bg-muted dark:hover:bg-dark-muted',
  }

  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  return React.createElement('button', {
      className: `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`,
      ...props
    },
    children
  );
};