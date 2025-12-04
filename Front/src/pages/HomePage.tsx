import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { StatsApi, DashboardStats } from '@/api/api';
import { Loader } from '@/components/ui/Loader';

export default function HomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarStats = async () => {
      try {
        setLoading(true);
        const datos = await StatsApi.obtener();
        setStats(datos);
        setError(null);
      } catch (err) {
        console.error('Error al cargar estadísticas:', err);
        setError('No se pudieron cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    cargarStats();
  }, []);

  const dashboardCards = [
    {
      title: 'Productos',
      description: 'Gestiona tu catálogo de productos con operaciones CRUD completas.',
      icon: '📦',
      link: '/productos',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Usuarios',
      description: 'Administra los usuarios del sistema y sus permisos.',
      icon: '👥',
      link: '/usuarios',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'CineFlex - Cartelera',
      description: 'Visualiza la cartelera de películas disponibles.',
      icon: '🎬',
      link: '/cineflex',
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Gestión de Películas',
      description: 'Administra el catálogo de películas del cine (CRUD completo).',
      icon: '🎞️',
      link: '/cineflex/peliculas',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-xl bg-gradient-to-r from-brand-light to-blue-600 dark:from-brand-dark dark:to-blue-800 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">
          Bienvenido, {user?.nombre || 'Usuario'}
        </h1>
        <p className="text-blue-100">
          Gestiona tu negocio desde un solo lugar
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card) => (
          <Link key={card.link} to={card.link}>
            <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer group">
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${card.color} mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {card.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {card.description}
              </p>
              <span className="text-sm font-medium text-brand-light dark:text-brand-dark group-hover:underline">
                Ir a {card.title} →
              </span>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Productos</p>
              {loading ? (
                <Loader className="h-8 w-8" />
              ) : error ? (
                <p className="text-2xl font-bold text-red-500 dark:text-red-400">-</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats?.totalProductos ?? 0}
                </p>
              )}
            </div>
            <span className="text-3xl">📦</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Usuarios</p>
              {loading ? (
                <Loader className="h-8 w-8" />
              ) : error ? (
                <p className="text-2xl font-bold text-red-500 dark:text-red-400">-</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats?.totalUsuarios ?? 0}
                </p>
              )}
            </div>
            <span className="text-3xl">👥</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reservas Activas</p>
              {loading ? (
                <Loader className="h-8 w-8" />
              ) : error ? (
                <p className="text-2xl font-bold text-red-500 dark:text-red-400">-</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats?.reservasActivas ?? 0}
                </p>
              )}
            </div>
            <span className="text-3xl">🎬</span>
          </div>
        </Card>
      </div>
    </div>
  );
}


