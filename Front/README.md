# Frontend PDN (React + Vite + TS)

Proyecto frontend para consumir la API del backend `negocios` (Spring Boot). Incluye CRUD de Producto, gestión básica de Usuario y flujo de autenticación.

## Requisitos
- Node.js 18+
- Backend en http://localhost:8080

## Arranque
```bash
cd front
npm install
npm run dev
```

Opcional `.env`:
```bash
VITE_API_URL=http://localhost:8080/api
```

## Estructura
```
src/
  api/api.ts
  context/ThemeContext.tsx
  components/ui/*
  layouts/MainLayout.tsx
  pages/
    auth/*
    productos/*
    usuarios/*
  App.tsx
  main.tsx
  index.css
```

## Rutas
- /productos, /productos/nuevo, /productos/:id, /productos/:id/editar
- /usuarios, /usuarios/:id, /usuarios/:id/editar
- /auth/login, /auth/register, /auth/forgot, /auth/reset

## Estilo/tema
- TailwindCSS, modo claro/oscuro con `ThemeProvider` y `localStorage`.
- Acentos: claro #007BFF, oscuro #00FF88.

## Notas
- Manejo básico de errores con `ErrorAlert` y loaders con `Loader`.
- Tipos en `api/api.ts` alineados con DTOs del backend.
