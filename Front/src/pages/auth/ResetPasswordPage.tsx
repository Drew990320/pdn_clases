import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthApi } from '@/api/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ErrorAlert } from '@/components/ui/Alert';

export default function ResetPasswordPage() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOk('');
    try {
      setLoading(true);
      await AuthApi.reset({ token, newPassword });
      setOk('Contraseña actualizada correctamente.');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } catch (e: any) {
      setError(e?.message ?? 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Restablecer contraseña
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ingresa el token recibido y tu nueva contraseña
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <form onSubmit={submit} className="space-y-6">
          {error && <ErrorAlert message={error} />}
          {ok && (
            <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
              {ok}
            </div>
          )}

          <div className="space-y-5">
            <Input
              label="Token de recuperación"
              type="text"
              value={token}
              onChange={e => setToken(e.target.value)}
              required
              className="w-full"
            />
            <Input
              label="Nueva contraseña"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full py-3 text-base font-medium"
          >
            {loading ? 'Actualizando...' : 'Actualizar contraseña'}
          </Button>

          <div className="text-center">
            <Link
              to="/auth/login"
              className="text-sm font-medium text-brand-light dark:text-brand-dark hover:underline"
            >
              ← Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}


