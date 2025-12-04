import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FuncionesApi, PeliculasApi, Funcion, Pelicula } from '@/api/api';
import { Table, THead, TBody, TH, TD } from '@/components/ui/Table';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ExportService } from '@/services/ExportService';

export default function FuncionesListPage() {
  const [data, setData] = useState<Funcion[]>([]);
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroPelicula, setFiltroPelicula] = useState<number | undefined>();
  const [filtroFecha, setFiltroFecha] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const params: { peliculaId?: number; fecha?: string } = {};
      if (filtroPelicula) params.peliculaId = filtroPelicula;
      if (filtroFecha) params.fecha = filtroFecha;
      const list = await FuncionesApi.listar(params);
      setData(list);
    } catch (e: any) {
      setError(e?.message ?? 'Error al cargar funciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPeliculas = async () => {
      try {
        const list = await PeliculasApi.listar();
        setPeliculas(list);
      } catch (e: any) {
        console.error('Error al cargar películas:', e);
      }
    };
    loadPeliculas();
  }, []);

  useEffect(() => {
    load();
  }, [filtroPelicula, filtroFecha]);

  const eliminar = async (id: number) => {
    if (!confirm('¿Eliminar función?')) return;
    try {
      await FuncionesApi.eliminar(id);
      await load();
    } catch (e: any) {
      setError(e?.message ?? 'Error al eliminar');
    }
  };

  const getPeliculaTitulo = (peliculaId: number) => {
    const pelicula = peliculas.find(p => p.id === peliculaId);
    return pelicula?.titulo || `ID: ${peliculaId}`;
  };

  const handleExportPDF = () => {
    if (data.length === 0) {
      setError('No hay datos para exportar');
      return;
    }
    try {
      const exportData = data.map(f => ({
        ...f,
        peliculaTitulo: getPeliculaTitulo(f.peliculaId)
      }));
      
      ExportService.exportToPDF(
        exportData,
        [
          { key: 'peliculaTitulo', label: 'Película', width: 50 },
          { key: 'fecha', label: 'Fecha', width: 30 },
          { key: 'hora', label: 'Hora', width: 25 },
          { key: 'sala', label: 'Sala', width: 25 },
          { key: 'precio', label: 'Precio', width: 30, format: (v) => `$${v?.toFixed(2) || '0.00'}` }
        ],
        {
          title: 'Reporte de Funciones',
          fileName: 'funciones',
          metadata: { 
            total: data.length,
            filters: filtroPelicula ? `Película: ${getPeliculaTitulo(filtroPelicula)}` : undefined
          }
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
      const exportData = data.map(f => ({
        ...f,
        peliculaTitulo: getPeliculaTitulo(f.peliculaId)
      }));
      
      ExportService.exportToExcel(
        exportData,
        [
          { key: 'peliculaTitulo', label: 'Película', width: 40 },
          { key: 'fecha', label: 'Fecha', width: 15 },
          { key: 'hora', label: 'Hora', width: 12 },
          { key: 'sala', label: 'Sala', width: 15 },
          { key: 'precio', label: 'Precio', width: 15, format: (v) => `$${v?.toFixed(2) || '0.00'}` }
        ],
        {
          title: 'Reporte de Funciones',
          fileName: 'funciones',
          metadata: { 
            total: data.length,
            filters: filtroPelicula ? `Película: ${getPeliculaTitulo(filtroPelicula)}` : undefined
          }
        }
      );
    } catch (error: any) {
      setError(error?.message ?? 'Error al exportar a Excel');
    }
  };

  if (loading && data.length === 0) return <Loader />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Funciones</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Administra las funciones de las películas
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
            onClick={() => navigate('/cineflex/funciones/nuevo')}
            className="px-4 py-2 rounded-md transition-colors"
          >
            + Nueva Función
          </Button>
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filtrar por Película
            </label>
            <select
              value={filtroPelicula || ''}
              onChange={e => setFiltroPelicula(e.target.value ? Number(e.target.value) : undefined)}
              className="input"
            >
              <option value="">Todas las películas</option>
              {peliculas.map(p => (
                <option key={p.id} value={p.id}>
                  {p.titulo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Input
              label="Filtrar por Fecha"
              type="date"
              value={filtroFecha}
              onChange={e => setFiltroFecha(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <Button variant="ghost" onClick={() => { setFiltroPelicula(undefined); setFiltroFecha(''); }}>
            Limpiar filtros
          </Button>
        </div>
      </Card>

      {data.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No hay funciones registradas</p>
          <Button onClick={() => navigate('/cineflex/funciones/nuevo')}>
            Crear primera función
          </Button>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <THead>
              <tr>
                <TH>Película</TH>
                <TH>Fecha</TH>
                <TH>Hora</TH>
                <TH>Sala</TH>
                <TH>Precio</TH>
                <TH>Acciones</TH>
              </tr>
            </THead>
            <TBody>
              {data.map((f, index) => (
                <tr
                  key={f.id}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TD>
                    <Link
                      to={`/cineflex/peliculas/${f.peliculaId}`}
                      className="font-medium text-brand-light dark:text-brand-dark hover:underline transition-all"
                    >
                      {getPeliculaTitulo(f.peliculaId)}
                    </Link>
                  </TD>
                  <TD>{f.fecha}</TD>
                  <TD>{f.hora}</TD>
                  <TD>{f.sala}</TD>
                  <TD>${f.precio?.toFixed(2)}</TD>
                  <TD>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        to={`/cineflex/funciones/${f.id}`}
                        className="btn-primary text-sm px-3 py-1.5 rounded-md transition-colors"
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/cineflex/reservar/${f.id}`}
                        className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md transition-colors font-medium"
                      >
                        Reservar
                      </Link>
                      <Link
                        to={`/cineflex/funciones/${f.id}/editar`}
                        className="btn-primary text-sm px-3 py-1.5 rounded-md transition-colors"
                      >
                        Editar
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={() => eliminar(f.id!)}
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

