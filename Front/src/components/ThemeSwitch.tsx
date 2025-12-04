import { useTheme } from '@/context/ThemeContext';

export function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700">
      {theme === 'light' ? '🌞 Claro' : '🌙 Oscuro'}
    </button>
  );
}


