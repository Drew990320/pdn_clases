import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type Props = {
  id: number;
  titulo: string;
  genero?: string;
  imagenUrl?: string;
  sinopsis?: string;
  duracionMin?: number;
  clasificacion?: string;
};

export default function PeliculaCard({
  id,
  titulo,
  genero,
  imagenUrl,
  sinopsis,
  duracionMin,
  clasificacion,
}: Props) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 group">
      <Link to={`/cineflex/pelicula/${id}`} className="block">
        <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
          {imagenUrl ? (
            <img
              src={imagenUrl}
              alt={titulo}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">🎬</span>
            </div>
          )}
          {clasificacion && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {clasificacion}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-light dark:group-hover:text-brand-dark transition-colors">
            {titulo}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
            {genero && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                {genero}
              </span>
            )}
            {duracionMin && (
              <span className="text-xs">{duracionMin} min</span>
            )}
          </div>
          {sinopsis && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {sinopsis}
            </p>
          )}
          <Button className="w-full" variant="primary">
            Ver detalles
          </Button>
        </div>
      </Link>
    </Card>
  );
}


