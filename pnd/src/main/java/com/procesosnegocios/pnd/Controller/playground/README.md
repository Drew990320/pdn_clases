# 🚀 Spring Boot PND API - Guía de Postman

## 🏃‍♂️ Cómo Ejecutar

```bash
cd pnd
./mvnw spring-boot:run
```
**URL Base:** `http://localhost:8080`

## 📮 Configuración de Postman

### 1. Crear Environment
- **Nombre:** "Local Development"
- **Variable:** `base_url` = `http://localhost:8080`

### 2. Importar Colección
Copia y pega este JSON en Postman → Import → Raw Text:

```json
{
  "info": {
    "name": "Spring Boot PND API",
    "description": "Endpoints del proyecto Spring Boot PND"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8080"
    }
  ],
  "item": [
    {
      "name": "Hello Controller",
      "item": [
        {
          "name": "Hello Basic",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/hello"
          }
        },
        {
          "name": "Hello World",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/hello/world"
          }
        }
      ]
    },
    {
      "name": "Matemáticas",
      "item": [
        {
          "name": "Suma Query",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/matematicas/suma?a=15&b=25"
          }
        },
        {
          "name": "Suma Path",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/matematicas/suma/15/25"
          }
        },
        {
          "name": "Cuadrado",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/matematicas/cuadrado/12"
          }
        }
      ]
    },
    {
      "name": "CRUD Operations",
      "item": [
        {
          "name": "Get All",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/playground/crud"
          }
        },
        {
          "name": "Add Personaje",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"personaje\": \"Deadpool\"\n}"
            },
            "url": "{{base_url}}/api/playground/crud"
          }
        },
        {
          "name": "Update Personaje",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"personaje\": \"Spider-Man (Actualizado)\"\n}"
            },
            "url": "{{base_url}}/api/playground/crud/0"
          }
        },
        {
          "name": "Delete Personaje",
          "request": {
            "method": "DELETE",
            "url": "{{base_url}}/api/playground/crud/0"
          }
        }
      ]
    }
  ]
}
```

## 🎯 Endpoints Principales

### GET Requests (Fáciles de probar)

**Hello Controller:**
- `GET {{base_url}}/api/hello`
- `GET {{base_url}}/api/hello/world`
- `GET {{base_url}}/api/hello/nombre`

**Matemáticas:**
- `GET {{base_url}}/api/matematicas/suma?a=15&b=25`
- `GET {{base_url}}/api/matematicas/suma/15/25`
- `GET {{base_url}}/api/matematicas/cuadrado/12`
- `GET {{base_url}}/api/matematicas/resta/50/20`

**Saludos:**
- `GET {{base_url}}/api/saludar`
- `GET {{base_url}}/api/saludar/usuario?nombre=Juan`
- `GET {{base_url}}/api/saludar/usuario/María`

**Varios:**
- `GET {{base_url}}/api/varios/random`
- `GET {{base_url}}/api/varios/random/50`
- `GET {{base_url}}/api/varios/estudiantes`
- `GET {{base_url}}/api/varios/emoji/5`

### CRUD Operations

**GET - Obtener todos:**
```
Method: GET
URL: {{base_url}}/api/playground/crud
```

**POST - Agregar:**
```
Method: POST
URL: {{base_url}}/api/playground/crud
Headers: Content-Type: application/json
Body: {"personaje": "Deadpool"}
```

**PUT - Actualizar:**
```
Method: PUT
URL: {{base_url}}/api/playground/crud/0
Headers: Content-Type: application/json
Body: {"personaje": "Spider-Man (Actualizado)"}
```

**DELETE - Eliminar:**
```
Method: DELETE
URL: {{base_url}}/api/playground/crud/0
```

## 🧪 Pruebas Rápidas

1. **Importa la colección** usando el JSON de arriba
2. **Configura el environment** con `base_url = http://localhost:8080`
3. **Ejecuta la aplicación** con `./mvnw spring-boot:run`
4. **Prueba los endpoints** uno por uno

## 📊 Respuestas Esperadas

- **GET requests:** Texto plano o JSON
- **POST/PUT requests:** JSON con información de la operación
- **DELETE requests:** JSON con confirmación de eliminación

¡Disfruta probando todos los endpoints! 🎉