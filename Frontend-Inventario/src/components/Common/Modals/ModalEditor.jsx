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
  const [error, setError] = useState(null)

  useEffect(() => {
    setFormData(initialData)
    setError(null)
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 🛑 Validación Manual antes de enviar
    for (const field of fields) {
      const value = formData[field.name]
      const label = field.label || field.name

      // 1. Validar Required
      if (field.required && (value === null || value === undefined || value === '')) {
        setError(`El campo "${label}" es obligatorio.`)
        return
      }

      // 2. Validar MinLength
      if (value) {
        const minLen = typeof field.minLength === 'function' ? field.minLength(formData) : field.minLength
        if (minLen && String(value).length < minLen) {
          setError(`El campo "${label}" debe tener al menos ${minLen} caracteres.`)
          return
        }
      }

      // 3. Validar MaxLength
      if (value) {
        const maxLen = typeof field.maxLength === 'function' ? field.maxLength(formData) : field.maxLength
        if (maxLen && String(value).length > maxLen) {
          setError(`El campo "${label}" no puede exceder ${maxLen} caracteres.`)
          return
        }
      }
    }

    // ✅ Usar función getId recibida como prop
    const id = getId ? getId(formData) : null

    if (!id) {
      console.error('❌ ID no proporcionado en formData:', formData)
      return
    }

    // ✅ Transformar datos si hay función de transformación
    const payload = transformPayload ? transformPayload(formData) : formData

    console.log('📤 Modal → Guardando:', { id, payload })

    try {
      setError(null)
      await onSave(id, payload)
      onClose?.()
    } catch (err) {
      setError(err.message || 'Error al guardar los cambios')
    }
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

          {/* Alerta de Error */}
          {error && (
            <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <div>{error}</div>
            </div>
          )}

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
                    (() => {
                      // Resolver maxLength y minLength dinámicos
                      const resolvedMaxLength = typeof field.maxLength === 'function'
                        ? field.maxLength(formData)
                        : field.maxLength

                      const resolvedMinLength = typeof field.minLength === 'function'
                        ? field.minLength(formData)
                        : field.minLength

                      return (
                        <input
                          type={field.type || 'text'}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => {
                            // ✅ Lógica onlyNumbers
                            if (field.onlyNumbers) {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }
                            handleChange(e)
                          }}
                          className="form-control"
                          placeholder={field.placeholder}
                          required={field.required}
                          maxLength={resolvedMaxLength}
                          minLength={resolvedMinLength}
                          inputMode={field.onlyNumbers ? 'numeric' : undefined}
                        />
                      )
                    })()
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