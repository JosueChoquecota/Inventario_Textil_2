import React, { useEffect, useState } from 'react'
import { useCRUD } from '../../../hooks/useCRUD'
import { coloresConfig } from '../config/coloresConfig'
import ModalCrear from '../../../components/Common/Modals/ModalCrear.jsx'
import ModalEditar from '../../../components/Common/Modals/ModalEditar.jsx'
import ModalEliminar from '../../../components/Common/Modals/ModalEliminar'
import Spinner from '../../../components/Common/Spinner'

export default function GestionColores() {
  const { data: colores, loading, error, onRefresh, create, update, remove } = useCRUD(coloresConfig)
  
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
  function handleEdit(color) {
    setSelected(color)
    setShowEdit(true)
  }
  function handleDelete(color) {
    setSelected(color)
    setShowDelete(true)
  }

  // CRUD handlers
  const handleCreate = async (nuevoColor) => {
    await create(nuevoColor)
    setShowCreate(false)
    onRefresh()
  }
  const handleUpdate = async (id, colorActualizado) => {
    await update(id, colorActualizado)
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

  return (
    <>
      <div className="card">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0">
            <i className="bi bi-palette me-2"></i>
            Gestión de Colores
          </h5>
          <button className="btn btn-success btn-sm" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-1"></i> Agregar
          </button>
        </div>

        <div className="card-body ps-2 pe-0 pt-0 pb-0" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {/* Show error if exists */}
          {error && (
            <div className="alert alert-danger m-3" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
              <button className="btn btn-primary ms-3" onClick={onRefresh}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Reintentar
              </button>
            </div>
          )}

          {/* Show loading only in table area */}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
              <div className="text-center">
                <Spinner size="3rem" />
                <p className="mt-3 text-muted">Cargando colores...</p>
              </div>
            </div>
          ) : (
            !colores || colores.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-palette display-4 text-muted"></i>
              <p className="text-muted mt-3">No hay colores registrados</p>
              <button className="btn btn-success" onClick={handleAdd}>
                <i className="bi bi-plus-circle me-2"></i>
                Agregar Primer Color
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light sticky-top">
                  <tr>
                    <th style={{ width: '80px' }}>ID</th>
                    <th style={{ width: '100px' }}>Vista</th>
                    <th style={{ width: '200px' }}>Nombre</th>
                    <th style={{ width: '150px' }}>Código</th>
                    <th style={{ width: '120px' }} className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {colores.map(color => (
                    <tr key={color.idColor}>
                      <td className="text-muted">#{color.idColor}</td>
                      <td>
                        <div
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: color.codigo,
                            border: color.codigo === '#FFFFFF' ? '2px solid #ddd' : '1px solid #ccc',
                            borderRadius: 8,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                          title={color.codigo}
                        />
                      </td>
                      <td>
                        <strong>{color.color}</strong>
                      </td>
                      <td>
                        <code className="bg-light px-2 py-1 rounded">
                          {color.codigo}
                        </code>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            onClick={() => handleEdit(color)}
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            onClick={() => handleDelete(color)}
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
          )

          )}
        </div>

        <div className="card-footer bg-light d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Total: <strong>{colores?.length || 0}</strong> {colores?.length === 1 ? 'color' : 'colores'}
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
          title="Agregar Color"
          fields={coloresConfig.fields}
          transformPayload={coloresConfig.transformPayload}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* Modal Editar */}
      {showEdit && selected && (
        <ModalEditar
          title="Editar Color"
          initialData={selected}
          fields={coloresConfig.fields}
          transformPayload={coloresConfig.transformPayload}
          getId={coloresConfig.getId}
          onSave={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Modal Eliminar */}
      {showDelete && selected && (
        <ModalEliminar
          title="Eliminar Color"
          message={`¿Estás seguro de que deseas eliminar el color "${selected.color}"? Esta acción no se puede deshacer.`}
          itemData={selected}
          getId={coloresConfig.getId}
          onConfirm={handleDeleteConfirm}
          onClose={() => setShowDelete(false)}
          confirmButtonText="Eliminar"
          confirmButtonClass="btn-danger"
        />
      )}
    </>
  )
}
