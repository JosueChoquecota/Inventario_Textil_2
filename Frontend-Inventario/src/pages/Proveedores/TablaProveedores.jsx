import React from 'react'
import Spinner from '../../components/Common/Spinner'
import Error from '../../components/Common/error'

export default function TablaProveedores({
  proveedores = [],
  loading,
  error,
  onEdit,
  onDelete,
  getId,
  canUpdate = false,
  canDelete = false
}) {
  function openEdit(p) {
    onEdit(p)
  }

  function openDelete(p) {
    onDelete(p)
  }

  return (
    <div className="card mt-3 p-3">
      {/* ✅ CAMBIO 1: Contador mejorado */}
      <div className="mb-2">
        <strong>Proveedores</strong>
        <small className="text-muted ms-2">
          ({loading ? '...' : proveedores.length} {proveedores.length === 1 ? 'proveedor' : 'proveedores'})
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
            <p className="mt-3 text-muted">Cargando proveedores...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="d-none d-md-block" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle" style={{ minWidth: 900 }}>
            {/* ✅ CAMBIO 2: Sticky header */}
            <thead className="table-light sticky-top">
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>DNI/RUC</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.length === 0 ? (
                <tr key="no-proveedores">
                  {/* ✅ CAMBIO 3: Mensaje vacío mejorado */}
                  <td colSpan={7} className="text-center text-muted py-4">
                    <i className="bi bi-inbox display-4 d-block mb-2"></i>
                    No hay proveedores registrados
                  </td>
                </tr>
              ) : proveedores.map(p => {
                const id = getId(p)
                return (
                  <tr key={id}>
                    {/* ✅ CAMBIO 4: ID con color text-muted */}
                    <td className="text-muted">{id}</td>
                    <td><strong>{p.nombres}</strong></td>
                    <td>{p.apellidos}</td>
                    {/* ✅ CAMBIO 5: DNI/RUC con <code> */}
                    <td><code className="text-dark">{p.nDocumento}</code></td>
                    <td>
                      <i className="bi bi-telephone me-1"></i>
                      {p.telefono}
                    </td>
                    <td>
                      <i className="bi bi-geo-alt me-1"></i>
                      {p.direccion}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        {canUpdate && (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                            onClick={() => openEdit(p)}
                          >
                            <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                          </button>
                        )}
                        {canDelete && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                            onClick={() => openDelete(p)}
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
        {proveedores.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i className="bi bi-inbox display-4 d-block mb-2"></i>
            No hay proveedores registrados
          </div>
        ) : proveedores.map(p => {
          const id = getId(p)
          return (
            <div key={id} className="card mb-2 shadow-sm">
              {/* ✅ CAMBIO 7: Padding aumentado */}
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="flex-grow-1">
                    {/* ✅ CAMBIO 8: Título mejorado */}
                    <div className="fw-bold mb-1">
                      <span className="text-muted small">#{id}</span> · {p.nombres} {p.apellidos}
                    </div>
                    {/* ✅ CAMBIO 9: DNI con <code> */}
                    <div className="small mb-1">
                      <code className="text-dark">{p.nDocumento}</code>
                    </div>
                    <div className="small text-muted mb-1">
                      <i className="bi bi-telephone me-1"></i>
                      {p.telefono}
                    </div>
                    {/* ✅ CAMBIO 10: Dirección agregada en móvil */}
                    {p.direccion && (
                      <div className="small text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {p.direccion}
                      </div>
                    )}
                  </div>
                  {/* ✅ CAMBIO 11: Margen izquierdo para separación */}
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
                        onClick={() => openEdit(p)}
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
                        onClick={() => openDelete(p)}
                      >
                        <i className="bi bi-trash-fill" aria-hidden="true"></i>
                      </button>
                    )}
                  </div>
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
