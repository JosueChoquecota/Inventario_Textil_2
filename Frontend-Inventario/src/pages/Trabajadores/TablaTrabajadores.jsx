import React from 'react'
import Spinner from '../../components/Common/Spinner'
import Error from '../../components/Common/error'

export default function TablaTrabajadores({
  trabajadores = [],
  loading,
  error,
  onEdit,
  onToggleEstado,
  getId,
  canUpdate = false,
  canDelete = false,
  roles = [] // ✅ Recibir roles dinámicos
}) {
  const getRoleName = (idRol) => {
    const role = roles.find(r => r.id_rol === idRol)
    return role ? role.nombreRol : 'Sin rol'
  }

  const getRoleClass = (idRol) => {
    // Asignar colores basados en el ID o nombre si se desea, por ahora genérico o mapeo seguro
    // Si el rol es Admin (usualmente ID 1), destacar
    if (idRol === 1) return 'bg-primary text-white'
    return 'bg-light text-dark border'
  }

  return (
    <div className="card mt-3 p-3">
      {/* ✅ CAMBIO 1: Contador estilo texto */}
      <div className="mb-2">
        <strong>Trabajadores</strong>
        <small className="text-muted ms-2">
          ({loading ? '...' : trabajadores.length} {trabajadores.length === 1 ? 'trabajador' : 'trabajadores'})
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
            <p className="mt-3 text-muted">Cargando trabajadores...</p>
          </div>
        </div>
      ) : (
        <>

      {/* Desktop/Tablet */}
      <div className="d-none d-md-block" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
        <div className="table-responsive">
          {/* ✅ CAMBIO 2: Sticky header */}
          <table className="table table-hover align-middle" style={{ minWidth: 1000 }}>
            <thead className="table-light sticky-top">
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>N° Documento</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {trabajadores.length === 0 ? (
                <tr key="no-trabajadores">
                  {/* ✅ CAMBIO 3: Mensaje vacío mejorado */}
                  <td colSpan={9} className="text-center text-muted py-4">
                    <i className="bi bi-inbox display-4 d-block mb-2"></i>
                    No hay trabajadores registrados
                  </td>
                </tr>
              ) : trabajadores.map(t => {
                const id = getId(t)
                return (
                  <tr key={id}>
                    {/* ✅ CAMBIO 4: ID con text-muted */}
                    <td className="text-muted">{id}</td>
                    {/* ✅ CAMBIO 5: Nombres en negrita */}
                    <td><strong>{t.nombres}</strong></td>
                    <td>{t.apellidos}</td>
                    {/* ✅ CAMBIO 6: Documento con <code> */}
                    <td><code className="text-dark">{t.nDocumento}</code></td>
                    <td>
                      <i className="bi bi-telephone me-1"></i>
                      {t.telefono}
                    </td>
                    <td>
                      <i className="bi bi-envelope me-1"></i>
                      {t.correo || '—'}
                    </td>
                    <td>
                      <span className={`badge text-secondary ${getRoleClass(t.idRol)}`}>
                        {getRoleName(t.idRol)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${t.estado ? 'bg-success' : 'bg-secondary'}`}>
                        {t.estado ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        {canUpdate && (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                            onClick={() => onEdit(t)}
                          >
                            <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                          </button>
                        )}
                        {canDelete && (
                          <button
                            className={`btn btn-sm ${t.estado ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            title={t.estado ? 'Desactivar' : 'Activar'}
                            onClick={() => onToggleEstado(t)}
                          >
                            <i className={`bi ${t.estado ? 'bi-x-circle-fill' : 'bi-check-circle-fill'}`}></i>
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
        {trabajadores.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i className="bi bi-inbox display-4 d-block mb-2"></i>
            No hay trabajadores registrados
          </div>
        ) : trabajadores.map(t => {
          const id = getId(t)
          return (
            <div key={id} className="card mb-2 shadow-sm">
              {/* ✅ CAMBIO 8: Padding aumentado p-3 */}
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="flex-grow-1">
                    {/* ✅ CAMBIO 9: Título unificado */}
                    <div className="fw-bold mb-1">
                      <span className="text-muted small">#{id}</span> · {t.nombres} {t.apellidos}
                    </div>

                    {/* ✅ CAMBIO 10: Documento con <code> */}
                    <div className="small mb-1">
                      <code className="text-dark">{t.nDocumento}</code>
                    </div>

                    {/* Rol y Estado */}
                    <div className="small mb-1">
                      <span className={`badge text-secondary ${getRoleClass(t.idRol)} me-2`}>
                        {getRoleName(t.idRol)}
                      </span>
                      <span className={`badge ${t.estado ? 'bg-success' : 'bg-secondary'}`}>
                        {t.estado ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>

                    <div className="small text-muted mb-1">
                      <i className="bi bi-telephone me-1"></i>
                      {t.telefono}
                    </div>
                    {t.correo && (
                      <div className="small text-muted">
                        <i className="bi bi-envelope me-1"></i>
                        {t.correo}
                      </div>
                    )}
                  </div>
                  {/* ✅ CAMBIO 11: Separación ms-3 */}
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
                        onClick={() => onEdit(t)}
                      >
                        <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                      </button>
                    )}
                    {canDelete && (
                      <button
                        className={`btn btn-sm ${t.estado ? 'btn-outline-warning' : 'btn-outline-success'}`}
                        title={t.estado ? 'Desactivar' : 'Activar'}
                        style={{
                          width: '50px',
                          height: '50px',
                          padding: 0
                        }}
                        onClick={() => onToggleEstado(t)}
                      >
                        <i className={`bi ${t.estado ? 'bi-x-circle-fill' : 'bi-check-circle-fill'}`}></i>
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
