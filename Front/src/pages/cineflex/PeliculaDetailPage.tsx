import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PeliculasApi, FuncionesApi, Pelicula, Funcion } from '@/api/api';

export default function PeliculaDetailPage() {
  const { id } = useParams();
  const peliculaId = Number(id);
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [funciones, setFunciones] = useState<Funcion[]>([]);

  useEffect(() => {
    if (!peliculaId) return;
    PeliculasApi.obtener(peliculaId).then(setPelicula);
    FuncionesApi.listar({ peliculaId }).then(setFunciones);
  }, [peliculaId]);

  if (!pelicula) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{pelicula.titulo}</h1>
      <p className="text-gray-700 mb-4">{pelicula.sinopsis}</p>

      <h2 className="text-xl font-semibold mb-2">Funciones</h2>
      <ul className="space-y-2">
        {funciones.map(f => (
          <li key={f.id} className="rounded border p-3 flex items-center justify-between">
            <span>
              {f.fecha} {f.hora} · {f.sala} · ${f.precio?.toFixed(2)}
            </span>
            <Link className="text-blue-600 underline" to={`/cineflex/reservar/${f.id}`}>Reservar</Link>
          </li>
        ))}
        {funciones.length === 0 && <li>No hay funciones disponibles.</li>}
      </ul>
    </div>
  );
}


