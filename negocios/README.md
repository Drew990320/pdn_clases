## Proyecto: Negocios (Spring Boot)

### Objetivo
Backend en Spring Boot para exponer una API REST con autenticación de usuarios (registro, login, olvido y reseteo de contraseña) y un CRUD de `Producto` para pruebas. Usa H2 en desarrollo.

---

## Requisitos
- Java 17
- Maven 3.9+
- (Opcional) Postman o cURL

---

## Cómo ejecutar
Desde el directorio `negocios`:

```bash
./mvnw spring-boot:run
```

Aplicación por defecto en `http://localhost:8080`.

Consola H2: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:negociosdb`
- User: `sa`  Password: (vacío)

---

## Estructura del proyecto

```
src/main/java/com/proyecto/negocios/
├─ NegociosApplication.java
├─ config/
│  └─ SecurityConfig.java
├─ domain/
│  ├─ Producto.java
│  └─ Usuario.java
├─ dto/
│  ├─ ProductoDTO.java
│  └─ auth/
│     ├─ RegisterRequest.java
│     ├─ LoginRequest.java
│     ├─ ForgotPasswordRequest.java
│     └─ ResetPasswordRequest.java
├─ mapper/
│  └─ ProductoMapper.java
├─ repository/
│  ├─ ProductoRepository.java
│  └─ UsuarioRepository.java
├─ service/
│  ├─ ProductoService.java
│  ├─ AuthService.java
│  └─ impl/
│     ├─ ProductoServiceImpl.java
│     └─ AuthServiceImpl.java
└─ web/
   ├─ ProductoController.java
   └─ AuthController.java

src/main/resources/
└─ application.properties
```

---

## Dependencias (pom.xml) y uso
- `spring-boot-starter-web`: controladores REST con Spring MVC.
- `spring-boot-starter-data-jpa`: integración JPA/Hibernate y `JpaRepository`.
- `spring-boot-starter-validation`: validación de DTOs (Jakarta Validation).
- `spring-boot-starter-security`: base de seguridad HTTP. En este proyecto se permite acceso libre a la API/H2 para pruebas.
- `spring-boot-starter-actuator`: endpoints de salud/monitorización.
- `spring-boot-starter-thymeleaf` y `thymeleaf-extras-springsecurity6`: motor de plantillas (no esencial para esta API REST, pero disponible).
- `h2`: base de datos en memoria para desarrollo/pruebas.
- `mysql-connector-j` / `postgresql`: drivers para ambientes que lo requieran (no necesarios en H2).
- `spring-boot-devtools`: recarga en caliente para desarrollo.
- `lombok`: utilitario para reducir boilerplate (opcional).
- `spring-boot-starter-test` y `spring-security-test`: pruebas.

Fragmentos relevantes del `pom.xml`:

```xml
<properties>
  <java.version>17</java.version>
</properties>
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
  </dependency>
  <dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
  </dependency>
  <!-- ... resto omitido por brevedad ... -->
</dependencies>
```

---

## Configuración de base de datos (H2) y JPA
Archivo `src/main/resources/application.properties`:

```properties
spring.application.name=negocios

spring.datasource.url=jdbc:h2:mem:negociosdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

---

## Seguridad (config básica para pruebas)
`SecurityConfig` permite el acceso a `/api/auth/**`, `/api/productos/**`, `/h2-console/**` y `/actuator/**` sin autenticación para facilitar pruebas locales.

```java
http
  .csrf(csrf -> csrf.disable())
  .authorizeHttpRequests(auth -> auth
    .requestMatchers("/h2-console/**", "/actuator/**", "/api/auth/**").permitAll()
    .requestMatchers("/api/productos/**").permitAll()
    .anyRequest().permitAll()
  );
```

---

## API REST de Producto

Entidad: `Producto { id, nombre, precio, stock }`

- Crear producto (POST) `/api/productos`
  ```json
  { "nombre": "Teclado", "precio": 99.9, "stock": 10 }
  ```

- Listar productos (GET) `/api/productos`

- Obtener por id (GET) `/api/productos/{id}`

- Actualizar (PUT) `/api/productos/{id}`
  ```json
  { "nombre": "Teclado mecánico", "precio": 129.9, "stock": 8 }
  ```

- Eliminar (DELETE) `/api/productos/{id}`

---

## API REST de Usuario
CRUD básico para consultar y administrar usuarios (sin exponer contraseñas). La creación de usuarios se realiza mediante `POST /api/auth/register`.

- Obtener por id (GET) `/api/usuarios/{id}`
- Listar (GET) `/api/usuarios`
- Actualizar (PUT) `/api/usuarios/{id}`
  ```json
  { "email": "nuevo@example.com", "nombre": "Nuevo Nombre", "enabled": true }
  ```
- Eliminar (DELETE) `/api/usuarios/{id}`

> Nota: `UsuarioDTO` no contiene contraseña. El cambio de contraseña se realiza por flujo de reset.

---

## API de Autenticación (implementada)
Este proyecto incluye endpoints funcionales para registro, login, olvido de contraseña y reseteo. Las contraseñas se almacenan con BCrypt.

### Modelo y persistencia de usuario
- `Usuario { id, email, passwordHash, nombre, enabled, resetToken, resetTokenExp }`.
- `UsuarioRepository` con consultas por `email` y `resetToken`.

### Endpoints
- Registro: `POST /api/auth/register`
  - Request:
    ```json
    { "email": "user@example.com", "password": "Secreta123", "nombre": "Usuario" }
    ```
  - Respuesta `201 Created` con `{ "userId": <id> }`.

- Login: `POST /api/auth/login`
  - Request:
    ```json
    { "email": "user@example.com", "password": "Secreta123" }
    ```
  - Respuesta `200 OK` con `{ "userId": <id> }`.

- Forgot-password (solicitud): `POST /api/auth/forgot-password`
  - Request:
    ```json
    { "email": "user@example.com" }
    ```
  - Respuesta `200 OK` con `{ "resetToken": "..." }` para pruebas locales.

- Reset-password (confirmación): `POST /api/auth/reset-password`
  - Request:
    ```json
    { "token": "<resetToken>", "newPassword": "NuevaSecreta123" }
    ```
  - Respuesta `204 No Content` si el token es válido y no expiró.

### Pruebas rápidas (cURL)
Registro:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Secreta123","nombre":"Usuario"}'
```

Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Secreta123"}'
```

Forgot-password:
```bash
curl -X POST http://localhost:8080/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

Reset-password:
```bash
curl -X POST http://localhost:8080/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"<token>","newPassword":"NuevaSecreta123"}'
```

---

## Siguientes pasos sugeridos
- Implementar `Usuario`, `AuthController`, `AuthService` y generación de JWT.
- Añadir `@ControllerAdvice` para manejo de errores estandarizado.
- Documentar con OpenAPI (springdoc-openapi) para probar desde Swagger UI.
- Añadir paginación/búsqueda a `Producto`.

---

## Troubleshooting
- Si H2 Console no carga, revisa `SecurityConfig` y que `frameOptions` esté deshabilitado para H2.
- Si `ddl-auto=update` no crea tablas, elimina el `schema` de H2 (en memoria) reiniciando la app.
- Para MySQL/PostgreSQL, comenta H2 y habilita el driver/URL correspondiente en `application.properties`.



