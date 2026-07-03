import React from 'react';

export function Card({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-card text-gray-950 shadow-sm dark:text-gray-50 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
