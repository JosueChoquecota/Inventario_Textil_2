import React from 'react'
import Spinner from '../../components/Common/Spinner'
import Error from '../../components/Common/error'

function ProductoImagen({ url, nombre, size = 50 }) {
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  if (!url || error) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center bg-light rounded"
        style={{ width: size, height: size }}
      >
        <i className="bi bi-image text-muted" style={{ fontSize: size * 0.4 }}></i>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {loading && (
        <div 
          className="d-flex align-items-center justify-content-center position-absolute"
          style={{ width: size, height: size }}
        >
          <div className="spinner-border spinner-border-sm text-secondary" style={{ width: 20, height: 20 }} />
        </div>
      )}
      <img 
        src={url}
        alt={nombre}
        className="rounded"
        style={{ 
          width: size, 
          height: size, 
          objectFit: 'cover',
          display: loading ? 'none' : 'block'
        }}
        onLoad={() => setLoading(false)}
        onError={() => {
          console.error('❌ Error al cargar imagen:', url)
          setError(true)
          setLoading(false)
        }}
      />
    </div>
  )
}

export default function TablaInventario({ 
  items = [], 
  loading,
  error,
  onEdit,
  onDelete,
  getId 
}) {
  if (loading) return <Spinner fullScreen size='5rem' />
  if (error) return <Error />

  return (
    <div className="card mt-3 p-3">
      <div className="mb-2">
        <strong>Productos</strong>
        <small className="text-muted ms-2">
          ({items.length} {items.length === 1 ? 'producto' : 'productos'})
        </small>
      </div>

      {/* Escritorio/Tablet */}
      <div className="d-none d-md-block" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle" style={{ minWidth: 900 }}>
            <thead className="table-light sticky-top">
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Marca</th>
                <th style={{ width: 140 }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    <i className="bi bi-inbox display-4 d-block mb-2"></i>
                    No hay productos registrados
                  </td>
                </tr>
              ) : (
                items.map(producto => {
                  const id = getId(producto)
                  return (
                    <tr key={id}>
                      <td className="text-muted">{id}</td>
                      <td>
                        <ProductoImagen 
                          url={producto.imagen}
                          nombre={producto.nombre}
                          size={45}
                        />
                      </td>
                      <td><strong>{producto.nombre}</strong></td>
                      <td>{producto.descripcion || '—'}</td>
                      <td>
                        {producto.categoria?.nombre || 
                         producto.nombreCategoria || '—'}
                      </td>
                      <td>
                        {producto.marca?.marca || 
                         producto.marca?.nombre || 
                         producto.nombreMarca || '—'}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            title="Editar"
                            onClick={() => onEdit && onEdit(producto)}
                          >
                            <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            title="Eliminar"
                            onClick={() => onDelete && onDelete(producto)}
                          >
                            <i className="bi bi-trash-fill" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Móvil */}
      <div className="d-block d-md-none">
        {items.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i className="bi bi-inbox display-4 d-block mb-2"></i>
            No hay productos registrados
          </div>
        ) : (
          items.map(producto => {
            const id = getId(producto)
            return (
              <div key={id} className="card mb-2 shadow-sm">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    {/* ✅ Imagen a la izquierda */}
                    <ProductoImagen 
                      url={producto.imagen}
                      nombre={producto.nombre}
                      size={60}
                    />
                    
                    <div className="flex-grow-1 ms-3">
                      <div className="fw-bold mb-1">
                        <span className="text-muted small">#{id}</span> · {producto.nombre}
                      </div>
                      
                      {producto.descripcion && (
                        <div className="small text-muted mb-2">
                          {producto.descripcion}
                        </div>
                      )}
                      
                      <div className="small">
                        <span className="badge bg-secondary me-1">
                          {producto.categoria?.nombre || '—'}
                        </span>
                        <span className="badge bg-info">
                          {producto.marca?.marca || producto.marca?.nombre || '—'}
                        </span>
                      </div>
                    </div>
                    
                    {/* ✅ Botones a la derecha */}
                    <div className="d-flex flex-column gap-2 ms-3">
                      <button 
                        className="btn btn-sm btn-outline-primary" 
                        style={{
                          width: '50px',
                          height: '50px',
                          padding: 0
                        }}
                        title="Editar"
                        onClick={() => onEdit && onEdit(producto)}
                      >
                        <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger" 
                        style={{
                          width: '50px',
                          height: '50px',
                          padding: 0
                        }}
                        title="Eliminar"
                        onClick={() => onDelete && onDelete(producto)}
                      >
                        <i className="bi bi-trash-fill" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
