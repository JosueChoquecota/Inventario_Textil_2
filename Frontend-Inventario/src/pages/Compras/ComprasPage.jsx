import React, { useState, useEffect } from 'react'
import { useCompras } from './hooks/useCompras'
import TablaCompras from './TablaCompras'
import ModalCrearCompra from './components/ModalCrearCompra'
import ModalEliminar from '../../components/Common/Modals/ModalEliminar'

export default function ComprasPage() {
  const { 
    data, 
    loading, 
    error, 
    onRefresh, 
    addCompra, 
    deleteCompra 
  } = useCompras()
  
  const [showCreate, setShowCreate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const original = document.body.style.overflow
    if (showCreate || showDelete) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = original
    return () => { document.body.style.overflow = original }
  }, [showCreate, showDelete])

  const filtered = data.filter(c => {
    const q = search.trim().toLowerCase()
    if (!q) return true
    
    return (
      String(c.idCompra).includes(q) ||
      (c.nombreProveedor || '').toLowerCase().includes(q) ||
      (c.documentoProveedor || '').toLowerCase().includes(q) ||
      (c.nombreCompletoTrabajador || '').toLowerCase().includes(q) ||
      c.detalles?.some(d => 
        (d.nombreProducto || '').toLowerCase().includes(q) ||
        (d.talla || '').toLowerCase().includes(q) ||
        (d.color || '').toLowerCase().includes(q)
      )
    )
  })

  const handleCreate = async (compraData) => {
    try {
      await addCompra(compraData)
      setShowCreate(false)
      await onRefresh()
    } catch (error) {
      console.error('Error al crear compra:', error)
      // El toast ya se muestra en el modal
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteCompra(id)
      setShowDelete(false)
      await onRefresh()
    } catch (error) {
      console.error('Error al eliminar compra:', error)
    }
  }

  return (
    <div className="container-fluid">
      {/* Título */}
      <div className="mb-3">
        <h4 className="mb-1">
          <i className="bi bi-cart-fill me-2"></i>
          Compras
        </h4>
        <small className="text-muted">
          Gestión completa de compras a proveedores
        </small>
      </div>

      {/* Barra de búsqueda y botones */}
      <div className="row g-2 align-items-center mb-4">
        {/* Búsqueda */}
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search" />
            </span>
            <input
              type="search"
              className="form-control border-start-0"
              placeholder="Buscar por proveedor, producto, documento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={() => setSearch('')}
              >
                <i className="bi bi-x-lg" />
              </button>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="col-12 col-md-6">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {/* Botón Refrescar */}
            <button 
              className="btn btn-outline-secondary"
              onClick={onRefresh}
              disabled={loading}
              title="Refrescar datos"
            >
              <i className="bi bi-arrow-clockwise" />
            </button>

            {/* Botón Imprimir */}
            <button 
              className="btn btn-success"
              onClick={() => window.print()}
            >
              <i className="bi bi-printer me-1" />
              <span className="d-none d-sm-inline">PDF</span>
            </button>

            {/* Botón Crear Compra */}
            <button 
              className="btn btn-primary" 
              onClick={() => setShowCreate(true)}
              disabled={loading}
            >
              <i className="bi bi-plus-square me-2" />
              Registrar Compra
            </button>
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mb-2">
        <small className="text-muted">
          {loading ? (
            'Cargando...'
          ) : (
            `Mostrando ${filtered.length} de ${data.length} compras`
          )}
        </small>
      </div>

      {/* Tabla de compras */}
      <TablaCompras 
        compras={filtered}
        loading={loading}
        error={error}
        onDelete={(compra) => {
          setSelected(compra)
          setShowDelete(true)
        }}
        getId={(c) => c.idCompra}
      />

      {/* Modal crear */}
      {showCreate && (
        <ModalCrearCompra 
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}

      {/* Modal eliminar */}
      {showDelete && selected && (
        <ModalEliminar
          key={`delete-${selected.idCompra}`}
          title="Eliminar Compra"
          message="¿Está seguro que desea eliminar esta compra? Esta acción revertirá el stock de los productos."
          itemData={selected}
          displayField={(c) => `Compra #${c.idCompra} - ${c.nombreProveedor} (${c.fecha})`}
          getId={(c) => c.idCompra}
          onConfirm={handleDelete}
          onClose={() => setShowDelete(false)}
          confirmButtonText="Eliminar"
          confirmButtonClass="btn-danger"
        />
      )}
    </div>
  )
}
