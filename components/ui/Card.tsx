import React from 'react';

export const Card = ({ children, className, ...props }) => {
  const baseClasses = 'rounded-xl border bg-card text-card-foreground dark:bg-dark-card dark:text-dark-card-foreground dark:border-dark-border shadow-lg';
  
  return React.createElement('div', {
      className: `${baseClasses} ${className}`,
      ...props
    },
    children
  );
};