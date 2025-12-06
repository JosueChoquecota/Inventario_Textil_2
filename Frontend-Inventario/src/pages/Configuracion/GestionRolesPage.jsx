import React, { useState, useEffect } from 'react'
import { getRoles } from '../../api/rolApi'
import { getRecursos, getPermisosPorRol, savePermisos, initRecursos } from '../../api/permisosApi'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext.jsx'
import Error from '../../components/Common/error.jsx'

export default function GestionRolesPage() {
    const { checkPermission } = useAuth()
    const canRead = checkPermission('Configuracion', 'canRead')
    const canUpdate = checkPermission('Configuracion', 'canUpdate')

    const [roles, setRoles] = useState([])
    const [recursos, setRecursos] = useState([])
    const [selectedRol, setSelectedRol] = useState(null)
    const [permisos, setPermisos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (canRead) {
            loadInitialData()
        }
    }, [canRead])

    const loadInitialData = async () => {
        try {
            const [rolesData, recursosData] = await Promise.all([getRoles(), getRecursos()])
            setRoles(rolesData)
            setRecursos(recursosData)

            // Si no hay recursos, intentar inicializarlos
            if (recursosData.length === 0) {
                await initRecursos()
                const newRecursos = await getRecursos()
                setRecursos(newRecursos)
            }
        } catch (error) {

            toast.error("Error al cargar roles o recursos")
        }
    }

    const handleRolSelect = async (rol) => {
        setSelectedRol(rol)
        setLoading(true)
        try {
            const permisosData = await getPermisosPorRol(rol.id_rol)

            // Mapear permisos existentes o crear defaults
            const mappedPermisos = recursos.map(recurso => {
                const existing = permisosData.find(p => p.recurso.id_recurso === recurso.id_recurso)
                return existing || {
                    recurso: recurso,
                    canCreate: false,
                    canRead: false,
                    canUpdate: false,
                    canDelete: false
                }
            })

            setPermisos(mappedPermisos)
        } catch (error) {
            console.error(error)
            toast.error("Error al cargar permisos del rol")
        } finally {
            setLoading(false)
        }
    }

    const handlePermissionChange = (index, field) => {
        if (!canUpdate) return // 🔒 Protección extra en UI
        const newPermisos = [...permisos]
        newPermisos[index] = {
            ...newPermisos[index],
            [field]: !newPermisos[index][field]
        }
        setPermisos(newPermisos)
    }

    const handleSave = async () => {
        if (!selectedRol) return
        if (!canUpdate) {
            toast.error("No tienes permisos para modificar roles.")
            return
        }

        try {
            await savePermisos(selectedRol.id_rol, permisos)
            toast.success("Permisos actualizados correctamente")
        } catch (error) {
            console.error(error)
            toast.error("Error al guardar permisos")
        }
    }

    if (!canRead) {
        return <div className="p-5 text-center text-danger">
            <h3><i className="bi bi-lock-fill"></i> Acceso Denegado</h3>
            <p>No tienes permisos para ver esta configuración.</p>
        </div>
    }

    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4 text-primary fw-bold">
                <i className="bi bi-shield-lock-fill me-2"></i>Gestión de Permisos por Rol
            </h2>

            <div className="row">
                {/* Lista de Roles */}
                <div className="col-md-3 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white fw-bold">Roles</div>
                        <div className="list-group list-group-flush">
                            {roles.map(rol => (
                                <button
                                    key={rol.id_rol}
                                    className={`list-group-item list-group-item-action ${selectedRol?.id_rol === rol.id_rol ? 'active' : ''}`}
                                    onClick={() => handleRolSelect(rol)}
                                >
                                    {rol.nombreRol}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Matriz de Permisos */}
                <div className="col-md-9">
                    {selectedRol ? (
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Permisos para: <span className="text-primary">{selectedRol.nombreRol}</span></h5>
                                {canUpdate && (
                                    <button className="btn btn-success btn-sm" onClick={handleSave}>
                                        <i className="bi bi-save me-2"></i>Guardar Cambios
                                    </button>
                                )}
                            </div>
                            <div className="card-body p-0">
                                {loading ? (
                                    <div className="text-center p-5">
                                        <div className="spinner-border text-primary" role="status"></div>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0 align-middle">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Módulo / Vista</th>
                                                    <th className="text-center">Ver (Read)</th>
                                                    <th className="text-center">Crear (Create)</th>
                                                    <th className="text-center">Editar (Update)</th>
                                                    <th className="text-center">Eliminar (Delete)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {permisos.map((permiso, index) => (
                                                    <tr key={permiso.recurso.id_recurso}>
                                                        <td className="fw-medium">{permiso.recurso.nombre}</td>
                                                        <td className="text-center">
                                                            <div className="form-check d-flex justify-content-center">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={permiso.canRead}
                                                                    disabled={!canUpdate}
                                                                    onChange={() => handlePermissionChange(index, 'canRead')}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="form-check d-flex justify-content-center">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={permiso.canCreate}
                                                                    disabled={!canUpdate}
                                                                    onChange={() => handlePermissionChange(index, 'canCreate')}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="form-check d-flex justify-content-center">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={permiso.canUpdate}
                                                                    disabled={!canUpdate}
                                                                    onChange={() => handlePermissionChange(index, 'canUpdate')}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="form-check d-flex justify-content-center">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={permiso.canDelete}
                                                                    disabled={!canUpdate}
                                                                    onChange={() => handlePermissionChange(index, 'canDelete')}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            <i className="bi bi-info-circle me-2"></i>Selecciona un rol de la izquierda para configurar sus permisos.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
