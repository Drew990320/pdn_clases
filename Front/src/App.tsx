import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import CarteleraPage from '@/pages/cineflex/CarteleraPage';
import PeliculaDetailPage from '@/pages/cineflex/PeliculaDetailPage';
import PeliculasListPage from '@/pages/cineflex/PeliculasListPage';
import PeliculaFormPage from '@/pages/cineflex/PeliculaFormPage';
import PeliculaManagePage from '@/pages/cineflex/PeliculaManagePage';
import FuncionesListPage from '@/pages/cineflex/FuncionesListPage';
import FuncionFormPage from '@/pages/cineflex/FuncionFormPage';
import FuncionDetailPage from '@/pages/cineflex/FuncionDetailPage';
import ReservasListPage from '@/pages/cineflex/ReservasListPage';
import ReservaDetailPage from '@/pages/cineflex/ReservaDetailPage';
import ReservaPage from '@/pages/cineflex/ReservaPage';
import ReservaEditPage from '@/pages/cineflex/ReservaEditPage';
import HomePage from '@/pages/HomePage';
import ProductosListPage from '@/pages/productos/ProductosListPage';
import ProductoFormPage from '@/pages/productos/ProductoFormPage';
import ProductoDetailPage from '@/pages/productos/ProductoDetailPage';
import UsuariosListPage from '@/pages/usuarios/UsuariosListPage';
import UsuarioDetailPage from '@/pages/usuarios/UsuarioDetailPage';
import UsuarioEditPage from '@/pages/usuarios/UsuarioEditPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Rutas de autenticación - layout separado */}
          <Route element={<AuthLayout />}>
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
            <Route path="auth/forgot" element={<ForgotPasswordPage />} />
            <Route path="auth/reset" element={<ResetPasswordPage />} />
          </Route>

          {/* Rutas del dashboard - requieren autenticación */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<HomePage />} />
            
            {/* Productos */}
            <Route path="productos">
              <Route index element={<ProductosListPage />} />
              <Route path="nuevo" element={<ProductoFormPage />} />
              <Route path=":id" element={<ProductoDetailPage />} />
              <Route path=":id/editar" element={<ProductoFormPage />} />
            </Route>

            {/* Usuarios */}
            <Route path="usuarios">
              <Route index element={<UsuariosListPage />} />
              <Route path=":id" element={<UsuarioDetailPage />} />
              <Route path=":id/editar" element={<UsuarioEditPage />} />
            </Route>

            {/* CineFlex */}
            <Route path="cineflex">
              <Route index element={<CarteleraPage />} />
              <Route path="peliculas">
                <Route index element={<PeliculasListPage />} />
                <Route path="nuevo" element={<PeliculaFormPage />} />
                <Route path=":id" element={<PeliculaManagePage />} />
                <Route path=":id/editar" element={<PeliculaFormPage />} />
              </Route>
              <Route path="funciones">
                <Route index element={<FuncionesListPage />} />
                <Route path="nuevo" element={<FuncionFormPage />} />
                <Route path=":id" element={<FuncionDetailPage />} />
                <Route path=":id/editar" element={<FuncionFormPage />} />
              </Route>
              <Route path="reservas">
                <Route index element={<ReservasListPage />} />
                <Route path=":id" element={<ReservaDetailPage />} />
                <Route path=":id/editar" element={<ReservaEditPage />} />
              </Route>
              <Route path="pelicula/:id" element={<PeliculaDetailPage />} />
              <Route path="reservar/:funcionId" element={<ReservaPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}


