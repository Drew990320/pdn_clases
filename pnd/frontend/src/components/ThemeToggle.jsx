import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Cambiar tema"
    >
      <span className="theme-icon">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
      <span className="theme-text">
        {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
      </span>
    </button>
  );
};

export default ThemeToggle;
