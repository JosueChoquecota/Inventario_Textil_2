import React, { useEffect, useState } from 'react'
import { obtenerStock } from '../../api/stockApi'
import Spinner from '../../components/Common/Spinner'
import Error from '../../components/Common/error'

export default function StockPage() {
  const [stock, setStock] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    obtenerStock()
      .then(data => {
        setStock(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const formatCurrency = (value) => `S/ ${Number(value || 0).toFixed(2)}`

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <Spinner message="Cargando stock..." />
      </div>
    )
  }
  if (error) {
    return (
      <div className="container-fluid py-4">
        <Error message={error} />
      </div>
    )
  }

  return (
    <div className="container-fluid py-0">
      {/* Título y subtítulo */}
      <div className="mb-3">
        <h4 className="mb-1">
          <i className="bi bi-cart-fill me-2"></i>
          Stock
        </h4>
        <small className="text-muted">
          Visor de Stock de Productos
        </small>
      </div>

      <div className="card shadow-sm">
        {/* Título de la tabla */}
        <div className="mb-2 pt-3 px-3 pb-0">
          <strong>Clientes</strong>
          <small className="text-muted ms-2">
            ({stock.length} {stock.length === 1 ? 'producto' : 'productos'})
          </small>
        </div>
        <div className="card-body p-0">
          {/* Vista escritorio/tablet */}
          <div className="d-none d-md-block" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
            <div className="table-responsive pe-3 pb-3 pt-0 px-3">
              <table className="table table-hover align-middle" style={{ minWidth: 900 }}>
                <thead className="table-light sticky-top">
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Talla</th>
                    <th>Color</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Proveedor</th>
                    <th style={{ width: 140 }}>Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center text-muted py-4">
                        <i className="bi bi-inbox display-4 d-block mb-2"></i>
                        No hay productos en stock
                      </td>
                    </tr>
                  ) : (
                    stock.map(item => {
                      const id = item.idListaProducto
                      const isExpanded = expandedId === id
                      return (
                        <React.Fragment key={id}>
                          <tr style={{ cursor: 'pointer' }} onClick={() => setExpandedId(isExpanded ? null : id)}>
                            <td className="text-muted">{id}</td>
                            <td>
                              <strong>{item.nombreProducto || '-'}</strong>
                            </td>
                            <td>
                              <span className="">
                                {item.categoria || '—'}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-info">
                                {item.marca || '—'}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-secondary">{item.talla || '-'}</span>
                            </td>
                            <td>
                              <span className="badge bg-info text-dark">{item.color || '-'}</span>
                            </td>
                            <td>
                              <span className="badge bg-primary rounded-pill px-3">
                                {item.cantidad || 0}
                              </span>
                            </td>
                            <td>
                              <span className="fw-bold text-secondary">
                                {formatCurrency(item.precioUnitario)}
                              </span>
                            </td>
                            <td>
                              <span className="fw-semibold text-truncate" style={{ maxWidth: '180px' }}>
                                {item.proveedor || 'Sin proveedor'}
                              </span>
                            </td>
                            <td>
                              <button
                                className={`btn btn-sm ${isExpanded ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={e => {
                                  e.stopPropagation()
                                  setExpandedId(isExpanded ? null : id)
                                }}
                              >
                                <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                                {isExpanded ? 'Ocultar' : 'Ver'}
                              </button>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr className="bg-light">
                              <td colSpan={10} className="p-0">
                                <div className="p-4 border-top border-2 border-primary">
                                  <h6 className="mb-3 text-primary">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Detalles del producto
                                  </h6>
                                  <ul className="mb-0">
                                    <li><strong>ID:</strong> {item.idListaProducto}</li>
                                    <li><strong>Proveedor:</strong> {item.proveedor}</li>
                                    <li><strong>Precio Unitario:</strong> {formatCurrency(item.precioUnitario)}</li>
                                    <li><strong>Cantidad en stock:</strong> {item.cantidad}</li>
                                  </ul>
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
          {/* Vista móvil */}
          <div className="d-block d-md-none p-3">
            {stock.length === 0 ? (
              <div className="text-center text-muted py-5">
                <i className="bi bi-inbox fs-1 d-block mb-3 text-secondary"></i>
                <p className="mb-0">No hay productos en stock</p>
                <small className="text-muted">
                  Registra compras para agregar productos al stock
                </small>
              </div>
            ) : (
              stock.map(item => {
                const id = item.idListaProducto
                const isExpanded = expandedId === id
                return (
                  <div key={id} className="card mb-3 shadow-sm">
                    <div className="card-header bg-light py-2 d-flex justify-content-between align-items-center">
                      <span className="badge bg-secondary rounded-pill">#{id}</span>
                      <span className="fw-bold text-success">{formatCurrency(item.precioUnitario)}</span>
                    </div>
                    <div className="card-body p-3">
                      <div className="fw-semibold text-primary mb-1">
                        <i className="bi bi-box-seam me-2"></i>
                        {item.nombreProducto || '-'}
                      </div>
                      <div className="mb-2">
                        <span className="badge bg-secondary me-1">{item.talla || '-'}</span>
                        <span className="badge bg-info text-dark">{item.color || '-'}</span>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted">
                          <i className="bi bi-bookmark me-1"></i>
                          {item.marca} - {item.categoria}
                        </small>
                      </div>
                      <div className="mb-2">
                        <span className="badge bg-primary px-3">
                          {item.cantidad || 0} en stock
                        </span>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted">
                          <i className="bi bi-building me-1"></i>
                          {item.proveedor || 'Sin proveedor'}
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
                      </div>
                      {isExpanded && (
                        <div className="mt-3 border-top pt-3">
                          <h6 className="mb-2 text-primary">
                            <i className="bi bi-info-circle me-2"></i>
                            Detalles del producto
                          </h6>
                          <ul className="mb-0">
                            <li><strong>ID:</strong> {item.idListaProducto}</li>
                            <li><strong>Proveedor:</strong> {item.proveedor}</li>
                            <li><strong>Precio Unitario:</strong> {formatCurrency(item.precioUnitario)}</li>
                            <li><strong>Cantidad en stock:</strong> {item.cantidad}</li>
                          </ul>
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
    </div>
  )
}
