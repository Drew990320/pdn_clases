import axios from 'axios';

export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL ?? 'http://localhost:8080') + '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // 10 segundos
});

// Interceptor para manejar errores de red
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado. Verifica que el backend esté corriendo.');
    }
    if (error.message === 'Network Error' || !error.response) {
      throw new Error('Error de conexión. Verifica que el backend esté corriendo en http://localhost:8080');
    }
    
    // Extraer mensaje de error del response del backend
    if (error.response?.data) {
      const errorData = error.response.data;
      const message = errorData.message || errorData.error || 'Error desconocido';
      const errorMessage = new Error(message);
      (errorMessage as any).status = error.response.status;
      throw errorMessage;
    }
    
    // Propagar otros errores
    throw error;
  }
);

export type Producto = {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
};

export type Usuario = {
  id: number;
  email: string;
  nombre?: string;
  enabled: boolean;
};

export type LoginRequest = { email: string; password: string };
export type RegisterRequest = { email: string; password: string; nombre?: string };
export type ForgotPasswordRequest = { email: string };
export type ResetPasswordRequest = { token: string; newPassword: string };

export const AuthApi = {
  register: (data: RegisterRequest) => api.post('/auth/register', data).then(r => r.data as { userId: number }),
  login: (data: LoginRequest) => api.post('/auth/login', data).then(r => r.data as { userId: number }),
  forgot: (data: ForgotPasswordRequest) => api.post('/auth/forgot-password', data).then(r => r.data as { resetToken: string }),
  reset: (data: ResetPasswordRequest) => api.post('/auth/reset-password', data).then(r => r.data),
};

export const ProductosApi = {
  listar: () => api.get('/productos').then(r => r.data as Producto[]),
  obtener: (id: number) => api.get(`/productos/${id}`).then(r => r.data as Producto),
  crear: (p: Producto) => api.post('/productos', p).then(r => r.data as Producto),
  actualizar: (id: number, p: Producto) => api.put(`/productos/${id}`, p).then(r => r.data as Producto),
  eliminar: (id: number) => api.delete(`/productos/${id}`).then(r => r.data),
};

export const UsuariosApi = {
  listar: () => api.get('/usuarios').then(r => r.data as Usuario[]),
  obtener: (id: number) => api.get(`/usuarios/${id}`).then(r => r.data as Usuario),
  actualizar: (id: number, u: Partial<Usuario>) => api.put(`/usuarios/${id}`, u).then(r => r.data as Usuario),
  eliminar: (id: number) => api.delete(`/usuarios/${id}`).then(r => r.data),
};

// --- CineFlex ---
export type Pelicula = {
  id?: number;
  titulo: string;
  genero?: string;
  duracionMin?: number;
  clasificacion?: string;
  sinopsis?: string;
  imagenUrl?: string;
  createdAt?: string;
};

export type Funcion = {
  id?: number;
  peliculaId: number;
  fecha: string; // yyyy-MM-dd
  hora: string;  // HH:mm
  sala: string;
  precio: number;
};

export type Reserva = {
  id?: number;
  nombreCliente: string;
  funcionId: number;
  asientos: string[];
  cantidad: number;
  estado?: string;
  createdAt?: string;
  precioTotal?: number;
  paidAt?: string;
  cancelledAt?: string;
};

export const PeliculasApi = {
  listar: () => api.get('/peliculas').then(r => r.data as Pelicula[]),
  obtener: (id: number) => api.get(`/peliculas/${id}`).then(r => r.data as Pelicula),
  crear: (p: Pelicula) => api.post('/peliculas', p).then(r => r.data as Pelicula),
  actualizar: (id: number, p: Pelicula) => api.put(`/peliculas/${id}`, p).then(r => r.data as Pelicula),
  eliminar: (id: number) => api.delete(`/peliculas/${id}`).then(r => r.data),
};

export const FuncionesApi = {
  listar: (params?: { peliculaId?: number; fecha?: string }) =>
    api.get('/funciones', { params }).then(r => r.data as Funcion[]),
  crear: (f: Omit<Funcion, 'id'>) => api.post('/funciones', f).then(r => r.data as Funcion),
  obtener: (id: number) => api.get(`/funciones/${id}`).then(r => r.data as Funcion),
  actualizar: (id: number, f: Omit<Funcion, 'id'>) => api.put(`/funciones/${id}`, f).then(r => r.data as Funcion),
  eliminar: (id: number) => api.delete(`/funciones/${id}`).then(r => r.data),
};

export const ReservasApi = {
  listar: (params?: { funcionId?: number }) =>
    api.get('/reservas', { params }).then(r => r.data as Reserva[]),
  crear: (rsv: Omit<Reserva, 'id' | 'estado' | 'createdAt' | 'precioTotal' | 'paidAt' | 'cancelledAt'>) => 
    api.post('/reservas', rsv).then(r => r.data as Reserva),
  obtener: (id: number) => api.get(`/reservas/${id}`).then(r => r.data as Reserva),
  actualizar: (id: number, data: { nombreCliente: string; asientos: string[] }) =>
    api.put(`/reservas/${id}`, data).then(r => r.data as Reserva),
  eliminar: (id: number) => api.delete(`/reservas/${id}`).then(r => r.data),
  pagar: (id: number) => api.put(`/reservas/${id}/pagar`).then(r => r.data as Reserva),
  cancelar: (id: number) => api.put(`/reservas/${id}/cancelar`).then(r => r.data as Reserva),
  obtenerAsientosDisponibles: (funcionId: number) =>
    api.get(`/reservas/funciones/${funcionId}/asientos-disponibles`).then(r => r.data as string[]),
  obtenerAsientosOcupados: (funcionId: number) =>
    api.get(`/reservas/funciones/${funcionId}/asientos-ocupados`).then(r => r.data as string[]),
};

export type DashboardStats = {
  totalProductos: number;
  totalUsuarios: number;
  reservasActivas: number;
};

export const StatsApi = {
  obtener: () => api.get('/stats').then(r => r.data as DashboardStats),
};


