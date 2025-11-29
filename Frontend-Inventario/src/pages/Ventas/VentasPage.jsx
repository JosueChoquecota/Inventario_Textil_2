import React, { useState, useEffect } from 'react'
import { useVentas } from './hooks/useVentas'
import TablaVentas from './TablaVentas'
import ModalCrearVenta from './components/ModalCrearVenta'
import ModalEliminar from '../../components/Common/Modals/ModalEliminar'

export default function VentasPage() {
  const { 
    data, 
    loading, 
    error, 
    onRefresh, 
    addVenta, 
    deleteVenta 
  } = useVentas()

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

  const filtered = data.filter(v => {
    const q = search.trim().toLowerCase()
    if (!q) return true

    return (
      String(v.idVenta).includes(q) ||
      (v.nombreCliente || '').toLowerCase().includes(q) ||
      (v.documentoCliente || '').toLowerCase().includes(q) ||
      (v.nombreCompletoTrabajador || '').toLowerCase().includes(q) ||
      v.detalles?.some(d =>
        (d.nombreProducto || '').toLowerCase().includes(q) ||
        (d.talla || '').toLowerCase().includes(q) ||
        (d.color || '').toLowerCase().includes(q)
      )
    )
  })

  const handleCreate = async (ventaData) => {
    try {
      await addVenta(ventaData)
      setShowCreate(false)
      await onRefresh()
    } catch (error) {
      console.error('Error al crear venta:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteVenta(id)
      setShowDelete(false)
      await onRefresh()
    } catch (error) {
      console.error('Error al eliminar venta:', error)
    }
  }

  return (
    <div className="container-fluid">
      {/* Título */}
      <div className="mb-3">
        <h4 className="mb-1">
          <i className="bi bi-basket3 me-2"></i>
          Ventas
        </h4>
        <small className="text-muted">
          Administra las ventas registradas en el sistema
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
              placeholder="Buscar por cliente, producto, documento..."
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

            {/* Botón Crear Venta */}
            <button 
              className="btn btn-primary" 
              onClick={() => setShowCreate(true)}
              disabled={loading}
            >
              <i className="bi bi-plus-square me-2" />
              Nueva Venta
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
            `Mostrando ${filtered.length} de ${data.length} ventas`
          )}
        </small>
      </div>

      {/* Tabla de ventas */}
      <TablaVentas 
        ventas={filtered}
        loading={loading}
        error={error}
        onDelete={(venta) => {
          setSelected(venta)
          setShowDelete(true)
        }}
        getId={(v) => v.idVenta}
      />

      {/* Modal crear */}
      {showCreate && (
        <ModalCrearVenta 
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}

      {/* Modal eliminar */}
      {showDelete && selected && (
        <ModalEliminar
          key={`delete-${selected.idVenta}`}
          title="Eliminar Venta"
          message="¿Está seguro que desea eliminar esta venta? Esta acción no se puede deshacer."
          itemData={selected}
          displayField={(v) => `Venta #${v.idVenta} - ${v.nombreCliente} (${v.fecha})`}
          getId={(v) => v.idVenta}
          onConfirm={handleDelete}
          onClose={() => setShowDelete(false)}
          confirmButtonText="Eliminar"
          confirmButtonClass="btn-danger"
        />
      )}
    </div>
  )
}

