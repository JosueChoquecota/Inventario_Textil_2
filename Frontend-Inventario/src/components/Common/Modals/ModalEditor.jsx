import React, { useEffect, useState } from 'react'

export default function ModalEditar({ 
  title = "Editar",
  initialData = {}, 
  fields = [],
  onClose, 
  onSave,
  transformPayload,
  getId  // ← ✅ Agregar prop
}) {
  const [formData, setFormData] = useState(initialData)

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ Usar función getId recibida como prop
    const id = getId ? getId(formData) : null

    if (!id) {
      console.error('❌ ID no proporcionado en formData:', formData)
      return
    }

    // ✅ Transformar datos si hay función de transformación
    const payload = transformPayload ? transformPayload(formData) : formData

    console.log('📤 Modal → Guardando:', { id, payload })

    await onSave(id, payload)
    onClose?.()
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-5"
      style={{ zIndex: 1050, background: 'rgba(0,0,0,0.45)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="card shadow-sm w-100" style={{ width: 900, maxWidth: 920, maxHeight: '90vh', overflow: 'hidden' }}>
        <div className="card-body d-flex flex-column" style={{ overflowY: 'auto', paddingBottom: 16 }}>
          
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 className="mb-1">{title}</h5>
              <small className="text-muted">Complete los datos requeridos</small>
            </div>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-secondary" 
              onClick={() => onClose?.()}
            >
              Cerrar
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {fields.map(field => (
                <div key={field.name} className={field.colClass || 'col-12 col-md-6'}>
                  <label className="form-label small">{field.label}</label>
                  
                  {field.type === 'select' ? (
                    // ✅ Campo tipo SELECT
                    <select
                      name={field.name}
                      className="form-select"
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                    >
                      <option value="">Seleccione...</option>
                      {field.options?.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.nombre}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // ✅ Campo tipo INPUT
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="form-control"
                      placeholder={field.placeholder}
                      required={field.required}
                      maxLength={field.maxLength}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => onClose?.()}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}