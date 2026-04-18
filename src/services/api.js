// services/api.js
// Capa centralizada de acceso a la API backend.
// Todos los componentes React deben usar este módulo; nunca hardcodear URLs.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// ── Helpers privados ──────────────────────────────────────────

function getToken() {
  return localStorage.getItem('adminToken')
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Token ${token}` } : {}
}

async function get(path) {
  const response = await fetch(`${BASE_URL}${path}`)

  if (!response.ok) {
    const err = new Error(`Error ${response.status}: ${response.statusText}`)
    if (response.status === 404) err.status = 404
    throw err
  }

  return response.json()
}

// Usado para operaciones de escritura con FormData (soporta imágenes)
async function mutate(method, path, body) {
  const isFormData = body instanceof FormData
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...authHeaders(),
      // No establecer Content-Type con FormData: el browser lo hace con el boundary
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    },
    body: isFormData ? body : JSON.stringify(body),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    const msg = data.detail || data.non_field_errors?.[0] || `Error ${response.status}`
    throw new Error(msg)
  }

  // DELETE devuelve 204 sin body
  if (response.status === 204) return null
  return response.json()
}

// ── Servicios públicos (lectura) ──────────────────────────────

export const restaurantesService = {
  getAll:  ()   => get('/restaurantes/'),
  getById: (id) => get(`/restaurantes/${id}/`),
}

export const productosService = {
  getAll:  ()   => get('/productos/'),
  getById: (id) => get(`/productos/${id}/`),
}

// ── Servicio de autenticación admin ──────────────────────────

export const adminAuthService = {
  // Devuelve el token y lo guarda en localStorage
  login: async (username, password) => {
    const response = await fetch(`${BASE_URL}/auth/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) throw new Error('Credenciales incorrectas')

    const data = await response.json()
    localStorage.setItem('adminToken', data.token)
    return data.token
  },

  logout: () => localStorage.removeItem('adminToken'),

  isLoggedIn: () => Boolean(localStorage.getItem('adminToken')),
}

// ── Servicio CRUD admin de restaurantes ───────────────────────

export const adminRestaurantesService = {
  // FormData para soportar upload de imagen
  create: (formData) => mutate('POST',   '/restaurantes/', formData),
  update: (id, formData) => mutate('PATCH', `/restaurantes/${id}/`, formData),
  delete: (id) => mutate('DELETE', `/restaurantes/${id}/`),
}
