// services/api.js
// Capa centralizada de acceso a la API backend.
// Todos los componentes React deben usar este módulo; nunca hardcodear URLs.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

/**
 * Realiza una petición GET a la API.
 * Lanza un error si la respuesta HTTP es >= 400.
 * Para HTTP 404, el error incluye la propiedad `status = 404`
 * para que los componentes puedan distinguirlo del resto de errores.
 *
 * @param {string} path - Ruta relativa, ej: '/restaurantes/'
 * @returns {Promise<any>} - JSON de la respuesta
 */
async function get(path) {
  const response = await fetch(`${BASE_URL}${path}`)

  if (!response.ok) {
    const err = new Error(`Error ${response.status}: ${response.statusText}`)
    if (response.status === 404) {
      err.status = 404
    }
    throw err
  }

  return response.json()
}

export const restaurantesService = {
  getAll:  ()   => get('/restaurantes/'),
  getById: (id) => get(`/restaurantes/${id}/`),
}

export const productosService = {
  getAll:  ()   => get('/productos/'),
  getById: (id) => get(`/productos/${id}/`),
}
