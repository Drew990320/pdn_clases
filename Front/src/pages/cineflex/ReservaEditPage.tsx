import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ReservasApi, FuncionesApi, PeliculasApi, Reserva, Funcion, Pelicula } from '@/api/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Input } from '@/components/ui/Input';

export default function ReservaEditPage() {
  const { id } = useParams();
  const reservaId = Number(id);
  const navigate = useNavigate();

  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [funcion, setFuncion] = useState<Funcion | null>(null);
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [nombreCliente, setNombreCliente] = useState('');
  const [asientos, setAsientos] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!reservaId) return;
      try {
        setLoading(true);
        const reservaData = await ReservasApi.obtener(reservaId);
        setReserva(reservaData);
        setNombreCliente(reservaData.nombreCliente);
        setAsientos(reservaData.asientos?.join(', ') || '');
        
        if (reservaData.estado !== 'CREADA') {
          setError('Solo se pueden editar reservas con estado CREADA');
          return;
        }
        
        try {
          const funcionData = await FuncionesApi.obtener(reservaData.funcionId);
          setFuncion(funcionData);
          
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
        setError(e?.message ?? 'Error al cargar reserva');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [reservaId]);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservaId) return;
    
    const asientosList = asientos.split(',').map(s => s.trim()).filter(Boolean);
    
    if (asientosList.length === 0) {
      setError('Debe ingresar al menos un asiento');
      return;
    }
    
    setEnviando(true);
    setError('');
    try {
      await ReservasApi.actualizar(reservaId, {
        nombreCliente,
        asientos: asientosList,
      });
      navigate(`/cineflex/reservas/${reservaId}`);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Error al actualizar la reserva';
      setError(errorMessage);
    } finally {
      setEnviando(false);
    }
  };

  if (loading) return <Loader />;
  if (!reserva || reserva.estado !== 'CREADA') {
    return (
      <div className="space-y-4">
        <ErrorAlert message={error || 'No se puede editar esta reserva'} />
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    );
  }

  const cantidadCalculada = asientos.split(',').filter(s => s.trim()).length;
  const precioTotal = funcion ? (funcion.precio || 0) * cantidadCalculada : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Editar Reserva #{reserva.id}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Modifica los datos de la reserva
        </p>
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
                  `ID: ${funcion?.peliculaId}`
                )}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Fecha:</span>
              <p className="text-gray-900 dark:text-white">{funcion?.fecha}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Hora:</span>
              <p className="text-gray-900 dark:text-white">{funcion?.hora}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sala:</span>
              <p className="text-gray-900 dark:text-white">{funcion?.sala}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Precio unitario:</span>
              <p className="text-gray-900 dark:text-white">${funcion?.precio?.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Datos de la Reserva</h2>
          <form onSubmit={guardar} className="space-y-4">
            <Input
              label="Nombre del Cliente *"
              value={nombreCliente}
              onChange={e => setNombreCliente(e.target.value)}
              required
              placeholder="Ej: Juan Pérez"
            />
            <Input
              label="Asientos *"
              value={asientos}
              onChange={e => setAsientos(e.target.value)}
              required
              placeholder="Ej: A1, A2, B3"
              helperText="Separa los asientos con comas"
            />
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cantidad de asientos: <span className="font-medium">{cantidadCalculada}</span>
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Precio Total: <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${precioTotal.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={enviando} className="flex-1">
                {enviando ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
              <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

