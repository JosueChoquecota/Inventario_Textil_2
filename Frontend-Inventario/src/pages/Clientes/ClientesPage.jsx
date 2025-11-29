import React, { useState, useEffect } from 'react'
import { useCRUD } from '../../hooks/useCRUD.jsx'
import { clientesConfig } from './config/ClientesConfig.js'
import { createFilterConfig } from './config/filterConfig'
import { useClientesFilter } from './hooks/useClientesFilter.jsx'
import TablaClientes from './TablaClientes'
import ModalEditar from '../../components/Common/Modals/ModalEditor'
import ModalEliminar from '../../components/Common/Modals/ModalEliminar.jsx'
import ModalCrear from '../../components/Common/Modals/ModalCrear.jsx'
import FilterBar from '../../components/Common/filters/FIlterBar.jsx'

export default function ClientesPage() {
  const { data, loading, error, onRefresh, create, update, remove } = useCRUD(clientesConfig)
  
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [docTypeFilter, setDocTypeFilter] = useState('')

  useEffect(() => {
    const original = document.body.style.overflow
    if (showCreate || showEdit || showDelete) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = original
    return () => { document.body.style.overflow = original }
  }, [showCreate, showEdit, showDelete])

  const { filtered, docTypes } = useClientesFilter(data, search, docTypeFilter)

  function openEdit(cliente) {
    setSelected(cliente)
    setShowEdit(true)
  }

  function openDelete(cliente) {
    setSelected(cliente)
    setShowDelete(true)
  }

  const handleCreate = async (nuevoCliente) => {
    await create(nuevoCliente)
    setShowCreate(false)
  }

  const handleUpdate = async (id, clienteActualizado) => {
    await update(id, clienteActualizado)
    setShowEdit(false)
  }

  const handleDelete = async (id) => {
    await remove(id)
    setShowDelete(false)
  }

  function handlePrint() {
    window.print()
  }

  const handleClearFilters = () => {
    setSearch('')
    setDocTypeFilter('')
  }

  // ✅ Crear configuración de filtros
  const filterConfig = createFilterConfig({
    search,
    setSearch,
    docTypeFilter,
    setDocTypeFilter,
    docTypes,
    handlePrint,
    handleCreate: () => setShowCreate(true),
    filtered: filtered.length,
    total: data.length,
    handleClearFilters,
    onRefresh
  })

  return (
    <div className="container-fluid">
      {/* Título */}
      <div className="mb-3">
        <h4 className="mb-1">
          <i className="bi bi-people-fill me-2"></i>
          Clientes
        </h4>
        <small className="text-muted">
          Gestión completa de Clientes
        </small>
      </div>

      {/* ✅ Filtros genéricos */}
      <FilterBar {...filterConfig} />

      {/* Modal crear */}
      {showCreate && (
        <ModalCrear
          title="Agregar Cliente"
          fields={clientesConfig.fields}
          transformPayload={clientesConfig.transformPayload}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* Tabla de clientes */}
      <TablaClientes 
        clientes={filtered}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={openDelete}
        getId={clientesConfig.getId}
      />

      {/* Modal editar */}
      {showEdit && selected && (
        <ModalEditar
          key={`edit-${clientesConfig.getId(selected)}`}
          title="Editar Cliente"
          initialData={selected}
          fields={clientesConfig.fields}
          transformPayload={clientesConfig.transformPayload}
          getId={clientesConfig.getId}
          onSave={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Modal eliminar */}
      {showDelete && selected && (
        <ModalEliminar
          key={`delete-${clientesConfig.getId(selected)}`}
          title="Eliminar Cliente"
          message="¿Está seguro que desea eliminar este cliente? Esta acción no se puede deshacer."
          itemData={selected}
          displayField={(c) => `${c.nombres} ${c.apellidos}`}
          getId={clientesConfig.getId}
          onConfirm={handleDelete}
          onClose={() => setShowDelete(false)}
          confirmButtonText="Eliminar"
          confirmButtonClass="btn-danger"
        />
      )}
    </div>
  )
}
