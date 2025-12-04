# Estructura del Backend - CineFlex

## 📋 Resumen de Estructuras

Este documento describe la estructura completa del backend y su correspondencia con el frontend.

## 🎬 Módulo CineFlex

### Modelos (Entidades JPA)

#### 1. Pelicula (`com.cineflex.model.Pelicula`)
- **Campos:**
  - `id` (Long) - ID único
  - `titulo` (String) - Título de la película (obligatorio)
  - `genero` (String) - Género (opcional)
  - `duracionMin` (Integer) - Duración en minutos (opcional)
  - `clasificacion` (String) - Clasificación (opcional)
  - `sinopsis` (String) - Sinopsis (opcional, max 2000 caracteres)
  - `imagenUrl` (String) - URL de la imagen (opcional)
  - `createdAt` (Instant) - Fecha de creación

#### 2. Funcion (`com.cineflex.model.Funcion`)
- **Campos:**
  - `id` (Long) - ID único
  - `pelicula` (Pelicula) - Relación ManyToOne con Pelicula
  - `fecha` (LocalDate) - Fecha de la función
  - `hora` (LocalTime) - Hora de la función
  - `sala` (String) - Sala donde se proyecta
  - `precio` (Double) - Precio de la función

#### 3. Reserva (`com.cineflex.model.Reserva`)
- **Campos:**
  - `id` (Long) - ID único
  - `nombreCliente` (String) - Nombre del cliente
  - `funcion` (Funcion) - Relación ManyToOne con Funcion
  - `asientos` (List<String>) - Lista de asientos reservados
  - `cantidad` (Integer) - Cantidad de boletos
  - `estado` (Estado) - Estado: CREADA, PAGADA, CANCELADA
  - `createdAt` (Instant) - Fecha de creación

### DTOs (Data Transfer Objects)

#### PeliculaRequest
- **Validaciones:**
  - `titulo`: @NotBlank (obligatorio)
  - `sinopsis`: @Size(max = 2000) (opcional)
  - `duracionMin`: Sin validación @Positive (permite null/0)
  - Otros campos: Opcionales

#### PeliculaResponse
- Incluye todos los campos del modelo
- `createdAt` se serializa como ISO-8601 string

#### FuncionRequest
- **Validaciones:**
  - `peliculaId`: @NotNull
  - `fecha`: @NotBlank (formato yyyy-MM-dd)
  - `hora`: @NotBlank (formato HH:mm)
  - `sala`: @NotBlank
  - `precio`: @Positive

#### FuncionResponse
- Incluye todos los campos necesarios
- `fecha` y `hora` como String

#### ReservaRequest
- **Validaciones:**
  - `nombreCliente`: @NotBlank
  - `funcionId`: @NotNull
  - `asientos`: @NotEmpty
  - `cantidad`: @Positive

#### ReservaResponse
- Incluye todos los campos del modelo
- `estado` como String
- `createdAt` se serializa como ISO-8601 string

### Repositorios

1. **PeliculaRepository** - JpaRepository básico
2. **FuncionRepository** - Incluye método `findByFilters(peliculaId, fecha)`
3. **ReservaRepository** - JpaRepository básico

### Servicios

#### PeliculaService
- `crear(PeliculaRequest)` - Crear película
- `listar(String genero, String q)` - Listar con filtros
- `detalle(Long id)` - Obtener por ID
- `actualizar(Long id, PeliculaRequest)` - Actualizar
- `eliminar(Long id)` - Eliminar

#### FuncionService
- `crear(FuncionRequest)` - Crear función
- `listar(Long peliculaId, LocalDate fecha)` - Listar con filtros
- `detalle(Long id)` - Obtener por ID
- `actualizar(Long id, FuncionRequest)` - Actualizar
- `eliminar(Long id)` - Eliminar

#### ReservaService
- `crear(ReservaRequest)` - Crear reserva
- `detalle(Long id)` - Obtener por ID
- `pagar(Long id)` - Marcar como pagada
- `cancelar(Long id)` - Cancelar reserva

### Controladores

