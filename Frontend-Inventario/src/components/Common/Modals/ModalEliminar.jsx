import React from 'react'

export default function ModalEliminar({ 
  title = "Eliminar",
  message = "¿Está seguro que desea eliminar este elemento?",
  itemData = {},
  displayField = 'nombres',  // ← Campo a mostrar del item
  onClose, 
  onConfirm,
  getId  // ← ✅ Función para extraer ID (recibida como prop)
}) {

  const handleConfirm = async () => {
    // ✅ Usar función getId recibida como prop
    const id = getId ? getId(itemData) : null

    if (!id) {

      return
    }


    await onConfirm(id)
    onClose?.()
  }

  // ✅ Obtener valor a mostrar del item
  const displayValue = itemData[displayField] || ''
  const secondaryField = itemData.apellidos || itemData.nombre || ''

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050, background: 'rgba(0,0,0,0.5)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="card shadow" style={{ maxWidth: 500, width: '90%' }}>
        <div className="card-body">
          
          {/* Header */}
          <div className="d-flex align-items-center mb-3">
            <div 
              className="rounded-circle bg-danger bg-opacity-10 p-3 me-3"
              style={{ width: 56, height: 56 }}
            >
              <i className="bi bi-trash3 text-danger fs-4"></i>
            </div>
            <div>
              <h5 className="mb-1">{title}</h5>
              <small className="text-muted">Esta acción no se puede deshacer</small>
            </div>
          </div>

          {/* Mensaje */}
          <div className="mb-3">
            <p className="mb-2">{message}</p>
            {displayValue && (
              <div className="alert alert-light border mb-0">
                <strong>{displayValue}</strong>
                {secondaryField && ` ${secondaryField}`}
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="d-flex gap-2 justify-content-end">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => onClose?.()}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={handleConfirm}
            >
              <i className="bi bi-trash3 me-1"></i>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}