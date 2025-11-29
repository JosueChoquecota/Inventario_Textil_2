import React, { useState, useEffect } from 'react'
import { useCRUD } from '../../hooks/useCRUD.jsx'
import { proveedoresConfig } from './config/proveedoresConfig.js'
import { createFilterConfig } from './config/filterConfig'
import { useProveedoresFilter } from './hooks/useProveedoresFilter.jsx'
import TablaProveedores from './TablaProveedores'
import ModalEditar from '../../components/Common/Modals/ModalEditor'
import ModalEliminar from '../../components/Common/Modals/ModalEliminar.jsx'
import ModalCrear from '../../components/Common/Modals/ModalCrear.jsx'
import FilterBar from '../../components/Common/filters/FIlterBar.jsx'

export default function ProveedoresPage() {
  const { data, loading, error, onRefresh, create, update, remove } = useCRUD(proveedoresConfig)
  
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')

  useEffect(() => {
    const original = document.body.style.overflow
    if (showCreate || showEdit || showDelete) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = original
    return () => { document.body.style.overflow = original }
  }, [showCreate, showEdit, showDelete])

  const { filtered } = useProveedoresFilter(data, search, tipoFilter)

  function openEdit(proveedor) {
    setSelected(proveedor)
    setShowEdit(true)
  }

  function openDelete(proveedor) {
    setSelected(proveedor)
    setShowDelete(true)
  }

  const handleCreate = async (nuevoProveedor) => {
    await create(nuevoProveedor)
    setShowCreate(false)
  }

  const handleUpdate = async (id, proveedorActualizado) => {
    await update(id, proveedorActualizado)
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
    setTipoFilter('')
  }

  // ✅ Crear configuración de filtros
  const filterConfig = createFilterConfig({
    search,
    setSearch,
    tipoFilter,
    setTipoFilter,
    handlePrint,
    handleCreate: () => setShowCreate(true),
    filtered: filtered.length,
    total: data.length,
    handleClearFilters
  })

  return (
    <div className="container-fluid">
      {/* Título */}
      <div className="mb-3">
        <h4 className="mb-1">
          <i className="bi bi-truck me-2"></i>
          Proveedores
        </h4>
      </div>

      {/* ✅ Barra de filtros */}
      <FilterBar 
        searchConfig={filterConfig.searchConfig}
        selectFilters={filterConfig.selectFilters}
        actionButtons={filterConfig.actionButtons}
        resultsInfo={filterConfig.resultsInfo}
      />

      {/* Modal crear */}
      {showCreate && (
        <ModalCrear
          title="Agregar Proveedor"
          fields={proveedoresConfig.fields}
          transformPayload={proveedoresConfig.transformPayload}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* Tabla de proveedores */}
      <TablaProveedores 
        proveedores={filtered}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={openDelete}
        getId={proveedoresConfig.getId}
        onRefresh={onRefresh}
      />

      {/* Modal editar */}
      {showEdit && selected && (
        <ModalEditar
          key={`edit-${proveedoresConfig.getId(selected)}`}
          title="Editar Proveedor"
          initialData={selected}
          fields={proveedoresConfig.fields}
          transformPayload={proveedoresConfig.transformPayload}
          getId={proveedoresConfig.getId}
          onSave={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Modal eliminar */}
      {showDelete && selected && (
        <ModalEliminar
          key={`delete-${proveedoresConfig.getId(selected)}`}
          title="Eliminar Proveedor"
          message="¿Está seguro que desea eliminar este proveedor? Esta acción no se puede deshacer."
          itemData={selected}
          displayField={(p) => p.razonSocial || p.nombreComercial}
          getId={proveedoresConfig.getId}
          onConfirm={handleDelete}
          onClose={() => setShowDelete(false)}
          confirmButtonText="Eliminar"
          confirmButtonClass="btn-danger"
        />
      )}
    </div>
  )
}