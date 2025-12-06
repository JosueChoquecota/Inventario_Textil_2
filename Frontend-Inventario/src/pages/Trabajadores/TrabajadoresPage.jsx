import React, { useState, useEffect, useMemo } from 'react'
import { useCRUD } from '../../hooks/useCRUD.jsx'
import { createTrabajadoresConfig } from './config/trabajadoresConfig'
import { createFilterConfig } from './config/filterConfig'
import { useTrabajadoresFilter } from './hooks/useTrabajadoresFilter.jsx'
import TablaTrabajadores from './TablaTrabajadores'
import ModalEditar from '../../components/Common/Modals/ModalEditor'
import ModalEliminar from '../../components/Common/Modals/ModalEliminar.jsx'
import ModalCrear from '../../components/Common/Modals/ModalCrear.jsx'
import FilterBar from '../../components/Common/filters/FIlterBar.jsx'
import { getTiposDocumento } from '../../api/tipoDocumentoApi'
import { getRoles } from '../../api/rolApi'
import { useAuth } from '../../context/AuthContext'

export default function TrabajadoresPage() {
  const { checkPermission } = useAuth()
  const [tiposDoc, setTiposDoc] = useState([])
  const [availableRoles, setAvailableRoles] = useState([])

  // ✅ Cargar tipos de documento y roles al montar
  useEffect(() => {
    Promise.all([getTiposDocumento(), getRoles()])
      .then(([docs, rolesData]) => {
        setTiposDoc(docs)
        setAvailableRoles(rolesData)
      })
      .catch(err => { /* Error handled by toast */ })
  }, [])

  // ✅ Generar configuración dinámica
  const trabajadoresConfig = useMemo(() => {
    return createTrabajadoresConfig(tiposDoc, availableRoles)
  }, [tiposDoc, availableRoles])

  const { data, loading, error, onRefresh, create, update, remove } = useCRUD(trabajadoresConfig)

  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [showInactive, setShowInactive] = useState(true)

  // ✅ Verificar permisos
  const canCreate = checkPermission('Trabajadores', 'canCreate')
  const canUpdate = checkPermission('Trabajadores', 'canUpdate')
  const canDelete = checkPermission('Trabajadores', 'canDelete')



  useEffect(() => {
    const original = document.body.style.overflow
    if (showCreate || showEdit || showToggle) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = original
    return () => { document.body.style.overflow = original }
  }, [showCreate, showEdit, showToggle])

  const { filtered, roles } = useTrabajadoresFilter(data, search, roleFilter, showInactive)

  function openEdit(trabajador) {
    if (!canUpdate) return
    setSelected(trabajador)
    setShowEdit(true)
  }
  function openToggleEstado(trabajador) {
    if (!canDelete) return
    setSelected(trabajador)
    setShowToggle(true)
  }
  const handleCreate = async (nuevoTrabajador) => {
    if (!canCreate) return
    await create(nuevoTrabajador)
    setShowCreate(false)
  }
  const handleUpdate = async (id, trabajadorActualizado) => {
    if (!canUpdate) return
    await update(id, trabajadorActualizado)
    setShowEdit(false)
  }
  const handleToggleEstado = async (id) => {
    if (!canDelete) return
    await remove(id)
    setShowToggle(false)
  }
  function handlePrint() {
    window.print()
  }
  const handleClearFilters = () => {
    setSearch('')
    setRoleFilter('')
  }

  // ✅ Crear configuración de filtros
  const filterConfig = createFilterConfig({
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    showInactive,
    setShowInactive,
    roles,
    handlePrint,
    handleCreate: canCreate ? () => setShowCreate(true) : null, // ✅ Ocultar botón si no tiene permiso
    filtered: filtered.length,
    total: data.length,
    handleClearFilters
  })

  return (
    <div className="container-fluid">
      {/* Título */}
      <div className="mb-3">

        <h4 className="mb-1"><i className="bi bi-people me-2"></i>Trabajadores</h4>
        <small className="text-muted">
          Gestión completa de trabajadores
        </small>
      </div>

      {/* ✅ Filtros genéricos */}
      <FilterBar {...filterConfig} />

      {/* Modal crear */}
      {showCreate && canCreate && (
        <ModalCrear
          title="Insertar Trabajador"
          fields={trabajadoresConfig.fields}
          transformPayload={trabajadoresConfig.transformPayload}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* Tabla de trabajadores */}
      <TablaTrabajadores
        trabajadores={filtered}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onToggleEstado={openToggleEstado}
        getId={trabajadoresConfig.getId}
        onRefresh={onRefresh}
        canUpdate={canUpdate} // ✅ Pasar permisos a la tabla
        canDelete={canDelete} // ✅ Pasar permisos a la tabla
        roles={availableRoles} // ✅ Pasar roles dinámicos
      />

      {/* Modal editar */}
      {showEdit && selected && canUpdate && (
        <ModalEditar
          key={`edit-${trabajadoresConfig.getId(selected)}`}
          title="Editar Trabajador"
          initialData={selected}
          fields={trabajadoresConfig.fields.map(f => f.name === 'contrasena' ? { ...f, required: false } : f)}
          transformPayload={trabajadoresConfig.transformPayload}
          getId={trabajadoresConfig.getId}
          onSave={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Modal toggle estado */}
      {showToggle && selected && canDelete && (
        <ModalEliminar
          key={`toggle-${trabajadoresConfig.getId(selected)}`}
          title={selected.estado ? "Desactivar Trabajador" : "Activar Trabajador"}
          message={
            selected.estado
              ? "¿Está seguro que desea desactivar este trabajador? El usuario no podrá iniciar sesión."
              : "¿Está seguro que desea activar este trabajador?"
          }
          itemData={selected}
          displayField="nombres"
          getId={trabajadoresConfig.getId}
          onConfirm={handleToggleEstado}
          onClose={() => setShowToggle(false)}
          confirmButtonText={selected.estado ? "Desactivar" : "Activar"}
          confirmButtonClass={selected.estado ? "btn-warning" : "btn-success"}
        />
      )}
    </div>
  )
}

