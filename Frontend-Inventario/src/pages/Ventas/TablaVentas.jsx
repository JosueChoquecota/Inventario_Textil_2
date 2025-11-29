import React, { useState } from 'react'
import Spinner from '../../components/Common/Spinner.jsx'
import Error from '../../components/Common/Error.jsx'

export default function TablaVentas({ ventas = [], loading = false, error = null, onDelete, getId }) {
  const [expandedId, setExpandedId] = useState(null)

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

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id)

  // Estados de carga y error
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner />
        <p className="mt-3 text-muted">Cargando ventas...</p>
      </div>
    )
  }
  if (error) {
    return (
      <Error message={error.message || 'Error al cargar las ventas.'} />
    )
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        {/* Escritorio / Tablet */}
        <div className="d-none d-md-block">
          <div className="table-responsive" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-light sticky-top" style={{ zIndex: 10 }}>
                <tr>
                  <th style={{ width: '80px' }} className="text-center">ID</th>
                  <th style={{ width: '120px' }}>Fecha</th>
                  <th style={{ minWidth: '220px' }}>Cliente</th>
                  <th style={{ minWidth: '180px' }}>Registrado por</th>
                  <th style={{ width: '110px' }} className="text-center">Productos</th>
                  <th style={{ width: '110px' }} className="text-center">Unidades</th>
                  <th style={{ width: '130px' }} className="text-end">Total</th>
                  <th style={{ width: '120px' }} className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {ventas.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-5">
                      <p className="mb-0">No hay ventas registradas</p>
                      <small className="text-muted">
                        Presiona "Registrar Venta" para agregar una nueva venta
                      </small>
                    </td>
                  </tr>
                ) : (
                  ventas.map((venta) => {
                    const id = getId ? getId(venta) : venta.idVenta
                    const isExpanded = expandedId === id

                    return (
                      <React.Fragment key={id}>
                        {/* Fila principal */}
                        <tr
                          style={{ cursor: 'pointer' }}
                          onClick={() => toggleExpand(id)}
                          className={isExpanded ? 'table-active' : ''}
                        >
                          <td className="text-center">
                            <span className="badge bg-secondary rounded-pill">
                              #{id}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-calendar3 me-2 text-muted"></i>
                              <small className="fw-medium">{formatDate(venta.fecha)}</small>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="fw-semibold text-truncate" style={{ maxWidth: '220px' }}>
                                {venta.nombreCliente || 'Sin cliente'}
                              </div>
                              <small className="text-muted">
                                {venta.documentoCliente ? (
                                  <>
                                    <i className="bi bi-card-text me-1"></i>
                                    {venta.documentoCliente}
                                  </>
                                ) : 'Sin documento'}
                              </small>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-person-circle me-2 text-muted"></i>
                              <small>{venta.nombreCompletoTrabajador || 'Sin datos'}</small>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-info text-dark rounded-pill px-3">
                              {venta.totalProductos || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-primary rounded-pill px-3">
                              {venta.totalUnidades || 0}
                            </span>
                          </td>
                          <td className="text-end">
                            <span className="fw-bold text-black fs-6">
                              {formatCurrency(venta.precioTotal)}
                            </span>
                          </td>
                          <td className="text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="btn-group btn-group-sm" role="group">
                              <button
                                className={`btn ${isExpanded ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleExpand(id)
                                }}
                                title={isExpanded ? 'Contraer detalles' : 'Ver detalles'}
                              >
                                <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDelete && onDelete(venta)
                                }}
                                title="Eliminar venta"
                              >
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Fila expandida con detalles */}
                        {isExpanded && (
                          <tr className="bg-light">
                            <td colSpan="8" className="p-0">
                              <div className="p-4 border-top border-2 border-primary">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <h6 className="mb-0 text-primary">
                                    <i className="bi bi-box-seam-fill me-2"></i>
                                    Productos de la venta
                                  </h6>
                                  <span className="badge bg-primary">
                                    {venta.detalles?.length || 0} items
                                  </span>
                                </div>
                                {/* Detalles de productos vendidos */}
                                <div className="table-responsive">
                                  <table className="table table-sm table-bordered table-hover mb-0 bg-white">
                                    <thead className="table-secondary">
                                      <tr>
                                        <th>Producto</th>
                                        <th>Marca</th>
                                        <th>Categoría</th>
                                        <th className="text-center">Talla</th>
                                        <th className="text-center">Color</th>
                                        <th className="text-end">P. Unit.</th>
                                        <th className="text-center">Cant.</th>
                                        <th className="text-end">Subtotal</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {venta.detalles?.map((detalle, idx) => (
                                        <tr key={idx}>
                                          <td><div className="fw-semibold">{detalle.nombreProducto || '-'}</div></td>
                                          <td><small className="text-muted">{detalle.marcaProducto || '-'}</small></td>
                                          <td><small className="text-muted">{detalle.categoriaProducto || '-'}</small></td>
                                          <td className="text-center"><span className="badge bg-secondary">{detalle.talla || '-'}</span></td>
                                          <td className="text-center"><span className="badge bg-info text-dark">{detalle.color || '-'}</span></td>
                                          <td className="text-end"><span className="text-muted">{formatCurrency(detalle.precioUnitario)}</span></td>
                                          <td className="text-center"><strong className="text-primary">{detalle.cantidad}</strong></td>
                                          <td className="text-end"><strong className="text-success">{formatCurrency(detalle.subTotal)}</strong></td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot className="table-light">
                                      <tr className="fw-bold">
                                        <td colSpan="7" className="text-end">
                                          <i className="bi bi-calculator me-2"></i>
                                          TOTAL DE LA VENTA:
                                        </td>
                                        <td className="text-end">
                                          <span className="fs-5 text-success">{formatCurrency(venta.precioTotal)}</span>
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Móvil: cards */}
        <div className="d-block d-md-none p-3">
          {ventas.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="bi bi-inbox fs-1 d-block mb-3 text-secondary"></i>
              <p className="mb-0">No hay ventas registradas</p>
              <small className="text-muted">
                Presiona "Registrar Venta" para agregar una nueva venta
              </small>
            </div>
          ) : (
            ventas.map((venta) => {
              const id = getId ? getId(venta) : venta.idVenta
              const isExpanded = expandedId === id
              return (
                <div key={id} className="card mb-3 shadow-sm">
                  <div className="card-header bg-light py-2 d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary rounded-pill">#{id}</span>
                    <span className="fw-bold text-success">{formatCurrency(venta.precioTotal)}</span>
                  </div>
                  <div className="card-body p-3">
                    <div className="fw-semibold text-primary mb-1">
                      <i className="bi bi-person-badge me-2"></i>
                      {venta.nombreCliente || 'Sin cliente'}
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">
                        <i className="bi bi-card-text me-1"></i>
                        {venta.documentoCliente || 'Sin documento'}
                      </small>
                    </div>
                    <div className="mb-2">
                      <span className="badge bg-info text-dark me-1">
                        {venta.totalProductos || 0} productos
                      </span>
                      <span className="badge bg-primary">
                        {venta.totalUnidades || 0} unidades
                      </span>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">
                        <i className="bi bi-person-circle me-1"></i>
                        Registrado por: <strong>{venta.nombreCompletoTrabajador || 'Sin datos'}</strong>
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className={`btn btn-sm flex-fill ${isExpanded ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setExpandedId(isExpanded ? null : id)}
                      >
                        <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} me-1`}></i>
                        {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete && onDelete(venta)}
                        title="Eliminar venta"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                    {isExpanded && venta.detalles && venta.detalles.length > 0 && (
                      <div className="mt-3 border-top pt-3">
                        <h6 className="mb-3 text-primary">
                          <i className="bi bi-box-seam-fill me-2"></i>
                          Productos ({venta.detalles.length})
                        </h6>
                        {venta.detalles.map((detalle, idx) => (
                          <div key={idx} className="card mb-2 bg-light border-start border-3 border-info">
                            <div className="card-body p-2">
                              <div className="fw-semibold mb-1">
                                {detalle.nombreProducto || '-'}
                              </div>
                              <small className="text-muted d-block mb-2">
                                <i className="bi bi-bookmark me-1"></i>
                                {detalle.marcaProducto} - {detalle.categoriaProducto}
                              </small>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <span className="badge bg-secondary me-1">
                                    {detalle.talla || '-'}
                                  </span>
                                  <span className="badge bg-info text-dark">
                                    {detalle.color || '-'}
                                  </span>
                                </div>
                                <div className="text-end">
                                  <small className="text-muted d-block">
                                    {detalle.cantidad} × {formatCurrency(detalle.precioUnitario)}
                                  </small>
                                  <strong className="text-success">
                                    {formatCurrency(detalle.subTotal)}
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="card bg-primary text-white mt-3">
                          <div className="card-body p-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw-bold">
                                <i className="bi bi-calculator me-2"></i>
                                TOTAL:
                              </span>
                              <span className="fs-5 fw-bold">
                                {formatCurrency(venta.precioTotal)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
