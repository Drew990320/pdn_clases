import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PeliculasApi, Pelicula } from '@/api/api';
import { Table, THead, TBody, TH, TD } from '@/components/ui/Table';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ExportService } from '@/services/ExportService';

export default function PeliculasListPage() {
  const [data, setData] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const list = await PeliculasApi.listar();
      setData(list);
    } catch (e: any) {
      setError(e?.message ?? 'Error al cargar películas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const eliminar = async (id: number) => {
    if (!confirm('¿Eliminar película?')) return;
    try {
      await PeliculasApi.eliminar(id);
      await load();
    } catch (e: any) {
      setError(e?.message ?? 'Error al eliminar');
    }
  };

  const handleExportPDF = () => {
    if (data.length === 0) {
      setError('No hay datos para exportar');
      return;
    }
    try {
      ExportService.exportToPDF(
        data,
        [
          { key: 'titulo', label: 'Título', width: 50 },
          { key: 'genero', label: 'Género', width: 30, format: (v) => v || '-' },
          { key: 'duracionMin', label: 'Duración', width: 25, format: (v) => v ? `${v} min` : '-' },
          { key: 'clasificacion', label: 'Clasificación', width: 30, format: (v) => v || '-' }
        ],
        {
          title: 'Reporte de Películas',
          fileName: 'peliculas',
          metadata: { total: data.length }
        }
      );
    } catch (error: any) {
      setError(error?.message ?? 'Error al exportar a PDF');
    }
  };

  const handleExportExcel = () => {
    if (data.length === 0) {
      setError('No hay datos para exportar');
      return;
    }
    try {
      ExportService.exportToExcel(
        data,
        [
          { key: 'titulo', label: 'Título', width: 40 },
          { key: 'genero', label: 'Género', width: 20, format: (v) => v || '-' },
          { key: 'duracionMin', label: 'Duración', width: 15, format: (v) => v ? `${v} min` : '-' },
          { key: 'clasificacion', label: 'Clasificación', width: 20, format: (v) => v || '-' }
        ],
        {
          title: 'Reporte de Películas',
          fileName: 'peliculas',
          metadata: { total: data.length }
        }
      );
    } catch (error: any) {
      setError(error?.message ?? 'Error al exportar a Excel');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Películas</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Administra el catálogo de películas del cine
          </p>
        </div>
        <div className="flex items-center gap-3">
          {data.length > 0 && (
            <>
              <Button 
                onClick={handleExportPDF} 
                variant="ghost" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
              >
                <span>📄</span>
                PDF
              </Button>
              <Button 
                onClick={handleExportExcel} 
                variant="ghost" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
              >
                <span>📊</span>
                Excel
              </Button>
            </>
          )}
          <Button 
            onClick={() => navigate('/cineflex/peliculas/nuevo')}
            className="px-4 py-2 rounded-md transition-colors"
          >
            + Nueva Película
          </Button>
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      {data.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No hay películas registradas</p>
          <Button onClick={() => navigate('/cineflex/peliculas/nuevo')}>
            Crear primera película
          </Button>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <THead>
              <tr>
                <TH>Imagen</TH>
                <TH>Título</TH>
                <TH>Género</TH>
                <TH>Duración</TH>
                <TH>Clasificación</TH>
                <TH>Acciones</TH>
              </tr>
            </THead>
            <TBody>
              {data.map((p, index) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TD>
                    {p.imagenUrl ? (
                      <img
                        src={p.imagenUrl}
                        alt={p.titulo}
                        className="w-16 h-24 object-cover rounded transition-transform duration-200 hover:scale-105"
                      />
                    ) : (
                      <div className="w-16 h-24 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-2xl">🎬</span>
                      </div>
                    )}
                  </TD>
                  <TD>
                    <Link
                      to={`/cineflex/peliculas/${p.id}`}
                      className="font-medium text-brand-light dark:text-brand-dark hover:underline transition-all"
                    >
                      {p.titulo}
                    </Link>
                  </TD>
                  <TD>{p.genero || '-'}</TD>
                  <TD>{p.duracionMin ? `${p.duracionMin} min` : '-'}</TD>
                  <TD>{p.clasificacion || '-'}</TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/cineflex/peliculas/${p.id}/editar`}
                        className="btn-primary text-sm px-3 py-1.5 rounded-md transition-colors"
                      >
                        Editar
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={() => eliminar(p.id!)}
                        className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-3 py-1.5 rounded-md transition-colors"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TD>
                </tr>
              ))}
            </TBody>
          </Table>
        </div>
      )}
    </div>
  );
}

