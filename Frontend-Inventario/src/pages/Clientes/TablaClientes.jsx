import React from 'react'
import Spinner from '../../components/Common/Spinner'
import Error from '../../components/Common/error'

export default function TablaClientes({
  clientes = [],
  loading,
  error,
  onEdit,
  onDelete,
  getId = (c) => c.idCliente || c.id,
  canUpdate = false,
  canDelete = false
}) {
  // Función auxiliar para determinar tipo de documento
  function getDocType(doc) {
    if (!doc) return ''
    const s = String(doc).replace(/\D/g, '')
    if (s.length === 8) return 'DNI'
    if (s.length === 11) return 'RUC'
    return ''
  }

  return (
    <div className="card mt-3 p-3">
      <div className="mb-2">
        <strong>Clientes</strong>
        <small className="text-muted ms-2">
          ({loading ? '...' : clientes.length} {clientes.length === 1 ? 'cliente' : 'clientes'})
        </small>
      </div>

      {/* Show error if exists */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          <Error />
        </div>
      )}

      {/* Show loading only in table area */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="text-center">
            <Spinner size="3rem" />
            <p className="mt-3 text-muted">Cargando clientes...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Escritorio/Tablet: tabla con scroll propio */}
          <div className="d-none d-md-block" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle" style={{ minWidth: 900 }}>
            <thead className="table-light sticky-top">
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>N°Documento</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    <i className="bi bi-inbox display-4 d-block mb-2"></i>
                    No hay clientes registrados
                  </td>
                </tr>
              ) : (
                clientes.map(c => {
                  const id = getId(c)
                  return (
                    <tr key={id}>
                      <td className="text-muted">{id}</td>
                      <td>{c.nombres || c.nombre || 'Sin nombres'}</td>
                      <td>{c.apellidos || c.apellido || 'Sin apellidos'}</td>
                      <td>{c.nDocumento}</td>
                      <td><i className="bi bi-telephone me-1"></i>
                        {c.telefono || '—'}</td>
                      <td><i className="bi bi-geo-alt me-1"></i>
                        {c.direccion || '—'}</td>
                      <td>
                        <i className="bi bi-envelope me-1"></i>
                        {c.correo || '—'}</td>
                      <td>
                        <div className="d-flex gap-2">
                          {canUpdate && (
                            <button
                              className="btn btn-sm btn-outline-primary"
                              title="Editar"
                              onClick={() => onEdit && onEdit(c)}
                            >
                              <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              title="Eliminar"
                              onClick={() => onDelete && onDelete(c)}
                            >
                              <i className="bi bi-trash-fill" aria-hidden="true"></i>
                            </button>
                          )}
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

          {/* Móvil: vista reducida en tarjetas */}
          <div className="d-block d-md-none">
            {clientes.length === 0 ? (
              <div className="text-center text-muted py-4">
                <i className="bi bi-inbox display-4 d-block mb-2"></i>
                No hay clientes registrados
              </div>
            ) : (
              clientes.map(c => {
            const id = getId(c)
            const doc = c.nDocumento || c.documento || c.dni || c.ruc || 'Sin documento'
            const docType = getDocType(doc)
            const nombreCompleto = `${c.nombres || c.nombre || ''} ${c.apellidos || c.apellido || ''}`.trim()

            return (
              <div key={id} className="card mb-2 shadow-sm">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="flex-grow-1">
                      <div className="fw-bold mb-1">
                        <span className="text-muted small">#{id}</span> · {nombreCompleto || 'Sin nombre'}
                      </div>

                      <div className="small mb-1">
                        <code className="text-dark">{doc}</code>
                        {docType && (
                          <span className={`badge ${docType === 'DNI' ? 'bg-primary' : 'bg-success'} ms-2`}>
                            {docType}
                          </span>
                        )}
                      </div>

                      {c.telefono && (
                        <div className="small text-muted mb-1">
                          <i className="bi bi-telephone me-1"></i>
                          {c.telefono}
                        </div>
                      )}

                      {c.direccion && (
                        <div className="small text-muted">
                          <i className="bi bi-geo-alt me-1"></i>
                          {c.direccion}
                        </div>
                      )}
                    </div>

                    <div className="d-flex flex-column gap-2 ms-3">
                      {canUpdate && (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          style={{
                            width: '50px',
                            height: '50px',
                            padding: 0
                          }}
                          title="Editar"
                          onClick={() => onEdit && onEdit(c)}
                        >
                          <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                        </button>
                      )}
                      {canDelete && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          style={{
                            width: '50px',
                            height: '50px',
                            padding: 0
                          }}
                          title="Eliminar"
                          onClick={() => onDelete && onDelete(c)}
                        >
                          <i className="bi bi-trash-fill" aria-hidden="true"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
              })
            )}
          </div>
        </>
      )}
    </div>
  )
}
