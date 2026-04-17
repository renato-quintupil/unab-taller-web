// pages/MenuPage.jsx
// Detalle de un restaurante y su lista de productos.

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { restaurantesService } from '../services/api'
import ProductoCard from '../components/ProductoCard'
import LoadingSpinner from '../components/LoadingSpinner'

function MenuPage() {
  const { id } = useParams()
  const [restaurante, setRestaurante] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    restaurantesService.getById(id)
      .then(data => setRestaurante(data))
      .catch(err => {
        if (err.status === 404) setNotFound(true)
        else setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading)  return <LoadingSpinner />
  if (notFound) return <p>Restaurante no encontrado.</p>
  if (error)    return <p className="error-msg">Error: {error}</p>

  return (
    <main className="page-container">
      <Link to="/restaurantes" className="btn-secondary">← Volver</Link>
      <h2>{restaurante.nombre}</h2>
      <p>{restaurante.direccion}</p>
      <h3>Menú</h3>
      {restaurante.productos.length === 0
        ? <p>Este restaurante no tiene productos disponibles.</p>
        : (
          <div className="grid">
            {restaurante.productos.map(p => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        )
      }
    </main>
  )
}

export default MenuPage
