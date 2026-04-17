# ============================================================
# Stage 1: builder
# Instala dependencias y construye el bundle estático con Rsbuild
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# VITE_API_URL es una variable de BUILD TIME:
# Rsbuild la incrusta en el bundle durante "npm run build".
# Por eso va como ARG (argumento de construcción), no como ENV de runtime.
ARG VITE_API_URL=http://localhost:8000/api
ENV VITE_API_URL=$VITE_API_URL

# Copiar solo los archivos de dependencias primero (aprovecha la caché de Docker)
COPY package.json package-lock.json* ./
RUN npm install

# Copiar el resto del proyecto y construir
COPY . .
RUN npm run build

# ============================================================
# Stage 2: servidor estático
# Sirve el bundle generado con "serve" (sin Node.js completo)
# ============================================================
FROM node:20-alpine

WORKDIR /app

# Instalar "serve" globalmente para servir archivos estáticos
RUN npm install -g serve

# Copiar solo el build generado en el stage anterior
COPY --from=builder /app/dist ./dist

# Puerto en el que escucha el servidor
EXPOSE 5173

# Iniciar el servidor estático
CMD ["serve", "-s", "dist", "-l", "5173"]
