// pages/AdminPage.jsx
// Panel de administración: lista restaurantes con opciones de crear, editar y eliminar.

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { restaurantesService, adminRestaurantesService, adminAuthService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

function AdminPage() {
  const [restaurantes, setRestaurantes] = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [deletingId, setDeletingId]     = useState(null)
  const navigate = useNavigate()

  const cargarRestaurantes = () => {
    setLoading(true)
    restaurantesService.getAll()
      .then(data => setRestaurantes(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { cargarRestaurantes() }, [])

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return
    setDeletingId(id)
    try {
      await adminRestaurantesService.delete(id)
      setRestaurantes(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      alert(`Error al eliminar: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  const handleLogout = () => {
    adminAuthService.logout()
    navigate('/admin-panel/login')
  }

  if (loading) return <LoadingSpinner />
  if (error)   return <p className="error-msg">Error: {error}</p>

  return (
    <main className="page-container">
      <div className="admin-header">
        <h2>Panel de administración</h2>
        <div className="admin-header-actions">
          <Link to="/admin-panel/nuevo" className="btn-primary">+ Nuevo restaurante</Link>
          <button onClick={handleLogout} className="btn-secondary">Cerrar sesión</button>
        </div>
      </div>

      {restaurantes.length === 0
        ? <p>No hay restaurantes. Crea el primero.</p>
        : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {restaurantes.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.nombre}</td>
                  <td>{r.direccion}</td>
                  <td className="admin-table-actions">
                    <Link to={`/admin-panel/editar/${r.id}`} className="btn-edit">
                      Editar
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(r.id, r.nombre)}
                      disabled={deletingId === r.id}
                    >
                      {deletingId === r.id ? '…' : 'Eliminar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </main>
  )
}

export default AdminPage
