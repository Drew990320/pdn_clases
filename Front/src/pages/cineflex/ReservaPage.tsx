import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FuncionesApi, ReservasApi, PeliculasApi, Funcion, Pelicula } from '@/api/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { ErrorAlert } from '@/components/ui/Alert';
import { Input } from '@/components/ui/Input';

export default function ReservaPage() {
  const { funcionId } = useParams();
  const id = Number(funcionId);
  const navigate = useNavigate();

  const [funcion, setFuncion] = useState<Funcion | null>(null);
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [nombreCliente, setNombreCliente] = useState('');
  const [asientos, setAsientos] = useState<string>('');
  const [cantidad, setCantidad] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [reservaId, setReservaId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const funcionData = await FuncionesApi.obtener(id);
        setFuncion(funcionData);
        
        // Cargar información de la película
        try {
          const peliculaData = await PeliculasApi.obtener(funcionData.peliculaId);
          setPelicula(peliculaData);
        } catch (e) {
          console.error('Error al cargar película:', e);
        }
      } catch (e: any) {
        setError(e?.message ?? 'Error al cargar función');
      }
    };
    load();
  }, [id]);

  const reservar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar ID de función
    if (!funcionId || isNaN(Number(funcionId)) || Number(funcionId) <= 0) {
      setError('ID de función no válido');
      return;
    }
    
    const funcionIdNum = Number(funcionId);
    
    // Validar nombre del cliente
    if (!nombreCliente || nombreCliente.trim() === '') {
      setError('El nombre del cliente es obligatorio');
      return;
    }
    
    // Validar asientos
    if (!asientos || asientos.trim() === '') {
      setError('Debe ingresar al menos un asiento');
      return;
    }
    
    const asientosList = asientos.split(',').map(s => s.trim()).filter(Boolean);
    
    if (asientosList.length === 0) {
      setError('Debe ingresar al menos un asiento válido');
      return;
    }
    
    const cantidadCalculada = asientosList.length;
    
    if (cantidad !== cantidadCalculada) {
      setError(`La cantidad (${cantidad}) no coincide con el número de asientos (${cantidadCalculada})`);
      return;
    }
    
    setEnviando(true);
    setError('');
    setSuccess(false);
    try {
      const payload = {
        nombreCliente: nombreCliente.trim(),
        funcionId: funcionIdNum,
        asientos: asientosList,
        cantidad: cantidadCalculada,
      };
      
      console.log('Enviando reserva:', JSON.stringify(payload, null, 2));
      const res = await ReservasApi.crear(payload);
      setSuccess(true);
      setReservaId(res.id!);
      // Limpiar formulario
      setNombreCliente('');
      setAsientos('');
      setCantidad(1);
    } catch (err: any) {
      let errorMessage = 'Error al crear la reserva';
      
      console.error('Error al crear reserva:', err);
      console.error('Response status:', err?.response?.status);
      console.error('Response data:', err?.response?.data);
      console.error('Response headers:', err?.response?.headers);
      
      if (err?.response?.data) {
        const errorData = err.response.data;
        // Si hay errores de validación, mostrar el primer error
        if (errorData.errors && typeof errorData.errors === 'object') {
          const firstError = Object.values(errorData.errors)[0];
          errorMessage = Array.isArray(firstError) ? firstError[0] : String(firstError);
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
      } else if (err?.response?.status === 400) {
        errorMessage = 'Error de validación: Verifique que todos los campos estén completos y correctos';
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setEnviando(false);
    }
  };

  if (!funcion) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Nueva Reserva</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Completa el formulario para realizar tu reserva
        </p>
      </div>

      {error && <ErrorAlert message={error} />}
      
      {success && reservaId && (
        <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                ¡Reserva creada exitosamente!
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Tu reserva ha sido creada con el ID #{reservaId}. Estado: CREADA
              </p>
              <div className="flex gap-2">
                <Link to={`/cineflex/reservas/${reservaId}`}>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Ver Detalle de Reserva
                  </Button>
                </Link>
                <Button variant="ghost" onClick={() => { setSuccess(false); setReservaId(null); }}>
                  Crear Otra Reserva
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

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
              <p className="text-lg font-bold text-gray-900 dark:text-white">${funcion.precio?.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Datos de la Reserva</h2>
          <form onSubmit={reservar} className="space-y-4">
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
            <Input
              label="Cantidad *"
              type="number"
              min={1}
              value={cantidad}
              onChange={e => {
                const newCantidad = Number(e.target.value);
                setCantidad(newCantidad);
                // Auto-calcular cantidad desde asientos si hay discrepancia
                const asientosCount = asientos.split(',').filter(s => s.trim()).length;
                if (asientosCount > 0 && newCantidad !== asientosCount) {
                  // Mostrar advertencia pero no bloquear
                }
              }}
              required
            />
            {asientos && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Asientos ingresados: {asientos.split(',').filter(s => s.trim()).length} | 
                Cantidad: {cantidad}
                {asientos.split(',').filter(s => s.trim()).length !== cantidad && (
                  <span className="text-yellow-600 dark:text-yellow-400 ml-2">
                    (La cantidad debe coincidir con el número de asientos)
                  </span>
                )}
              </p>
            )}
            {funcion && (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Precio Total: <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${((funcion.precio || 0) * cantidad).toFixed(2)}
                  </span>
                </p>
              </div>
            )}
            <div className="pt-2">
              <Button type="submit" disabled={enviando} className="w-full">
                {enviando ? 'Creando Reserva...' : 'Confirmar Reserva'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}


