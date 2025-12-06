import React, { useState, useEffect } from 'react'
import { useCRUD } from '../../hooks/useCRUD.jsx'
import { categoriasConfig } from './config/categoriasConfig.js'
import { createFilterConfig } from './config/filterConfig.js'
import { useCategoriaFilter } from './hooks/useCategoriaFilter.jsx'
import TablaCategoria from './TablaCategoria'
import ModalEditar from '../../components/Common/Modals/ModalEditor.jsx'
import ModalEliminar from '../../components/Common/Modals/ModalEliminar.jsx'
import ModalCrear from '../../components/Common/Modals/ModalCrear.jsx'
import FilterBar from '../../components/Common/filters/FIlterBar.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function CategoriasPage() {
  const { data, loading, error, onRefresh, create, update, remove } = useCRUD(categoriasConfig)
  const { checkPermission } = useAuth()

  // ✅ Verificar permisos (usamos 'Producto' ya que Categorías es parte de Inventario)
  const canCreate = checkPermission('Producto', 'canCreate')
  const canUpdate = checkPermission('Producto', 'canUpdate')
  const canDelete = checkPermission('Producto', 'canDelete')

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

  const { filtered } = useCategoriaFilter(data, search, tipoFilter)

  function openEdit(categoria) {
    if (!canUpdate) return
    setSelected(categoria)
    setShowEdit(true)
  }

  function openDelete(categoria) {
    if (!canDelete) return
    setSelected(categoria)
    setShowDelete(true)
  }

  const handleCreate = async (nuevaCategoria) => {
    if (!canCreate) return
    await create(nuevaCategoria)
    setShowCreate(false)
  }

  const handleUpdate = async (id, categoriaActualizada) => {
    if (!canUpdate) return
    await update(id, categoriaActualizada)
    setShowEdit(false)
  }

  const handleDelete = async (id) => {
    if (!canDelete) return
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
    handleClearFilters,
    canCreate // ✅ Pasar permiso
  })

  return (
    <div className="container-fluid">
      {/* Título */}
      <div className="mb-3">
        <h4 className="mb-1">
          <i className="bi bi-grid-3x3-gap me-2"></i>
          Categorías
        </h4>
        <small className="text-muted">
          Gestión completa de Categorías
        </small>
      </div>

      <FilterBar
        searchConfig={filterConfig.searchConfig}
        selectFilters={filterConfig.selectFilters}
        actionButtons={filterConfig.actionButtons}
        resultsInfo={filterConfig.resultsInfo}
      />

      {showCreate && canCreate && (
        <ModalCrear
          title="Crear Nueva Categoría"
          fields={categoriasConfig.fields}
          transformPayload={categoriasConfig.transformPayload}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      <TablaCategoria
        categorias={filtered}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={openDelete}
        getId={categoriasConfig.getId}
        onRefresh={onRefresh}
        canUpdate={canUpdate}
        canDelete={canDelete}
      />

      {/* Modal editar */}
      {showEdit && selected && canUpdate && (
        <ModalEditar
          key={`edit-${categoriasConfig.getId(selected)}`}
          title="Editar Categoría"
          initialData={selected}
          fields={categoriasConfig.fields}
          transformPayload={categoriasConfig.transformPayload}
          getId={categoriasConfig.getId}
          onSave={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Modal eliminar */}
      {showDelete && selected && canDelete && (
        <ModalEliminar
          key={`delete-${categoriasConfig.getId(selected)}`}
          title="Eliminar Categoría"
          message="¿Está seguro que desea eliminar esta categoría? Esta acción no se puede deshacer."
          itemData={selected}
          displayField={(c) => c.nombre}
          getId={categoriasConfig.getId}
          onConfirm={handleDelete}
          onClose={() => setShowDelete(false)}
          confirmButtonText="Eliminar"
          confirmButtonClass="btn-danger"
        />
      )}
    </div>
  )
}

