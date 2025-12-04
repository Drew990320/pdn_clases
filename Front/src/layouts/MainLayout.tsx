import { Link, NavLink, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { Button } from '@/components/ui/Button';

function HeaderContent() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-black/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-lg font-semibold">
          PDN
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          {isAuthenticated && (
            <>
              <NavLink to="/productos" className={({ isActive }) => isActive ? 'font-semibold text-brand-light dark:text-brand-dark' : ''}>Productos</NavLink>
              <NavLink to="/usuarios" className={({ isActive }) => isActive ? 'font-semibold text-brand-light dark:text-brand-dark' : ''}>Usuarios</NavLink>
              <NavLink to="/cineflex" className={({ isActive }) => isActive ? 'font-semibold text-brand-light dark:text-brand-dark' : ''}>CineFlex</NavLink>
            </>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.nombre || user?.email}
              </span>
              <Button variant="ghost" onClick={logout} className="text-sm">
                Salir
              </Button>
            </div>
          ) : (
            <NavLink to="/auth/login" className={({ isActive }) => isActive ? 'font-semibold text-brand-light dark:text-brand-dark' : ''}>Login</NavLink>
          )}
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
}

export default function MainLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-dvh">
          <HeaderContent />
          <main className="mx-auto max-w-6xl px-4 py-6">
            <Outlet />
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}


