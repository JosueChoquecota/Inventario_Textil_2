import React, { useState, useEffect } from 'react'
import { useCRUD } from '../../../hooks/useCRUD'
import { tallasConfig } from '../config/tallasConfig'
import Spinner from '../../../components/Common/Spinner'
import ModalCrear from '../../../components/Common/Modals/ModalCrear'
import ModalEditar from '../../../components/Common/Modals/ModalEditar'
import ModalEliminar from '../../../components/Common/Modals/ModalEliminar'

export default function GestionTallas() {
  const { data: tallas, loading, error, onRefresh, create, update, remove } = useCRUD(tallasConfig)
  
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const original = document.body.style.overflow
    if (showCreate || showEdit || showDelete) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = original
    return () => { document.body.style.overflow = original }
  }, [showCreate, showEdit, showDelete])

  // Handlers para abrir modals
  function handleAdd() {
    setSelected(null)
    setShowCreate(true)
  }
  function handleEdit(talla) {
    setSelected(talla)
    setShowEdit(true)
  }
  function handleDelete(talla) {
    setSelected(talla)
    setShowDelete(true)
  }

  // CRUD handlers
  const handleCreate = async (nuevaTalla) => {
    await create(nuevaTalla)
    setShowCreate(false)
    onRefresh()
  }
  const handleUpdate = async (id, tallaActualizada) => {
    await update(id, tallaActualizada)
    setShowEdit(false)
    setSelected(null)
    onRefresh()
  }
  const handleDeleteConfirm = async (id) => {
    await remove(id)
    setShowDelete(false)
    setSelected(null)
    onRefresh()
  }

  // Loading state
  if (loading) {
    return <Spinner fullScreen size="3rem" />
  }

  // Error state
  if (error) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
          <button className="btn btn-primary" onClick={onRefresh}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="card">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0">
            <i className="bi bi-rulers me-2"></i>
            Gestión de Tallas
          </h5>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-1"></i> Agregar
          </button>
        </div>

        <div className="card-body ps-2 pe-0 pt-0 pb-0" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {!tallas || tallas.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-inbox display-4 text-muted"></i>
              <p className="text-muted mt-3">No hay tallas registradas</p>
              <button className="btn btn-primary" onClick={handleAdd}>
                <i className="bi bi-plus-circle me-2"></i>
                Agregar Primera Talla
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light sticky-top">
                  <tr>
                    <th style={{ width: '80px' }}>ID</th>
                    <th style={{ width: '150px' }}>Talla</th>
                    <th style={{ width: '150px' }}>Tipo</th>
                    <th>Descripción</th>
                    <th style={{ width: '120px' }} className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tallas.map(talla => (
                    <tr key={talla.idTalla}>
                      <td className="text-muted">#{talla.idTalla}</td>
                      <td>
                        <span className="badge bg-primary fs-6">
                          {talla.talla}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {talla.tipo}
                        </span>
                      </td>
                      <td className="text-muted">
                        {talla.descripcion || '-'}
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            onClick={() => handleEdit(talla)}
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            onClick={() => handleDelete(talla)}
                            title="Eliminar"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card-footer bg-light d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Total: <strong>{tallas?.length || 0}</strong> {tallas?.length === 1 ? 'talla' : 'tallas'}
          </small>
          <button className="btn btn-sm btn-outline-primary" onClick={onRefresh}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Actualizar
          </button>
        </div>
      </div>

      {/* Modal Crear */}
      {showCreate && (
        <ModalCrear
          title="Agregar Talla"
          fields={tallasConfig.fields}
          transformPayload={tallasConfig.transformPayload}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* Modal Editar */}
      {showEdit && selected && (
        <ModalEditar
          title="Editar Talla"
          initialData={selected}
          fields={tallasConfig.fields}
          transformPayload={tallasConfig.transformPayload}
          getId={tallasConfig.getId}
          onSave={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Modal Eliminar */}
      {showDelete && selected && (
        <ModalEliminar
          title="Eliminar Talla"
          message={`¿Estás seguro de que deseas eliminar la talla "${selected.talla}"? Esta acción no se puede deshacer.`}
          itemData={selected}
          getId={tallasConfig.getId}
          onConfirm={handleDeleteConfirm}
          onClose={() => setShowDelete(false)}
          confirmButtonText="Eliminar"
          confirmButtonClass="btn-danger"
        />
      )}
    </>
  )
}
