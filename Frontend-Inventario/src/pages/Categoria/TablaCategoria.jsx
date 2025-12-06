import React from 'react'
import Spinner from '../../components/Common/Spinner'
import Error from '../../components/Common/error'
export default function TablaCategoria({
  categorias = [],
  loading,
  error,
  onEdit,
  onDelete,
  getId,
  canUpdate = false,
  canDelete = false
}) {
  return (
    <div className="card mt-3 p-3">
      {/* Contador dinámico */}
      <div className="mb-2">
        <strong>Categorías</strong>
        <small className="text-muted ms-2">
          ({loading ? '...' : categorias.length} {categorias.length === 1 ? 'categoría' : 'categorías'})
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
            <p className="mt-3 text-muted">Cargando categorías...</p>
          </div>
        </div>
      ) : (
        <>

      {/* Escritorio / Tablet */}
      <div className="d-none d-md-block" style={{ overflowX: 'auto', maxHeight: '60vh' }}>
        <div className='table-responsive'>
          <table className="table table-hover align-middle" style={{ minWidth: 700 }}>
            <thead className="table-light sticky-top">
              <tr>
                <th style={{ width: 120 }}>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th style={{ width: 140 }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    <i className="bi bi-inbox display-4 d-block mb-2"></i>
                    No hay categorías registradas
                  </td>
                </tr>
              ) : (
                categorias.map(t => {
                  const id = getId(t)  // ✅ Usar getId
                  return (
                    <tr key={id}>{/* ✅ SIN espacios después de <tr> */}
                      <td className="text-muted">{id}</td>
                      <td><strong>{t.nombre}</strong></td>
                      <td>{t.descripcion || '—'}</td>
                      <td>
                        <div className="d-flex gap-2">
                          {canUpdate && (
                            <button
                              className="btn btn-sm btn-outline-primary"
                              title="Editar"
                              onClick={() => onEdit && onEdit(t)}
                            >
                              <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              title="Eliminar"
                              onClick={() => onDelete && onDelete(t)}
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
      {/* Móvil: tarjetas */}
      <div className='d-block d-md-none'>
        {categorias.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i className="bi bi-inbox display-4 d-block mb-2"></i>
            No hay categorías registradas
          </div>
        ) : (
          categorias.map(t => {
            const id = getId(t)  // ✅ Usar getId
            return (
              <div key={id} className="card mb-2 shadow-sm">
                <div className="card-body p-3">
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="flex-grow-1">
                      <div className="fw-bold mb-1">
                        <span className="text-muted small">#{id}</span> · {t.nombre}
                      </div>
                      {t.descripcion && (
                        <div className="small text-muted">{t.descripcion}</div>
                      )}
                    </div>
                    <div className="d-flex flex-column gap-2 ms-3">
                      {canUpdate && (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="Editar"
                          onClick={() => onEdit && onEdit(t)}
                        >
                          <i className="bi bi-pencil-fill" />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Eliminar"
                          onClick={() => onDelete && onDelete(t)}
                        >
                          <i className="bi bi-trash-fill" />
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
