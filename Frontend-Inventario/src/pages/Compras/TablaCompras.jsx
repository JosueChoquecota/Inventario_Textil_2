import React, { useState } from 'react'
import Spinner from '../../components/Common/Spinner'
import Error from '../../components/Common/error'
import DetallesCompraRow from './components/DetallesCompraRow'
import CompraCardMobile from './components/CompraCardMobile'

export default function TablaCompras({ 
  compras = [], 
  loading = false, 
  error = null,
  onDelete,
  getId 
}) {
  const [expandedId, setExpandedId] = useState(null)

  /**
   * Formatear fecha DD/MM/YYYY
   */
  const formatDate = (fecha) => {
    if (!fecha) return '-'
    try {
      const [year, month, day] = fecha.split('-')
      return `${day}/${month}/${year}`
    } catch {
      return fecha
    }
  }

  /**
   * Formatear moneda
   */
  const formatCurrency = (value) => {
    return `S/ ${Number(value || 0).toFixed(2)}`
  }

  /**
   * Expandir/contraer detalles
   */
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // ========================================
  // ESTADOS DE CARGA Y ERROR
  // ========================================
  
  if (loading) {
    return <Spinner className="my-5" />
  }
  if (error) {
    return <Error message={error} />
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        {/* ========================================
            VISTA ESCRITORIO / TABLET
        ======================================== */}
        <div className="d-none d-md-block">
          <div className="table-responsive" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-light sticky-top" style={{ zIndex: 10 }}>
                <tr>
                  <th style={{ width: '80px' }} className="text-center">
                    ID
                  </th>
                  <th style={{ width: '120px' }}>
                    Fecha
                  </th>
                  <th style={{ minWidth: '220px' }}>
                    Proveedor
                  </th>
                  <th style={{ minWidth: '180px' }}>
                    Registrado por
                  </th>
                  <th style={{ width: '110px' }} className="text-center">
                    Productos
                  </th>
                  <th style={{ width: '110px' }} className="text-center">
                    Unidades
                  </th>
                  <th style={{ width: '130px' }} className="text-end">
                    Total
                  </th>
                  <th style={{ width: '120px' }} className="text-center">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {compras.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-5">
                      <p className="mb-0">No hay compras registradas</p>
                      <small className="text-muted">
                        Presiona "Registrar Compra" para agregar una nueva compra
                      </small>
                    </td>
                  </tr>
                ) : (
                  compras.map((compra) => {
                    const id = getId ? getId(compra) : compra.idCompra
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
                              <small className="fw-medium">{formatDate(compra.fecha)}</small>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="fw-semibold text-truncate" style={{ maxWidth: '220px' }}>
                                {compra.nombreProveedor || 'Sin proveedor'}
                              </div>
                              <small className="text-muted">
                                {compra.tipoDocumentoProveedor && (
                                  <>
                                    <i className="bi bi-card-text me-1"></i>
                                    {compra.tipoDocumentoProveedor}: {compra.documentoProveedor}
                                  </>
                                )}
                                {!compra.tipoDocumentoProveedor && 'Sin documento'}
                              </small>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-person-circle me-2 text-muted"></i>
                              <small>{compra.nombreCompletoTrabajador || 'Sin datos'}</small>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-info text-dark rounded-pill px-3">
                              {compra.totalProductos || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-primary rounded-pill px-3">
                              {compra.totalUnidades || 0}
                            </span>
                          </td>
                          <td className="text-end">
                            <span className="fw-bold text-black fs-6">
                              {formatCurrency(compra.precioTotal)}
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
                                  onDelete && onDelete(compra)
                                }}
                                title="Eliminar compra"
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
                                    Productos de la compra
                                  </h6>
                                  <span className="badge bg-primary">
                                    {compra.detalles?.length || 0} items
                                  </span>
                                </div>
                                
                                <DetallesCompraRow detalles={compra.detalles} precioTotal={compra.precioTotal} />
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

        {/* ========================================
            VISTA MÓVIL
        ======================================== */}
        <div className="d-block d-md-none p-3">
          {compras.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="bi bi-inbox fs-1 d-block mb-3 text-secondary"></i>
              <p className="mb-0">No hay compras registradas</p>
              <small className="text-muted">
                Presiona "Registrar Compra" para agregar una nueva compra
              </small>
            </div>
          ) : (
            compras.map((compra) => {
              const id = getId ? getId(compra) : compra.idCompra
              const isExpanded = expandedId === id

              return (
                <CompraCardMobile
                  key={id}
                  compra={compra}
                  isExpanded={isExpanded}
                  onExpand={() => setExpandedId(isExpanded ? null : id)}
                  onDelete={() => onDelete && onDelete(compra)}
                  formatDate={formatDate}
                  formatCurrency={formatCurrency}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
