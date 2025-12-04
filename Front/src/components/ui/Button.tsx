import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export function Button({ className = '', variant = 'primary', ...props }: Props) {
  const base = variant === 'primary' ? 'btn-primary' : 'px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800';
  return <button className={`${base} ${className}`} {...props} />;
}


