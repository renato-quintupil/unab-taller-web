// pages/AdminRestauranteFormPage.jsx
// Formulario compartido para crear y editar un restaurante.
// Si hay :id en la URL → modo edición; si no → modo creación.

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { restaurantesService, adminRestaurantesService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const PLACEHOLDER = '/placeholder.png'

function AdminRestauranteFormPage() {
  const { id } = useParams()
  const isEdit  = Boolean(id)
  const navigate = useNavigate()

  const [nombre, setNombre]       = useState('')
  const [direccion, setDireccion] = useState('')
  const [imagen, setImagen]       = useState(null)       // File object
  const [preview, setPreview]     = useState(null)       // URL para previsualizar
  const [loading, setLoading]     = useState(isEdit)     // solo carga en modo edición
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState(null)

  // En modo edición, cargamos los datos actuales del restaurante
  useEffect(() => {
    if (!isEdit) return
    restaurantesService.getById(id)
      .then(data => {
        setNombre(data.nombre)
        setDireccion(data.direccion)
        setPreview(data.imagen || null)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImagen(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('direccion', direccion)
    // Solo adjuntamos imagen si el usuario seleccionó una nueva
    if (imagen) formData.append('imagen', imagen)

    try {
      if (isEdit) {
        await adminRestaurantesService.update(id, formData)
      } else {
        await adminRestaurantesService.create(formData)
      }
      navigate('/admin-panel')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <main className="page-container">
      <Link to="/admin-panel" className="btn-secondary">← Volver</Link>

      <h2>{isEdit ? 'Editar restaurante' : 'Nuevo restaurante'}</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            id="direccion"
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen {isEdit && '(deja vacío para conservar la actual)'}</label>
          <input
            id="imagen"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Vista previa"
              className="form-img-preview"
              onError={(e) => { e.target.src = PLACEHOLDER }}
            />
          )}
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn-primary btn-block" disabled={saving}>
          {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear restaurante'}
        </button>
      </form>
    </main>
  )
}

export default AdminRestauranteFormPage
