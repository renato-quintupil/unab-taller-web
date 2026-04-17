// components/LoadingSpinner.jsx
// Indicador visual mientras se cargan datos de la API.

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p>Cargando...</p>
    </div>
  )
}

export default LoadingSpinner
