// routes/AppRoutes.jsx
// Define las rutas principales de la aplicación.

import { Routes, Route } from 'react-router-dom'
import HomePage         from '../pages/HomePage'
import RestaurantesPage from '../pages/RestaurantesPage'
import MenuPage         from '../pages/MenuPage'
import NosotrosPage     from '../pages/NosotrosPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                 element={<HomePage />} />
      <Route path="/restaurantes"     element={<RestaurantesPage />} />
      <Route path="/restaurantes/:id" element={<MenuPage />} />
      <Route path="/nosotros"         element={<NosotrosPage />} />
    </Routes>
  )
}

export default AppRoutes
