import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FuncionesApi, ReservasApi, Funcion, Reserva, PeliculasApi, Pelicula } from '@/api/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Table, THead, TBody, TH, TD } from '@/components/ui/Table';

export default function FuncionDetailPage() {
  const { id } = useParams();
  const funcionId = Number(id);
  const navigate = useNavigate();
  const [funcion, setFuncion] = useState<Funcion | null>(null);
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!funcionId) return;
      try {
        setLoading(true);
        const [funcionData, reservasData] = await Promise.all([
          FuncionesApi.obtener(funcionId),
          ReservasApi.listar({ funcionId }),
        ]);
        setFuncion(funcionData);
        setReservas(reservasData);
        
        // Cargar información de la película
        try {
          const peliculaData = await PeliculasApi.obtener(funcionData.peliculaId);
          setPelicula(peliculaData);
        } catch (e) {
          console.error('Error al cargar película:', e);
        }
      } catch (e: any) {
        setError(e?.message ?? 'Error al cargar');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [funcionId]);

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

  if (loading) return <Loader />;
  if (!funcion) return <ErrorAlert message="Función no encontrada" />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detalle de Función</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Información completa de la función
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => navigate(`/cineflex/reservar/${funcionId}`)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            🎟️ Crear Reserva
          </Button>
          <Button 
            onClick={() => navigate(`/cineflex/funciones/${funcionId}/editar`)}
            className="px-4 py-2 rounded-md transition-colors"
          >
            Editar
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md transition-colors"
          >
            Volver
          </Button>
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Información de la Función</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Película:</span>
              <p className="text-gray-900 dark:text-white">
                {pelicula ? (
                  <Link
                    to={`/cineflex/peliculas/${pelicula.id}`}
                    className="text-brand-light dark:text-brand-dark hover:underline"
                  >
                    {pelicula.titulo}
                  </Link>
                ) : (
                  `ID: ${funcion.peliculaId}`
                )}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Fecha:</span>
              <p className="text-gray-900 dark:text-white">{funcion.fecha}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Hora:</span>
              <p className="text-gray-900 dark:text-white">{funcion.hora}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sala:</span>
              <p className="text-gray-900 dark:text-white">{funcion.sala}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Precio:</span>
              <p className="text-gray-900 dark:text-white">${funcion.precio?.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Reservas</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total de reservas:</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{reservas.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Pagadas:</span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {reservas.filter(r => r.estado === 'PAGADA').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Canceladas:</span>
              <span className="text-red-600 dark:text-red-400 font-medium">
                {reservas.filter(r => r.estado === 'CANCELADA').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Pendientes:</span>
              <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                {reservas.filter(r => r.estado === 'CREADA' || !r.estado).length}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Lista de Reservas</h2>
        {reservas.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No hay reservas para esta función
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <THead>
                <tr>
                  <TH>ID</TH>
                  <TH>Cliente</TH>
                  <TH>Asientos</TH>
                  <TH>Cantidad</TH>
                  <TH>Estado</TH>
                  <TH>Fecha de Creación</TH>
                  <TH>Acciones</TH>
                </tr>
              </THead>
              <TBody>
                {reservas.map((r, index) => (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TD>
                      <Link
                        to={`/cineflex/reservas/${r.id}`}
                        className="font-medium text-brand-light dark:text-brand-dark hover:underline"
                      >
                        #{r.id}
                      </Link>
                    </TD>
                    <TD>{r.nombreCliente}</TD>
                    <TD>{r.asientos?.join(', ') || '-'}</TD>
                    <TD>{r.cantidad}</TD>
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
                      <Link
                        to={`/cineflex/reservas/${r.id}`}
                        className="btn-primary text-sm"
                      >
                        Ver
                      </Link>
                    </TD>
                  </tr>
                ))}
              </TBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}

