// pages/RestaurantesPage.jsx
// Lista todos los restaurantes obtenidos desde la API.

import { useState, useEffect } from 'react'
import { restaurantesService } from '../services/api'
import RestauranteCard from '../components/RestauranteCard'
import LoadingSpinner from '../components/LoadingSpinner'

function RestaurantesPage() {
  const [restaurantes, setRestaurantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    restaurantesService.getAll()
      .then(data => setRestaurantes(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />
  if (error)   return <p className="error-msg">Error: {error}</p>

  return (
    <main className="page-container">
      <h2>Restaurantes disponibles</h2>
      {restaurantes.length === 0
        ? <p>No hay restaurantes disponibles.</p>
        : (
          <div className="grid">
            {restaurantes.map(r => (
              <RestauranteCard key={r.id} restaurante={r} />
            ))}
          </div>
        )
      }
    </main>
  )
}

export default RestaurantesPage
