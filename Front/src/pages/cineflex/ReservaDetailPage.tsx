import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ReservasApi, FuncionesApi, PeliculasApi, Reserva, Funcion, Pelicula } from '@/api/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';

export default function ReservaDetailPage() {
  const { id } = useParams();
  const reservaId = Number(id);
  const navigate = useNavigate();
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [funcion, setFuncion] = useState<Funcion | null>(null);
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!reservaId) return;
      try {
        setLoading(true);
        const reservaData = await ReservasApi.obtener(reservaId);
        setReserva(reservaData);
        
        // Cargar información de la función
        try {
          const funcionData = await FuncionesApi.obtener(reservaData.funcionId);
          setFuncion(funcionData);
          
          // Cargar información de la película
          try {
            const peliculaData = await PeliculasApi.obtener(funcionData.peliculaId);
            setPelicula(peliculaData);
          } catch (e) {
            console.error('Error al cargar película:', e);
          }
        } catch (e) {
          console.error('Error al cargar función:', e);
        }
      } catch (e: any) {
        setError(e?.message ?? 'Error al cargar');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [reservaId]);

  const handlePagar = async () => {
    if (!reservaId || !confirm('¿Marcar esta reserva como pagada?')) return;
    try {
      setActionLoading(true);
      const updated = await ReservasApi.pagar(reservaId);
      setReserva(updated);
    } catch (e: any) {
      setError(e?.message ?? 'Error al pagar reserva');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelar = async () => {
    if (!reservaId || !confirm('¿Cancelar esta reserva?')) return;
    try {
      setActionLoading(true);
      const updated = await ReservasApi.cancelar(reservaId);
      setReserva(updated);
    } catch (e: any) {
      setError(e?.message ?? 'Error al cancelar reserva');
    } finally {
      setActionLoading(false);
    }
  };

  const getEstadoColor = (estado?: string) => {
    switch (estado) {
      case 'PAGADA':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'CANCELADA':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'CREADA':
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  if (loading) return <Loader />;
  if (!reserva) return <ErrorAlert message="Reserva no encontrada" />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detalle de Reserva</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Información completa de la reserva #{reserva.id}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {reserva.estado === 'CREADA' || !reserva.estado ? (
            <>
              <Button
                onClick={() => navigate(`/cineflex/reservas/${reserva.id}/editar`)}
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 px-4 py-2 rounded-md transition-colors"
              >
                Editar
              </Button>
              <Button
                onClick={handlePagar}
                disabled={actionLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                {actionLoading ? 'Procesando...' : 'Marcar como Pagada'}
              </Button>
              <Button
                variant="ghost"
                onClick={handleCancelar}
                disabled={actionLoading}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-4 py-2 rounded-md transition-colors"
              >
                Cancelar Reserva
              </Button>
            </>
          ) : null}
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
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Información de la Reserva</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">ID:</span>
              <p className="text-gray-900 dark:text-white">#{reserva.id}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Cliente:</span>
              <p className="text-gray-900 dark:text-white">{reserva.nombreCliente}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Estado:</span>
              <p>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getEstadoColor(reserva.estado)}`}>
                  {reserva.estado || 'CREADA'}
                </span>
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Asientos:</span>
              <p className="text-gray-900 dark:text-white">
                {reserva.asientos?.join(', ') || '-'}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Cantidad:</span>
              <p className="text-gray-900 dark:text-white">{reserva.cantidad}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Precio Total:</span>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ${reserva.precioTotal?.toFixed(2) || '-'}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Fecha de Creación:</span>
              <p className="text-gray-900 dark:text-white">
                {reserva.createdAt
                  ? new Date(reserva.createdAt).toLocaleString('es-CO')
                  : '-'}
              </p>
            </div>
            {reserva.paidAt && (
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Fecha de Pago:</span>
                <p className="text-gray-900 dark:text-white">
                  {new Date(reserva.paidAt).toLocaleString('es-CO')}
                </p>
              </div>
            )}
            {reserva.cancelledAt && (
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Fecha de Cancelación:</span>
                <p className="text-gray-900 dark:text-white">
                  {new Date(reserva.cancelledAt).toLocaleString('es-CO')}
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Información de la Función</h2>
          {funcion ? (
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
              <div className="pt-2">
                <Link
                  to={`/cineflex/funciones/${funcion.id}`}
                  className="btn-primary text-sm"
                >
                  Ver Función Completa
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Cargando información de la función...</p>
          )}
        </Card>
      </div>
    </div>
  );
}

