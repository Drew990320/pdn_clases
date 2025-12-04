import React from 'react';

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="table">{children}</table>;
}

export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-50 dark:bg-neutral-900">{children}</thead>;
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-gray-200 dark:divide-gray-800">{children}</tbody>;
}

export function TH({ children }: { children: React.ReactNode }) {
  return <th className="th">{children}</th>;
}

export function TD({ children }: { children: React.ReactNode }) {
  return <td className="td">{children}</td>;
}


