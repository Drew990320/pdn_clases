import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PeliculasApi, FuncionesApi, Pelicula, Funcion } from '@/api/api';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, THead, TBody, TH, TD } from '@/components/ui/Table';

export default function PeliculaManagePage() {
  const { id } = useParams();
  const peliculaId = Number(id);
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!peliculaId) return;
      try {
        setLoading(true);
        const [peliculaData, funcionesData] = await Promise.all([
          PeliculasApi.obtener(peliculaId),
          FuncionesApi.listar({ peliculaId }),
        ]);
        setPelicula(peliculaData);
        setFunciones(funcionesData);
      } catch (e: any) {
        setError(e?.message ?? 'Error al cargar');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [peliculaId]);

  if (loading) return <Loader />;
  if (!pelicula) return <ErrorAlert message="Película no encontrada" />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/cineflex/peliculas"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-light dark:hover:text-brand-dark transition-colors"
          >
            ← Volver a películas
          </Link>
          <h1 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            {pelicula.titulo}
          </h1>
        </div>
        <Link to={`/cineflex/peliculas/${peliculaId}/editar`}>
          <Button>Editar Película</Button>
        </Link>
      </div>

      {error && <ErrorAlert message={error} />}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 p-6">
          {pelicula.imagenUrl && (
            <img
              src={pelicula.imagenUrl}
              alt={pelicula.titulo}
              className="w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
            />
          )}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Información
              </h2>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Género:</span>
                  <span className="font-medium">{pelicula.genero || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duración:</span>
                  <span className="font-medium">
                    {pelicula.duracionMin ? `${pelicula.duracionMin} minutos` : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Clasificación:</span>
                  <span className="font-medium">{pelicula.clasificacion || '-'}</span>
                </div>
              </div>
            </div>
            {pelicula.sinopsis && (
              <div>
                <h3 className="text-md font-semibold mb-2 text-gray-900 dark:text-white">
                  Sinopsis
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{pelicula.sinopsis}</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Funciones
          </h2>
          {funciones.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No hay funciones programadas
            </p>
          ) : (
            <div className="space-y-2">
              {funciones.map((f) => (
                <div
                  key={f.id}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="text-sm">
                    <p className="font-medium">{f.fecha}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {f.hora} · Sala {f.sala}
                    </p>
                    <p className="text-brand-light dark:text-brand-dark font-semibold">
                      ${f.precio?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

