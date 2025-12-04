import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FuncionesApi, PeliculasApi, Funcion, Pelicula } from '@/api/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';

export default function FuncionFormPage() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [form, setForm] = useState<Funcion>({
    peliculaId: 0,
    fecha: '',
    hora: '',
    sala: '',
    precio: 0,
  });

  useEffect(() => {
    const loadPeliculas = async () => {
      try {
        const list = await PeliculasApi.listar();
        setPeliculas(list);
      } catch (e: any) {
        setError(e?.message ?? 'Error al cargar películas');
      }
    };
    loadPeliculas();
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await FuncionesApi.obtener(id);
        setForm(data);
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
      setError('');
      
      if (isEdit && id) {
        await FuncionesApi.actualizar(id, form);
      } else {
        await FuncionesApi.crear(form);
      }
      navigate('/cineflex/funciones');
    } catch (e: any) {
      setError(e?.message ?? 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {isEdit ? 'Editar Función' : 'Nueva Función'}
        </h1>

        {error && <ErrorAlert message={error} className="mb-4" />}

        <form onSubmit={submit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Película *
              </label>
              <select
                value={form.peliculaId || ''}
                onChange={e => setForm(f => ({ ...f, peliculaId: Number(e.target.value) }))}
                className="input"
                required
              >
                <option value="">Seleccione una película</option>
                {peliculas.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.titulo}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Fecha *"
              type="date"
              value={form.fecha}
              onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
              required
            />

            <Input
              label="Hora *"
              type="time"
              value={form.hora}
              onChange={e => setForm(f => ({ ...f, hora: e.target.value }))}
              required
            />

            <Input
              label="Sala *"
              value={form.sala}
              onChange={e => setForm(f => ({ ...f, sala: e.target.value }))}
              required
              placeholder="Ej: Sala 1, Sala VIP"
            />

            <Input
              label="Precio *"
              type="number"
              step="0.01"
              min="0"
              value={form.precio || ''}
              onChange={e => setForm(f => ({ ...f, precio: Number(e.target.value) }))}
              required
              placeholder="Ej: 15000"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

