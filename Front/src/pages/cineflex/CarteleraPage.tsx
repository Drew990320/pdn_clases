import { useEffect, useState } from 'react';
import { PeliculasApi, Pelicula } from '@/api/api';
import PeliculaCard from '@/components/cineflex/PeliculaCard';
import { Loader } from '@/components/ui/Loader';
import { Card } from '@/components/ui/Card';

export default function CarteleraPage() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);
  const [generoFilter, setGeneroFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    PeliculasApi.listar()
      .then((data) => setPeliculas(data))
      .finally(() => setLoading(false));
  }, []);

  // Filtrar películas
  const generos = Array.from(new Set(peliculas.map(p => p.genero).filter(Boolean)));
  const filteredPeliculas = peliculas.filter(p => {
    const matchGenero = !generoFilter || p.genero === generoFilter;
    const matchSearch = !searchQuery || 
      p.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sinopsis && p.sinopsis.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchGenero && matchSearch;
  });

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Cartelera de Cine
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Descubre las mejores películas en cartelera
        </p>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por título o sinopsis..."
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filtrar por género
            </label>
            <select
              value={generoFilter}
              onChange={e => setGeneroFilter(e.target.value)}
              className="input"
            >
              <option value="">Todos los géneros</option>
              {generos.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Lista de películas */}
      {filteredPeliculas.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {peliculas.length === 0 
              ? 'No hay películas en cartelera' 
              : 'No se encontraron películas con los filtros aplicados'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPeliculas.map((p, index) => (
            <div
              key={p.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PeliculaCard
                id={p.id!}
                titulo={p.titulo}
                genero={p.genero}
                imagenUrl={p.imagenUrl}
                sinopsis={p.sinopsis}
                duracionMin={p.duracionMin}
                clasificacion={p.clasificacion}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


