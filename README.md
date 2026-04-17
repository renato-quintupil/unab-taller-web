# FoodPlease v3.0 — Frontend Web

Aplicación web desarrollada con React + Rsbuild para el proyecto universitario FoodPlease v3.0 (UNAB — Taller de Desarrollo Web). Permite explorar restaurantes y sus menús consumiendo la API REST del backend Django.

---

## Stack tecnológico

- **React 18** — UI
- **Rsbuild** — bundler y servidor de desarrollo
- **React Router v6** — navegación SPA
- **Docker** — contenedorización (opcional)

---

## Requisitos previos

- Node.js 20+
- npm
- Docker (opcional, solo para ejecución con contenedor)

---

## Ejecución local

```bash
npm install
```

Copia el archivo de variables de entorno y ajusta la URL del backend si es necesario:

```bash
cp .env.example .env
```

Edita `.env` si el backend no corre en `http://localhost:8000`:

```
VITE_API_URL=http://localhost:8000/api
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

La app queda disponible en **http://localhost:5173**.

---

## Build

```bash
npm run build
```

Genera el bundle estático en `dist/`.

---

## Ejecución con Docker

### Build manual

```bash
docker build --build-arg VITE_API_URL=http://localhost:8000/api -t foodplease-web .
docker run -p 5173:5173 foodplease-web
```

### Con docker-compose

```bash
docker-compose up --build
```

> **Nota sobre `VITE_API_URL`:** esta variable se pasa como `--build-arg` (no como variable de entorno de runtime) porque Rsbuild la incrusta directamente en el bundle durante el build. Cambiarla después de construir la imagen no tiene efecto; hay que reconstruir la imagen con el nuevo valor.

---

## Variables de entorno

| Variable       | Descripción                        | Valor por defecto             |
|----------------|------------------------------------|-------------------------------|
| `VITE_API_URL` | URL base de la API REST del backend | `http://localhost:8000/api`   |

---

## Rutas del frontend

| Ruta                  | Página            | Descripción                                      |
|-----------------------|-------------------|--------------------------------------------------|
| `/`                   | HomePage          | Página de bienvenida con acceso a restaurantes   |
| `/restaurantes`       | RestaurantesPage  | Listado de todos los restaurantes                |
| `/restaurantes/:id`   | MenuPage          | Menú de productos de un restaurante específico   |
| `/nosotros`           | NosotrosPage      | Información del proyecto                         |

---

## Endpoints del backend que consume

| Método | Endpoint                    | Descripción                              |
|--------|-----------------------------|------------------------------------------|
| `GET`  | `/api/restaurantes/`        | Lista todos los restaurantes             |
| `GET`  | `/api/restaurantes/{id}/`   | Detalle de un restaurante y su menú      |
| `GET`  | `/api/productos/`           | Lista todos los productos                |

El backend debe estar corriendo en `http://localhost:8000` (o el valor configurado en `VITE_API_URL`).

---

## Alcance

El carrito de compras y el flujo de pedidos **no están implementados** en esta fase del proyecto. La aplicación cubre únicamente la exploración de restaurantes y menús.
