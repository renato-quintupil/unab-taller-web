// components/PrivateRoute.jsx
// Guardia de ruta: redirige a /admin-panel/login si no hay token en localStorage.

import { Navigate } from 'react-router-dom'
import { adminAuthService } from '../services/api'

function PrivateRoute({ children }) {
  if (!adminAuthService.isLoggedIn()) {
    return <Navigate to="/admin-panel/login" replace />
  }
  return children
}

export default PrivateRoute
