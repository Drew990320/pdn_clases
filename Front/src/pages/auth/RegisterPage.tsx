import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthApi } from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ErrorAlert } from '@/components/ui/Alert';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      await AuthApi.register({ email, password, nombre });
      await login(email, password);
      navigate('/');
    } catch (e: any) {
      setError(e?.message ?? 'Error en registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Crea tu cuenta
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Regístrate para comenzar a usar la plataforma
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <form onSubmit={submit} className="space-y-6">
          {error && <ErrorAlert message={error} />}
          
          <div className="space-y-5">
            <Input
              label="Nombre completo"
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full"
            />
            <Input
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full py-3 text-base font-medium"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                O
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/auth/login"
                className="font-medium text-brand-light dark:text-brand-dark hover:underline"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}


