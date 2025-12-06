import React from 'react'
import Spinner from '../../components/Common/Spinner.jsx'
import Error from '../../components/Common/error.jsx'

export default function TablaVentas({ ventas = [], loading = false, error = null, onDelete, getId }) {
  const formatDate = (fecha) => {
    if (!fecha) return '-'
    try {
      const [year, month, day] = fecha.split('-')
      return `${day}/${month}/${year}`
    } catch {
      return fecha
    }
  }

  const formatCurrency = (value) => `S/ ${Number(value || 0).toFixed(2)}`

  return (
    <div className="card mt-3 p-3">
      {/* Contador estilo Trabajadores */}
      <div className="mb-2">
        <strong>Ventas</strong>
        <small className="text-muted ms-2">
          ({loading ? '...' : ventas.length} {ventas.length === 1 ? 'venta' : 'ventas'})
        </small>
      </div>

      {/* Show error if exists */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          <Error message={error.message || 'Error al cargar las ventas.'} />
        </div>
      )}

      {/* Show loading only in table area */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="text-center">
            <Spinner size="3rem" />
            <p className="mt-3 text-muted">Cargando ventas...</p>
          </div>
        </div>
      ) : (
        <>

      {/* Desktop/Tablet */}
      <div className="d-none d-md-block" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle" style={{ minWidth: 1000 }}>
            <thead className="table-light sticky-top">
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Registrado por</th>
                <th>Productos</th>
                <th>Unidades</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length === 0 ? (
                <tr key="no-ventas">
                  <td colSpan={8} className="text-center text-muted py-4">
                    <i className="bi bi-inbox display-4 d-block mb-2"></i>
                    No hay ventas registradas
                  </td>
                </tr>
              ) : ventas.map(venta => {
                const id = getId ? getId(venta) : venta.idVenta
                return (
                  <tr key={id}>
                    <td className="text-muted">{id}</td>
                    <td>
                      <i className="bi bi-calendar3 me-1"></i>
                      {formatDate(venta.fecha)}
                    </td>
                    <td>
                      <strong>{venta.nombreCliente || 'Sin cliente'}</strong>
                      {venta.documentoCliente && (
                        <div><small className="text-muted">{venta.documentoCliente}</small></div>
                      )}
                    </td>
                    <td>
                      <i className="bi bi-person me-1"></i>
                      {venta.nombreCompletoTrabajador || 'Sin datos'}
                    </td>
                    <td className="text-center">
                      <span className="badge bg-info">{venta.totalProductos || 0}</span>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-primary">{venta.totalUnidades || 0}</span>
                    </td>
                    <td className="text-end">
                      <strong>{formatCurrency(venta.precioTotal)}</strong>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        {onDelete && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                            onClick={() => onDelete(venta)}
                          >
                            <i className="bi bi-trash-fill" aria-hidden="true"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-block d-md-none">
        {ventas.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i className="bi bi-inbox display-4 d-block mb-2"></i>
            No hay ventas registradas
          </div>
        ) : ventas.map(venta => {
          const id = getId ? getId(venta) : venta.idVenta
          return (
            <div key={id} className="card mb-3 border">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-secondary"># {id}</span>
                  <small className="text-muted">{formatDate(venta.fecha)}</small>
                </div>
                <h6 className="card-title mb-2">
                  <strong>{venta.nombreCliente || 'Sin cliente'}</strong>
                </h6>
                {venta.documentoCliente && (
                  <p className="text-muted small mb-2">{venta.documentoCliente}</p>
                )}
                <div className="row text-center mb-2">
                  <div className="col-4">
                    <small className="text-muted">Productos</small>
                    <div><span className="badge bg-info">{venta.totalProductos || 0}</span></div>
                  </div>
                  <div className="col-4">
                    <small className="text-muted">Unidades</small>
                    <div><span className="badge bg-primary">{venta.totalUnidades || 0}</span></div>
                  </div>
                  <div className="col-4">
                    <small className="text-muted">Total</small>
                    <div><strong>{formatCurrency(venta.precioTotal)}</strong></div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    <i className="bi bi-person me-1"></i>
                    {venta.nombreCompletoTrabajador || 'Sin datos'}
                  </small>
                  {onDelete && (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(venta)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

        </>
      )}
    </div>
  )
}
