import React, { useState, useEffect } from 'react'
import { useCRUD } from '../../hooks/useCRUD.jsx'
import { marcasConfig } from './config/marcasConfig.js'
import { eliminarMarca } from '../../api/marcasApi.js' // ✅ AGREGAR
import { createFilterConfig } from './config/filterConfig'
import { useMarcaFilter } from './hooks/useMarcaFilter.jsx'
import TablaMarca from './TablaMarca'
import ModalEditar from '../../components/Common/Modals/ModalEditar.jsx'
import ModalEliminar from '../../components/Common/Modals/ModalEliminar.jsx'
import ModalCrear from '../../components/Common/Modals/ModalCrear.jsx'
import FilterBar from '../../components/Common/filters/FIlterBar.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

// ✅ Función para normalizar URLs de logos
const normalizeImageUrl = (logo) => {
  if (!logo) return null;

  if (logo === 'undefined' || logo === 'null' || logo === '') {
    return null;
  }

  if (logo.includes('/uploads/logos/')) {

    return null;
  }

  if (logo.startsWith('http://') || logo.startsWith('https://')) {
    return logo;
  }

  const cleanPath = logo.startsWith('/') ? logo.slice(1) : logo;
  return `http://localhost:8081/${cleanPath}`;
}

export default function MarcaPage() {
  const { data, loading, error, onRefresh, create, update, remove } = useCRUD(marcasConfig)
  const { checkPermission } = useAuth()

  // ✅ Verificar permisos (usamos 'Producto' ya que Marcas es parte de Inventario)
  const canCreate = checkPermission('Producto', 'canCreate')
  const canUpdate = checkPermission('Producto', 'canUpdate')
  const canDelete = checkPermission('Producto', 'canDelete')

  // Estados de modales
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selected, setSelected] = useState(null)

  // Estados de filtros
  const [search, setSearch] = useState('')

  // ✅ NUEVO: Estado para alerta de restricción
  const [alertaRestriccion, setAlertaRestriccion] = useState(null)

  // Normalizar marcas con URLs completas de logos
  const marcasNormalizadas = React.useMemo(() => {
    return data.map(marca => ({
      ...marca,
      logo: normalizeImageUrl(marca.logo)
    }))
  }, [data])

  // Hook de filtrado
  const { filtered } = useMarcaFilter(marcasNormalizadas, search)

  // Control de overflow del body
  useEffect(() => {
    const original = document.body.style.overflow
    if (showCreate || showEdit || showDelete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = original
    }
    return () => { document.body.style.overflow = original }
  }, [showCreate, showEdit, showDelete])

  // Funciones para abrir modales
  function openEdit(marca) {
    if (!canUpdate) return
    setSelected(marca)
    setShowEdit(true)
  }

  // ✅ MEJORADO: Verificar antes de abrir modal de eliminación
  async function openDelete(marca) {
    if (!canDelete) return
    try {
      const id = marcasConfig.getId(marca)


      // Verificar si se puede eliminar
      const resultado = await eliminarMarca(id)

      if (!resultado.puedeEliminar) {
        // ✅ Mostrar alerta en la tabla en lugar de alert()
        setAlertaRestriccion(
          `La marca "${marca.marca}" tiene ${resultado.cantidadProductos} producto(s) asociado(s). ` +
          `Primero elimine o reasigne los productos.`
        )

        // Auto-ocultar después de 8 segundos
        setTimeout(() => {
          setAlertaRestriccion(null)
        }, 8000)

        return
      }

      // Si se puede eliminar, mostrar modal de confirmación
      setSelected(marca)
      setShowDelete(true)

    } catch (error) {

      setAlertaRestriccion('Error al verificar si la marca se puede eliminar')

      setTimeout(() => {
        setAlertaRestriccion(null)
      }, 5000)
    }
  }

  // Handlers CRUD
  const handleCreate = async (nuevaMarca) => {
    if (!canCreate) return
    try {

      await create(nuevaMarca)
      setShowCreate(false)
      onRefresh()
    } catch (error) {

      alert(`Error al crear marca: ${error.message}`)
    }
  }

  const handleUpdate = async (id, marcaActualizada) => {
    if (!canUpdate) return
    try {

      await update(id, marcaActualizada)
      setShowEdit(false)
      setSelected(null)
      onRefresh()
    } catch (error) {

      alert(`Error al actualizar marca: ${error.message}`)
    }
  }

  const handleDelete = async (id) => {
    if (!canDelete) return
    try {
      await remove(id)
      setShowDelete(false)
      setSelected(null)
      onRefresh()
    } catch (error) {

      alert(`Error al eliminar marca: ${error.message}`)
    }
  }

  // Limpiar filtros
  const handleClearFilters = () => {

    setSearch('')
    setAlertaRestriccion(null) // ✅ También limpiar alerta
  }

  // Función para imprimir
  const handlePrint = () => {
    window.print()
  }

  // Crear configuración de filtros
  const filterConfig = createFilterConfig({
    search,
    setSearch,
    handlePrint,
    handleCreate: () => setShowCreate(true),
    filtered: filtered.length,
    total: marcasNormalizadas.length,
    handleClearFilters,
    onRefresh,
    loading,
    canCreate // ✅ Pasar permiso
  })

  return (
    <div className="container-fluid">
      {/* Título */}
      <div className="mb-3">
        <h4 className="mb-1">
          <i className="bi bi-tags me-2"></i>
          Marcas
        </h4>
        <small className="text-muted">
          Gestión completa de marcas del sistema
        </small>
      </div>

      {/* Barra de filtros */}
      <FilterBar {...filterConfig} />

      {/* Modal Crear */}
      {showCreate && canCreate && (
        <ModalCrear
          title="Crear Marca"
          fields={marcasConfig.fields}
          transformPayload={marcasConfig.transformPayload}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* ✅ Tabla de Marcas con alerta */}
      <TablaMarca
        marcas={filtered}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={openDelete}
        getId={marcasConfig.getId}
        onRefresh={onRefresh}
        alertaRestriccion={alertaRestriccion}
        onCloseAlerta={() => setAlertaRestriccion(null)}
        canUpdate={canUpdate}
        canDelete={canDelete}
      />

      {/* Modal Editar */}
      {showEdit && selected && canUpdate && (
        <ModalEditar
          title="Editar Marca"
          key={`edit-${marcasConfig.getId(selected)}`}
          initialData={selected}
          fields={marcasConfig.fields}
          transformPayload={marcasConfig.transformPayload}
          getId={marcasConfig.getId}
          onSave={handleUpdate}
          onClose={() => {
            setShowEdit(false)
            setSelected(null)
          }}
        />
      )}

      {/* Modal Eliminar */}
      {showDelete && selected && canDelete && (
        <ModalEliminar
          title="Eliminar Marca"
          key={`delete-${marcasConfig.getId(selected)}`}
          message="¿Está seguro que desea eliminar esta marca? Esta acción no se puede deshacer."
          itemData={selected}
          displayField={(m) => `${m.marca} (ID: ${marcasConfig.getId(m)})`}
          getId={marcasConfig.getId}
          onConfirm={handleDelete}
          onClose={() => {
            setShowDelete(false)
            setSelected(null)
          }}
          confirmButtonText="Eliminar"
          confirmButtonClass="btn-danger"
        />
      )}
    </div>
  )
}
