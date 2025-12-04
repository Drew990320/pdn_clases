import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UsuariosApi, Usuario } from '@/api/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';

export default function UsuarioEditPage() {
  const { id } = useParams();
  const uid = Number(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Partial<Usuario>>({ email: '', nombre: '', enabled: true });

  useEffect(() => {
    (async () => {
      try {
        const u = await UsuariosApi.obtener(uid);
        setForm(u);
      } catch (e: any) {
        setError(e?.message ?? 'Error al cargar');
      } finally {
        setLoading(false);
      }
    })();
  }, [uid]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await UsuariosApi.actualizar(uid, form);
      navigate(`/usuarios/${uid}`);
    } catch (e: any) {
      setError(e?.message ?? 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async () => {
    if (!confirm('¿Eliminar usuario?')) return;
    try {
      await UsuariosApi.eliminar(uid);
      navigate('/usuarios');
    } catch (e: any) {
      setError(e?.message ?? 'Error al eliminar');
    }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg space-y-4">
      <h1 className="text-xl font-semibold">Editar usuario</h1>
      {error && <ErrorAlert message={error} />}
      <Input
        label="Email"
        type="email"
        value={form.email ?? ''}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        required
      />
      <Input
        label="Nombre"
        value={form.nombre ?? ''}
        onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!form.enabled}
          onChange={e => setForm(f => ({ ...f, enabled: e.target.checked }))}
        />
        Activo
      </label>
      <div className="flex gap-2">
        <Button type="submit">Guardar</Button>
        <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancelar</Button>
        <Button type="button" variant="ghost" onClick={eliminar}>Eliminar</Button>
      </div>
    </form>
  );
}


