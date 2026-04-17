// components/RestauranteCard.jsx
// Card de un restaurante con imagen, nombre, dirección y botón "Ver menú".

import { Link } from 'react-router-dom'

const PLACEHOLDER = '/placeholder.png'

function RestauranteCard({ restaurante }) {
  // restaurante: { id, nombre, direccion, imagen }
  return (
    <div className="card">
      <img
        src={restaurante.imagen || PLACEHOLDER}
        alt={restaurante.nombre}
        className="card-img"
        onError={(e) => { e.target.src = PLACEHOLDER }}
      />
      <div className="card-body">
        <h3 className="card-title">{restaurante.nombre}</h3>
        <p className="card-text">{restaurante.direccion}</p>
        <Link to={`/restaurantes/${restaurante.id}`} className="btn-primary">
          Ver menú
        </Link>
      </div>
    </div>
  )
}

export default RestauranteCard
