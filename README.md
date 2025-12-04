🎬 CineFlex – Sistema de Reservas para un Cine

📖 Descripción general

CineFlex es una aplicación web que permite a los usuarios visualizar películas en cartelera, consultar horarios de funciones, seleccionar asientos y realizar reservas en línea. Incluye un backend robusto con Spring Boot (carpeta `negocios`) y un frontend en React (carpeta `Front`). La lógica existente del proyecto se mantiene sin cambios; este documento estandariza estructura, ejecución y despliegue.

🧩 Estructura del proyecto

```
cineflex/
│
├── negocios/        # Backend (Spring Boot)
│   ├── src/main/java/com/proyecto/negocios
│   ├── src/main/resources
│   └── pom.xml
│
├── Front/           # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md        # Documentación general
```

Nota: En este repositorio la carpeta de frontend se llama `Front` (con mayúscula). En la documentación la referimos como “frontend”.

🚀 Ejecución local

🔧 Backend (Spring Boot)

```bash
cd negocios
mvn spring-boot:run
# o (si usas wrapper)
./mvnw spring-boot:run
```

El backend se ejecutará en:

- 👉 http://localhost:8080

💻 Frontend (React + Vite)

```bash
cd Front
npm install
npm run dev
```

La aplicación se abrirá en:

- 👉 http://localhost:5173

🔑 Configuración del frontend

Crea un archivo `.env` dentro de `Front/` para apuntar al backend local:

```
VITE_API_URL=http://localhost:8080
```

Si tu frontend usa otra variable (por ejemplo `REACT_APP_API_URL`), ajústala en consecuencia.

📚 Documentación de API con Swagger/OpenAPI

El proyecto incluye documentación interactiva de la API usando Swagger UI.

### Acceder a Swagger UI

Una vez que el backend esté ejecutándose:

1. Abre tu navegador y ve a:
   ```
   http://localhost:8080/swagger-ui.html
   ```
   O también puedes acceder desde:
   ```
   http://localhost:8080/swagger-ui/index.html
   ```

2. Verás la interfaz de Swagger con todos los endpoints disponibles:
   - **Auth**: Endpoints de autenticación (registro, login, recuperación de contraseña)
   - **Productos**: CRUD completo de productos
   - **Usuarios**: Gestión de usuarios
   - **Películas**: CRUD de películas
   - **Funciones**: Gestión de funciones de cine
   - **Reservas**: Gestión de reservas

### Cómo probar endpoints en Swagger

1. **Expandir un endpoint**: Haz clic en cualquier endpoint para ver sus detalles
2. **Ver parámetros**: Revisa los parámetros requeridos y opcionales
3. **Probar endpoint**: 
   - Haz clic en "Try it out"
   - Completa los parámetros necesarios
   - Haz clic en "Execute"
   - Revisa la respuesta en la sección "Responses"

### Ejemplo: Crear una reserva

1. Busca el endpoint `POST /api/reservas`
2. Haz clic en "Try it out"
3. Completa el body con JSON:
   ```json
   {
     "nombreCliente": "Juan Pérez",
     "funcionId": 1,
     "asientos": ["A1", "A2"],
     "cantidad": 2
   }
   ```
4. Haz clic en "Execute"
5. Revisa la respuesta (debería ser 201 Created con los datos de la reserva)

### Ver documentación JSON

Para obtener la especificación OpenAPI en formato JSON:
```
http://localhost:8080/v3/api-docs
```

🎞️ Endpoints principales (API REST)

| Recurso          | Método        | Descripción                                       |
|------------------|---------------|---------------------------------------------------|
| `/api/peliculas` | GET / POST    | Obtener o agregar películas                       |
| `/api/funciones` | GET           | Consultar horarios y salas                        |
| `/api/reservas`  | POST          | Crear una nueva reserva con asientos              |
| `/api/usuarios`  | GET / POST    | (Opcional) Gestión de usuarios / autenticación    |

🧑‍💻 Roles del sistema

