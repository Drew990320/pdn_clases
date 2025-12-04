import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReservasApi, FuncionesApi, PeliculasApi, Reserva, Funcion, Pelicula } from '@/api/api';
import { Table, THead, TBody, TH, TD } from '@/components/ui/Table';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ExportService } from '@/services/ExportService';

export default function ReservasListPage() {
  const [data, setData] = useState<Reserva[]>([]);
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroFuncion, setFiltroFuncion] = useState<number | undefined>();
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const params: { funcionId?: number } = {};
      if (filtroFuncion) params.funcionId = filtroFuncion;
      const list = await ReservasApi.listar(params);
      setData(list);
    } catch (e: any) {
      setError(e?.message ?? 'Error al cargar reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [funcionesList, peliculasList] = await Promise.all([
          FuncionesApi.listar(),
          PeliculasApi.listar(),
        ]);
        setFunciones(funcionesList);
        setPeliculas(peliculasList);
      } catch (e: any) {
        console.error('Error al cargar datos:', e);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    load();
  }, [filtroFuncion]);

  const getFuncionInfo = (funcionId: number) => {
    const funcion = funciones.find(f => f.id === funcionId);
    if (!funcion) return `ID: ${funcionId}`;
    const pelicula = peliculas.find(p => p.id === funcion.peliculaId);
    return pelicula ? `${pelicula.titulo} - ${funcion.fecha} ${funcion.hora}` : `ID: ${funcionId}`;
  };

  const getEstadoColor = (estado?: string) => {
    switch (estado) {
      case 'PAGADA':
        return 'text-green-600 dark:text-green-400';
      case 'CANCELADA':
        return 'text-red-600 dark:text-red-400';
      case 'CREADA':
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const handleExportPDF = () => {
    if (data.length === 0) {
      setError('No hay datos para exportar');
      return;
    }
    try {
      const exportData = data.map(r => {
        const funcion = funciones.find(f => f.id === r.funcionId);
        const pelicula = funcion ? peliculas.find(p => p.id === funcion.peliculaId) : null;
        const funcionInfo = funcion && pelicula
          ? `${pelicula.titulo} - ${funcion.fecha} ${funcion.hora}`
          : `ID: ${r.funcionId}`;
        
        return {
          ...r,
          funcionInfo,
          asientosStr: r.asientos?.join(', ') || '-'
        };
      });
      
      ExportService.exportToPDF(
        exportData,
        [
          { key: 'id', label: 'ID', width: 20 },
          { key: 'nombreCliente', label: 'Cliente', width: 40 },
          { key: 'funcionInfo', label: 'Función', width: 50 },
          { key: 'asientosStr', label: 'Asientos', width: 30 },
          { key: 'cantidad', label: 'Cantidad', width: 25 },
          { key: 'precioTotal', label: 'Precio Total', width: 30, format: (v) => `$${v?.toFixed(2) || '0.00'}` },
          { key: 'estado', label: 'Estado', width: 30, format: (v) => v || 'CREADA' },
          { key: 'createdAt', label: 'Fecha de Creación', width: 40, format: (v) => v ? new Date(v).toLocaleString('es-CO') : '-' }
        ],
        {
          title: 'Reporte de Reservas',
          fileName: 'reservas',
          metadata: { 
            total: data.length,
            filters: filtroFuncion ? `Función: ${filtroFuncion}` : undefined
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
      const exportData = data.map(r => {
        const funcion = funciones.find(f => f.id === r.funcionId);
        const pelicula = funcion ? peliculas.find(p => p.id === funcion.peliculaId) : null;
        const funcionInfo = funcion && pelicula
          ? `${pelicula.titulo} - ${funcion.fecha} ${funcion.hora}`
          : `ID: ${r.funcionId}`;
        
        return {
          ...r,
          funcionInfo,
          asientosStr: r.asientos?.join(', ') || '-'
        };
      });
      
      ExportService.exportToExcel(
        exportData,
        [
          { key: 'id', label: 'ID', width: 10 },
          { key: 'nombreCliente', label: 'Cliente', width: 30 },
          { key: 'funcionInfo', label: 'Función', width: 45 },
          { key: 'asientosStr', label: 'Asientos', width: 25 },
          { key: 'cantidad', label: 'Cantidad', width: 12 },
          { key: 'precioTotal', label: 'Precio Total', width: 18, format: (v) => `$${v?.toFixed(2) || '0.00'}` },
          { key: 'estado', label: 'Estado', width: 15, format: (v) => v || 'CREADA' },
          { key: 'createdAt', label: 'Fecha de Creación', width: 25, format: (v) => v ? new Date(v).toLocaleString('es-CO') : '-' }
        ],
        {
          title: 'Reporte de Reservas',
          fileName: 'reservas',
          metadata: { 
            total: data.length,
            filters: filtroFuncion ? `Función: ${filtroFuncion}` : undefined
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Reservas</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Administra las reservas del cine
          </p>
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filtrar por Función
            </label>
            <select
              value={filtroFuncion || ''}
              onChange={e => setFiltroFuncion(e.target.value ? Number(e.target.value) : undefined)}
              className="input"
            >
              <option value="">Todas las funciones</option>
              {funciones.map(f => {
                const pelicula = peliculas.find(p => p.id === f.peliculaId);
                return (
                  <option key={f.id} value={f.id}>
                    {pelicula?.titulo || `ID: ${f.peliculaId}`} - {f.fecha} {f.hora}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-end">
            <Button variant="ghost" onClick={() => setFiltroFuncion(undefined)}>
              Limpiar filtro
            </Button>
          </div>
        </div>
      </Card>

      {data.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No hay reservas registradas</p>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-end gap-3 mb-4">
            <Button
              onClick={handleExportPDF}
              variant="ghost"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
            >
              <span>📄</span>
              Descargar PDF
            </Button>
            <Button
              onClick={handleExportExcel}
              variant="ghost"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
            >
              <span>📊</span>
              Descargar Excel
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
            <THead>
              <tr>
                <TH>ID</TH>
                <TH>Cliente</TH>
                <TH>Función</TH>
                <TH>Asientos</TH>
                <TH>Cantidad</TH>
                <TH>Precio Total</TH>
                <TH>Estado</TH>
                <TH>Fecha de Creación</TH>
                <TH>Acciones</TH>
              </tr>
            </THead>
            <TBody>
              {data.map((r, index) => (
                <tr
                  key={r.id}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TD>
                    <Link
                      to={`/cineflex/reservas/${r.id}`}
                      className="font-medium text-brand-light dark:text-brand-dark hover:underline transition-all"
                    >
                      #{r.id}
                    </Link>
                  </TD>
                  <TD>{r.nombreCliente}</TD>
                  <TD>
                    <Link
                      to={`/cineflex/funciones/${r.funcionId}`}
                      className="text-brand-light dark:text-brand-dark hover:underline"
                    >
                      {getFuncionInfo(r.funcionId)}
                    </Link>
                  </TD>
                  <TD>{r.asientos?.join(', ') || '-'}</TD>
                  <TD>{r.cantidad}</TD>
                  <TD>${r.precioTotal?.toFixed(2) || '-'}</TD>
                  <TD>
                    <span className={getEstadoColor(r.estado)}>
                      {r.estado || 'CREADA'}
                    </span>
                  </TD>
                  <TD>
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleString('es-CO')
                      : '-'}
                  </TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/cineflex/reservas/${r.id}`}
                        className="btn-primary text-sm px-3 py-1.5 rounded-md transition-colors"
                      >
                        Ver
                      </Link>
                    </div>
                  </TD>
                </tr>
              ))}
            </TBody>
          </Table>
          </div>
        </>
      )}
    </div>
  );
}

