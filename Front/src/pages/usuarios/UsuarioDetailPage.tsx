import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UsuariosApi, Usuario } from '@/api/api';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';

export default function UsuarioDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const u = await UsuariosApi.obtener(Number(id));
        setData(u);
      } catch (e: any) {
        setError(e?.message ?? 'Error al cargar');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorAlert message={error} />;
  if (!data) return null;

  return (
    <Card>
      <h1 className="mb-2 text-xl font-semibold">Usuario #{data.id}</h1>
      <div className="space-y-1 text-sm">
        <div><span className="text-gray-500">Email:</span> {data.email}</div>
        <div><span className="text-gray-500">Nombre:</span> {data.nombre ?? '-'}</div>
        <div><span className="text-gray-500">Estado:</span> {data.enabled ? 'Activo' : 'Inactivo'}</div>
      </div>
      <div className="mt-4">
        <Link to={`/usuarios/${data.id}/editar`} className="btn-primary">Editar</Link>
      </div>
    </Card>
  );
}


