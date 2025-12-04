import { Outlet, Link } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { ThemeSwitch } from '@/components/ThemeSwitch';

export default function AuthLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link to="/" className="text-xl font-bold text-brand-light dark:text-brand-dark">
              PDN
            </Link>
            <ThemeSwitch />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200/50 dark:border-gray-700/50 py-6">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2025 PDN. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}


