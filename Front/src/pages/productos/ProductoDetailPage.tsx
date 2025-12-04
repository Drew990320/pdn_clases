import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductosApi, Producto } from '@/api/api';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';

export default function ProductoDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const p = await ProductosApi.obtener(Number(id));
        setData({ ...p, precio: Number(p.precio) });
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
      <h1 className="mb-2 text-xl font-semibold">Producto #{data.id}</h1>
      <div className="space-y-1 text-sm">
        <div><span className="text-gray-500">Nombre:</span> {data.nombre}</div>
        <div><span className="text-gray-500">Precio:</span> ${data.precio.toFixed(2)}</div>
        <div><span className="text-gray-500">Stock:</span> {data.stock}</div>
      </div>
      <div className="mt-4">
        <Link to={`/productos/${data.id}/editar`} className="btn-primary">Editar</Link>
      </div>
    </Card>
  );
}


