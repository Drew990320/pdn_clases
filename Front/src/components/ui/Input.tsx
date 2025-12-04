import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export function Input({ label, error, helperText, className = '', ...props }: Props) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>}
      <input className={`input ${className}`} {...props} />
      {error && <span className="text-xs text-red-600">{error}</span>}
      {!error && helperText && <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>}
    </label>
  );
}