#### PeliculaController (`/api/peliculas`)
- `POST /` - Crear película
- `GET /` - Listar (con filtros: genero, q)
- `GET /{id}` - Detalle
- `PUT /{id}` - Actualizar
- `DELETE /{id}` - Eliminar

#### FuncionController (`/api/funciones`)
- `POST /` - Crear función
- `GET /` - Listar (con filtros: peliculaId, fecha)
- `GET /{id}` - Detalle
- `PUT /{id}` - Actualizar
- `DELETE /{id}` - Eliminar

#### ReservaController (`/api/reservas`)
- `POST /` - Crear reserva
- `GET /{id}` - Detalle
- `PUT /{id}/pagar` - Pagar reserva
- `PUT /{id}/cancelar` - Cancelar reserva

## 🔧 Configuraciones

### SecurityConfig
- CORS configurado para permitir frontend
- CSRF deshabilitado
- Todas las rutas `/api/**` permitidas

### GlobalExceptionHandler
- Maneja `NoSuchElementException` → 404
- Maneja `IllegalArgumentException` → 400
- Maneja `MethodArgumentNotValidException` → 400 (con detalles)
- Maneja `Exception` genérica → 500

### JacksonConfig
- Serialización de fechas como ISO-8601
- Timezone: America/Bogota

### DataInitializer
- Crea usuarios por defecto al iniciar:
  - `admin@cineflex.com` / `admin123`
  - `test@cineflex.com` / `test123`

## ✅ Correspondencia Frontend ↔ Backend

| Frontend Type | Backend DTO | Estado     |
|--------------|-------------|------------|
| `Pelicula` | `PeliculaResponse` | ✅ Completo |
| `Funcion` | `FuncionResponse` | ✅ Completo |
| `Reserva` | `ReservaResponse` | ✅ Completo |
| `PeliculasApi.listar()` | `GET /api/peliculas` | ✅ Completo |
| `PeliculasApi.crear()` | `POST /api/peliculas` | ✅ Completo        |
| `PeliculasApi.actualizar()` | `PUT /api/peliculas/{id}` | ✅ Completo        |
| `PeliculasApi.eliminar()` | `DELETE /api/peliculas/{id}` | ✅ Completo         |
| `FuncionesApi.listar()` | `GET /api/funciones` | ✅ Completo         |
| `ReservasApi.crear()` | `POST /api/reservas` | ✅ Completo         |

## 🎯 Endpoints Disponibles

### Películas
- `GET /api/peliculas` - Listar todas
- `GET /api/peliculas?genero=Drama` - Filtrar por género
- `GET /api/peliculas?q=padrino` - Buscar por título
- `GET /api/peliculas/{id}` - Detalle
- `POST /api/peliculas` - Crear
- `PUT /api/peliculas/{id}` - Actualizar
- `DELETE /api/peliculas/{id}` - Eliminar

### Funciones
- `GET /api/funciones` - Listar todas
- `GET /api/funciones?peliculaId=1` - Filtrar por película
- `GET /api/funciones?fecha=2025-11-10` - Filtrar por fecha
- `GET /api/funciones/{id}` - Detalle
- `POST /api/funciones` - Crear
- `PUT /api/funciones/{id}` - Actualizar
- `DELETE /api/funciones/{id}` - Eliminar

### Reservas
- `GET /api/reservas/{id}` - Detalle
- `POST /api/reservas` - Crear
- `PUT /api/reservas/{id}/pagar` - Pagar
- `PUT /api/reservas/{id}/cancelar` - Cancelar

## 📝 Notas Importantes

1. **Campos Opcionales**: Los campos opcionales en `PeliculaRequest` pueden ser `null` sin problemas
2. **Fechas**: Se serializan automáticamente como ISO-8601 strings
3. **Validaciones**: Solo los campos marcados con `@NotBlank` o `@NotNull` son obligatorios
4. **Manejo de Errores**: Todos los controladores manejan excepciones y devuelven códigos HTTP apropiados
5. **CORS**: Configurado para permitir peticiones desde `http://localhost:5173`

