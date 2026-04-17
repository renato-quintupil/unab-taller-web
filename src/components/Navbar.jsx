// components/Navbar.jsx
// Barra de navegación con links a las secciones principales del sitio.

import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">FoodPlease</Link>
      <div className="navbar-links">
        <Link to="/restaurantes">Locales</Link>
        <Link to="/nosotros">Nosotros</Link>
      </div>
    </nav>
  )
}

export default Navbar
