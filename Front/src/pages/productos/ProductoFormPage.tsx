import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductosApi, Producto } from '@/api/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';

export default function ProductoFormPage() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Producto>({ nombre: '', precio: 0, stock: 0 });

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await ProductosApi.obtener(id);
        setForm({ ...data, precio: Number(data.precio) });
      } catch (e: any) {
        setError(e?.message ?? 'Error al cargar');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEdit && id) await ProductosApi.actualizar(id, form);
      else await ProductosApi.crear(form);
      navigate('/productos');
    } catch (e: any) {
      setError(e?.message ?? 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) return <Loader />;

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg space-y-4">
      <h1 className="text-xl font-semibold">{isEdit ? 'Editar' : 'Crear'} producto</h1>
      {error && <ErrorAlert message={error} />}
      <Input
        label="Nombre"
        value={form.nombre}
        onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
        required
      />
      <Input
        label="Precio"
        type="number"
        step="0.01"
        value={form.precio}
        onChange={e => setForm(f => ({ ...f, precio: Number(e.target.value) }))}
        required
      />
      <Input
        label="Stock"
        type="number"
        value={form.stock}
        onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))}
        required
      />
      <div className="flex gap-2">
        <Button type="submit">Guardar</Button>
        <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </form>
  );
}


