// pages/HomePage.jsx
// Página de bienvenida con mensaje y botón de navegación a /restaurantes.

import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="page-container">
      <h1>Bienvenido a FoodPlease</h1>
      <p>Descubre los mejores restaurantes y pide tu comida favorita fácil y rápido.</p>
      <Link to="/restaurantes" className="btn-primary">
        Ver restaurantes
      </Link>
    </main>
  )
}

export default HomePage
