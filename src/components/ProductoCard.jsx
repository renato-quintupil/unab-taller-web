// components/ProductoCard.jsx
// Card de un producto con imagen, nombre y precio formateado.

const PLACEHOLDER = '/placeholder.png'

const formatCLP = (precio) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precio)

function ProductoCard({ producto }) {
  // producto: { id, nombre, precio, imagen }
  return (
    <div className="card">
      <img
        src={producto.imagen || PLACEHOLDER}
        alt={producto.nombre}
        className="card-img"
        onError={(e) => { e.target.src = PLACEHOLDER }}
      />
      <div className="card-body">
        <h4 className="card-title">{producto.nombre}</h4>
        <p className="card-price">{formatCLP(producto.precio)}</p>
      </div>
    </div>
  )
}

export default ProductoCard
