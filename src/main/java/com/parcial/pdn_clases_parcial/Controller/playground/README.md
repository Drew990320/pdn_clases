# 🎮 Playground CRUD Controller

## 📍 Ubicación
Este controlador se encuentra en:
```
proyecto/src/main/java/com/clasepdn/proyecto/Controller/playground/PlaygroundController.java
```

## 📋 Descripción
El `PlaygroundController` es un controlador de ejemplo que implementa todas las operaciones CRUD (Create, Read, Update, Delete) utilizando Spring Boot. Este controlador simula una base de datos en memoria para gestionar una entidad llamada "Item" con propiedades como id, nombre, descripción y precio.

## 🚀 Endpoints Disponibles

### Base URL
```
http://localhost:8080/api/playground
```

### 📖 Operaciones READ (GET)

#### 1. Obtener todos los items
```http
GET /api/playground/items
```
**Respuesta:** Lista de todos los items en el sistema

#### 2. Obtener item por ID
```http
GET /api/playground/items/{id}
```
**Parámetros:**
- `id` (Long): ID del item a buscar

**Respuesta:** Item específico o 404 si no existe

#### 3. Buscar items por nombre
```http
GET /api/playground/items/search?name={nombre}
```
**Parámetros:**
- `name` (String): Nombre o parte del nombre a buscar

**Respuesta:** Lista de items que coinciden con la búsqueda

#### 4. Información del playground
```http
GET /api/playground/info
```
**Respuesta:** Información general del controlador y endpoints disponibles

### ➕ Operaciones CREATE (POST)

#### 5. Crear nuevo item
```http
POST /api/playground/items
```
**Body (JSON):**
```json
{
    "name": "Nombre del item",
    "description": "Descripción del item",
    "price": 99.99
}
```
**Respuesta:** Item creado con ID asignado automáticamente

### ✏️ Operaciones UPDATE (PUT)

#### 6. Actualizar item existente
```http
PUT /api/playground/items/{id}
```
**Parámetros:**
- `id` (Long): ID del item a actualizar

**Body (JSON):**
```json
{
    "name": "Nuevo nombre",
    "description": "Nueva descripción",
    "price": 149.99
}
```
**Respuesta:** Item actualizado o 404 si no existe

### 🗑️ Operaciones DELETE

#### 7. Eliminar item específico
```http
DELETE /api/playground/items/{id}
```
**Parámetros:**
- `id` (Long): ID del item a eliminar

**Respuesta:** 204 No Content si se eliminó correctamente

#### 8. Eliminar todos los items
```http
DELETE /api/playground/items
```
**Respuesta:** 204 No Content, elimina todos los items y resetea el contador de IDs

## 🛠️ Cómo usar los endpoints

### Ejemplos con cURL

#### Obtener todos los items
```bash
curl -X GET http://localhost:8080/api/playground/items
```

#### Obtener item por ID
```bash
curl -X GET http://localhost:8080/api/playground/items/1
```

#### Buscar items por nombre
```bash
curl -X GET "http://localhost:8080/api/playground/items/search?name=laptop"
```

#### Crear nuevo item
```bash
curl -X POST http://localhost:8080/api/playground/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monitor",
    "description": "Monitor 4K de 27 pulgadas",
    "price": 299.99
  }'
```

#### Actualizar item
```bash
curl -X PUT http://localhost:8080/api/playground/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Pro",
    "description": "Portátil gaming actualizado",
    "price": 1499.99
  }'
```

#### Eliminar item
```bash
curl -X DELETE http://localhost:8080/api/playground/items/1
```

#### Eliminar todos los items
```bash
curl -X DELETE http://localhost:8080/api/playground/items
```

### Ejemplos con JavaScript (Fetch API)

#### Obtener todos los items
```javascript
fetch('http://localhost:8080/api/playground/items')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Crear nuevo item
```javascript
fetch('http://localhost:8080/api/playground/items', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Nuevo Item',
    description: 'Descripción del nuevo item',
    price: 50.00
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 📊 Estructura de Datos

### Item
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Portátil gaming de alta gama",
  "price": 1299.99
}
```

### ItemRequest (para POST/PUT)
```json
{
  "name": "Nombre del item",
  "description": "Descripción del item",
  "price": 99.99
}
```

## ⚠️ Notas Importantes

1. **Base de datos en memoria:** Los datos se almacenan en memoria y se pierden al reiniciar la aplicación
2. **IDs automáticos:** Los IDs se generan automáticamente de forma secuencial
3. **Validación:** El campo `name` es obligatorio y no puede estar vacío
4. **CORS habilitado:** El controlador permite peticiones desde cualquier origen
5. **Datos de ejemplo:** Al iniciar la aplicación, se crean automáticamente 3 items de ejemplo

## 🎯 Casos de Uso

- **Testing de APIs:** Ideal para probar operaciones CRUD
- **Aprendizaje:** Ejemplo completo de implementación de REST API
- **Prototipado:** Base para desarrollar funcionalidades más complejas
- **Demo:** Demostración de capacidades de Spring Boot

## 🔧 Tecnologías Utilizadas

- **Spring Boot:** Framework principal
- **Spring Web:** Para REST endpoints
- **Java:** Lenguaje de programación
- **JSON:** Formato de datos
- **HTTP:** Protocolo de comunicación

---

*Este controlador es parte del proyecto de clases de PDN (Programación de Dispositivos de Red)*