- Usuario: Puede consultar cartelera, funciones y reservar entradas.
- Administrador: Puede agregar, editar o eliminar películas y funciones.

📦 Build de producción

Frontend (genera `Front/dist`):

```bash
cd Front
npm run build
```

Backend (JAR ejecutable en `negocios/target`):

```bash
cd negocios
mvn clean package
java -jar target/negocios-0.0.1-SNAPSHOT.jar
```

☁️ Despliegue en Firebase Hosting (Frontend)

### Prerequisitos

1. **Cuenta de Firebase**: 
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Anota el **ID del proyecto**

2. **Instalar Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

3. **Iniciar sesión en Firebase**:
   ```bash
   firebase login
   ```
   Esto abrirá tu navegador para autenticarte.

### Configuración inicial (solo la primera vez)

1. **Inicializar Firebase en el proyecto** (desde la raíz del repositorio):
   ```bash
   firebase init hosting
   ```
   
2. **Configuración recomendada**:
   - ¿Qué directorio público usar? → `Front/dist`
   - ¿Configurar como SPA? → **Sí** (para que todas las rutas redirijan a `index.html`)
   - ¿Configurar GitHub Actions? → Opcional (puedes decir No)

3. **Configurar el proyecto**:
   - Edita el archivo `.firebaserc` y coloca tu ID de proyecto:
     ```json
     {
       "projects": {
         "default": "tu-proyecto-id"
       }
     }
     ```

### Configurar variables de entorno para producción

Antes de construir, crea un archivo `.env.production` en `Front/`:

```bash
cd Front
```

Crea `.env.production`:
```
VITE_API_URL=https://tu-backend-url.com
```

**Nota**: Reemplaza `https://tu-backend-url.com` con la URL de tu backend en producción (ej: Heroku, Railway, AWS, etc.)

### Pasos para desplegar

1. **Construir el frontend para producción**:
   ```bash
   cd Front
   npm run build
   ```
   Esto genera la carpeta `Front/dist` con los archivos optimizados.

2. **Volver a la raíz y desplegar**:
   ```bash
   cd ..
   firebase deploy --only hosting
   ```

3. **Verificar el despliegue**:
   - Firebase te dará una URL como: `https://tu-proyecto-id.web.app`
   - Abre esa URL en tu navegador para verificar que todo funciona

### Actualizar el despliegue

Cada vez que hagas cambios:

```bash
# 1. Construir
cd Front
npm run build

# 2. Desplegar
cd ..
firebase deploy --only hosting
```

### Configuración de Firebase incluida

- **`firebase.json`**: Configuración de hosting que apunta a `Front/dist` y define rewrites para SPA
- **`.firebaserc`**: Archivo de proyecto (debes configurar tu ID de proyecto)

### Troubleshooting

**Error: "Firebase project not found"**
- Verifica que el ID en `.firebaserc` sea correcto
- Asegúrate de estar autenticado: `firebase login`

**Error: "No se encuentra el directorio Front/dist"**
- Asegúrate de haber ejecutado `npm run build` en la carpeta `Front`
- Verifica que la carpeta `Front/dist` exista

**La aplicación carga pero no se conecta al backend**
- Verifica que `VITE_API_URL` en `.env.production` apunte a tu backend en producción
- Asegúrate de que tu backend tenga CORS configurado para permitir tu dominio de Firebase

**Las rutas no funcionan (404)**
- Verifica que `firebase.json` tenga el rewrite configurado:
  ```json
  {
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
  ```

📚 Notas técnicas

- Backend usa Java 17, Spring Boot 3.x y H2 en memoria por defecto (ver `negocios/src/main/resources/application.properties`). Puedes cambiar a MySQL configurando `spring.datasource.*` y `spring.jpa.*`.
- Frontend usa React 18 + Vite 5. El alias `@` apunta a `Front/src`.

✅ Buenas prácticas aplicadas

- Estructura documentada sin modificar la lógica existente.
- Instrucciones reproducibles de ejecución local y build.
- Configuración lista para despliegue de frontend en Firebase Hosting.


