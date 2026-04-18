// routes/AppRoutes.jsx
// Define las rutas principales de la aplicación.

import { Routes, Route } from 'react-router-dom'
import HomePage                   from '../pages/HomePage'
import RestaurantesPage           from '../pages/RestaurantesPage'
import MenuPage                   from '../pages/MenuPage'
import NosotrosPage               from '../pages/NosotrosPage'
import AdminLoginPage             from '../pages/AdminLoginPage'
import AdminPage                  from '../pages/AdminPage'
import AdminRestauranteFormPage   from '../pages/AdminRestauranteFormPage'
import PrivateRoute               from '../components/PrivateRoute'

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/"                 element={<HomePage />} />
      <Route path="/restaurantes"     element={<RestaurantesPage />} />
      <Route path="/restaurantes/:id" element={<MenuPage />} />
      <Route path="/nosotros"         element={<NosotrosPage />} />

      {/* Rutas de administración */}
      <Route path="/admin-panel/login" element={<AdminLoginPage />} />
      <Route path="/admin-panel" element={
        <PrivateRoute><AdminPage /></PrivateRoute>
      } />
      <Route path="/admin-panel/nuevo" element={
        <PrivateRoute><AdminRestauranteFormPage /></PrivateRoute>
      } />
      <Route path="/admin-panel/editar/:id" element={
        <PrivateRoute><AdminRestauranteFormPage /></PrivateRoute>
      } />
    </Routes>
  )
}

export default AppRoutes
