// src/components/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, variant = 'primary', ...props }: ButtonProps) => {
  const baseClasses = 'font-bold py-2 px-4 rounded transition-colors';
  const variantClasses = variant === 'primary'
    ? 'bg-blue-500 hover:bg-blue-700 text-white'
    : 'bg-gray-300 hover:bg-gray-400 text-gray-800';

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses}`}
      {...props}
    >
      {label}
    </button>
  );
};