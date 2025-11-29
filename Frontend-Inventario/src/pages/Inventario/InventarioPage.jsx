import React, { useState, useEffect } from 'react'
import { useCRUD } from '../../hooks/useCRUD.jsx'
import { inventarioConfig } from './config/inventarioConfig.js'
import { createFilterConfig } from './config/filterConfig.js'
import { useInventarioFilter } from './hooks/useInventarioFilter.jsx'
import TablaInventario from './TablaInventario'
import ModalEditar from '../../components/Common/Modals/ModalEditar.jsx'
import ModalCrear from '../../components/Common/Modals/ModalCrear.jsx'
import ModalEliminar from '../../components/Common/Modals/ModalEliminar.jsx'
import FilterBar from '../../components/Common/filters/FIlterBar.jsx'


// ✅ Función para normalizar URLs de imágenes
const normalizeImageUrl = (imagen) => {
  if (!imagen) return '';
  
  // Si ya es URL completa, retornar tal cual
  if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
    return imagen;
  }
  
  // Si es ruta relativa, agregar dominio
  const cleanPath = imagen.startsWith('/') ? imagen.slice(1) : imagen;
  return `http://localhost:8081/${cleanPath}`;
}

export default function InventarioPage() {
  const { data, loading, error, onRefresh, create, update, remove } = useCRUD(inventarioConfig)
  
  // ✅ Estados de modales
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false) 
  const [showDelete, setShowDelete] = useState(false)
  const [selected, setSelected] = useState(null)
  
  // ✅ Estados de filtros
  const [search, setSearch] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('')
  const [marcaFilter, setMarcaFilter] = useState('')
  
  // ✅ Estado de ordenamiento
  const [sortConfig, setSortConfig] = useState({
    key: 'idProducto',
    direction: 'desc' // Más recientes primero
  })

  // ✅ Normalizar productos con URLs completas de imágenes
  const productosNormalizados = React.useMemo(() => {
    return data.map(producto => ({
      ...producto,
      imagen: normalizeImageUrl(producto.imagen)
    }))
  }, [data])

  // ✅ Usar hook de filtrado con ordenamiento
  const { filtered, categorias, marcas } = useInventarioFilter(
    productosNormalizados,
    search,
    categoriaFilter,
    marcaFilter,
    sortConfig
  )

  // ✅ Control de overflow del body
  useEffect(() => {
    const original = document.body.style.overflow
    if (showCreate || showEdit || showDelete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = original
    }
    return () => { document.body.style.overflow = original }
  }, [showCreate, showEdit, showDelete])

  // ✅ Funciones para abrir modales
  function openEdit(producto) {
    setSelected(producto)
    setShowEdit(true)
  }

  function openDelete(producto) {
    setSelected(producto)
    setShowDelete(true)
  }

  // ✅ Handlers CRUD
  const handleCreate = async (nuevoProducto) => {
    await create(nuevoProducto)
    setShowCreate(false)
  }

  const handleUpdate = async (id, productoActualizado) => {
    await update(id, productoActualizado)
    setShowEdit(false)
  }

  const handleDelete = async (id) => {
    await remove(id)
    setShowDelete(false)
  }

  // ✅ Función para imprimir
  function handlePrint() {
    window.print()
  }

  // ✅ Limpiar todos los filtros
  const handleClearFilters = () => {
    console.log('🧹 Limpiando filtros...')
    setSearch('')
    setCategoriaFilter('')
    setMarcaFilter('')
    setSortConfig({
      key: 'idProducto',
      direction: 'desc'
    })
  }

  // ✅ Manejar cambio de ordenamiento
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  // ✅ Crear configuración de filtros
  const filterConfig = createFilterConfig({
    search,
    setSearch,
    categoriaFilter,
    setCategoriaFilter,
    marcaFilter,
    setMarcaFilter,
    categorias,
    marcas,
    onRefresh,
    handlePrint,
    handleCreate: () => setShowCreate(true),
    handleClearFilters,
    loading,
    filtered: filtered.length,
    total: productosNormalizados.length,
    // ✅ Pasar configuración de ordenamiento
    sortConfig,
    handleSort
  })

  return (
    <div className="container-fluid">
      {/* Título */}
      <div className="mb-3">
        <h4 className="mb-1">
          <i className="bi bi-box-seam me-2"></i>
          Inventario
        </h4>
        <small className="text-muted">
          Gestión completa de productos del almacén
        </small>
      </div>

      {/* ✅ Filtros genéricos */}
      <FilterBar {...filterConfig} />


      {/* ✅ Modal Crear */}
      {showCreate && (
        <ModalCrear
          title="Crear Producto"
          fields={inventarioConfig.fields}
          transformPayload={inventarioConfig.transformPayload}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* ✅ Tabla de Inventario */}
      <TablaInventario
        items={filtered}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={openDelete}
        getId={inventarioConfig.getId}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      {/* ✅ Modal Editar */}
      {showEdit && selected && (
        <ModalEditar
          title="Editar Producto"
          key={`edit-${inventarioConfig.getId(selected)}`}
          initialData={selected}
          fields={inventarioConfig.fields}
          transformPayload={inventarioConfig.transformPayload}
          getId={inventarioConfig.getId}
          onSave={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* ✅ Modal Eliminar */}
      {showDelete && selected && (
        <ModalEliminar
          title="Eliminar Producto"
          key={`delete-${inventarioConfig.getId(selected)}`}
          message="¿Está seguro que desea eliminar este producto? Esta acción no se puede deshacer."
          itemData={selected}
          displayField={(p) => `${p.nombre} (ID: ${inventarioConfig.getId(p)})`}
          getId={inventarioConfig.getId}
          onConfirm={handleDelete}
          onClose={() => setShowDelete(false)}
          confirmButtonText="Eliminar"
          confirmButtonClass="btn-danger"
        />
      )}
    </div>
  )
}
