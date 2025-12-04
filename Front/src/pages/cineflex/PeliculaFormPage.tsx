import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PeliculasApi, Pelicula } from '@/api/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';

export default function PeliculaFormPage() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Pelicula>({
    titulo: '',
    genero: '',
    duracionMin: undefined,
    clasificacion: '',
    sinopsis: '',
    imagenUrl: '',
  });

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await PeliculasApi.obtener(id);
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
      // Limpiar campos vacíos antes de enviar
      const dataToSend: Pelicula = {
        titulo: form.titulo,
        genero: form.genero || undefined,
        duracionMin: form.duracionMin && form.duracionMin > 0 ? form.duracionMin : undefined,
        clasificacion: form.clasificacion || undefined,
        sinopsis: form.sinopsis || undefined,
        imagenUrl: form.imagenUrl || undefined,
      };
      
      if (isEdit && id) {
        await PeliculasApi.actualizar(id, dataToSend);
      } else {
        await PeliculasApi.crear(dataToSend);
      }
      navigate('/cineflex/peliculas');
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
          {isEdit ? 'Editar Película' : 'Nueva Película'}
        </h1>

        {error && <ErrorAlert message={error} className="mb-4" />}

        <form onSubmit={submit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                label="Título *"
                value={form.titulo}
                onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                required
                placeholder="Ej: El Padrino"
              />
            </div>

            <Input
              label="Género"
              value={form.genero || ''}
              onChange={e => setForm(f => ({ ...f, genero: e.target.value }))}
              placeholder="Ej: Drama, Acción, Comedia"
            />

            <Input
              label="Duración (minutos)"
              type="number"
              value={form.duracionMin || ''}
              onChange={e => {
                const value = e.target.value;
                setForm(f => ({ ...f, duracionMin: value ? Number(value) : undefined }));
              }}
              placeholder="Ej: 120"
            />

            <Input
              label="Clasificación"
              value={form.clasificacion || ''}
              onChange={e => setForm(f => ({ ...f, clasificacion: e.target.value }))}
              placeholder="Ej: PG-13, R, A"
            />

            <div className="md:col-span-2">
              <Input
                label="URL de Imagen"
                type="url"
                value={form.imagenUrl || ''}
                onChange={e => setForm(f => ({ ...f, imagenUrl: e.target.value }))}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sinopsis
              </label>
              <textarea
                value={form.sinopsis || ''}
                onChange={e => setForm(f => ({ ...f, sinopsis: e.target.value }))}
                rows={4}
                className="input"
                placeholder="Descripción de la película..."
              />
            </div>
          </div>

          {form.imagenUrl && (
            <div className="md:col-span-2 animate-scale-in">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vista previa
              </label>
              <img
                src={form.imagenUrl}
                alt="Vista previa"
                className="w-32 h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

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

