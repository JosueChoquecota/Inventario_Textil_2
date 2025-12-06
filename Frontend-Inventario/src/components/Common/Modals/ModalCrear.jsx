import React, { useState, useEffect } from 'react'
import PasswordInput from '../../../pages/Trabajadores/validations/PasswordInput'

export default function ModalCrear({
  title = "Crear",
  fields = [],
  onClose,
  onCreate,
  transformPayload
}) {
  const [formData, setFormData] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreviews, setImagePreviews] = useState({}) // ✅ Para mostrar preview de imágenes
  const [selectOptions, setSelectOptions] = useState({}) // ✅ Para opciones de selects dinámicos
  const [loadingOptions, setLoadingOptions] = useState(true) // ✅ Estado de carga

  // ✅ Cargar opciones de selects desde API
  useEffect(() => {
    const loadSelectOptions = async () => {
      const selectFields = fields.filter(f => f.type === 'select' && f.apiEndpoint)

      if (selectFields.length === 0) {
        setLoadingOptions(false)
        return
      }

      console.log('🔄 Cargando opciones de selects...')

      for (const field of selectFields) {
        try {
          const url = `http://localhost:8081${field.apiEndpoint}`
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`)
          }

          const data = await response.json()
          setSelectOptions(prev => ({
            ...prev,
            [field.name]: data
          }))
        } catch (err) {
          console.error(`❌ Error cargando ${field.name}:`, err)
        }
      }

      setLoadingOptions(false)
    }

    if (fields.length > 0) {
      loadSelectOptions()
    }
  }, [fields])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    // ✅ Manejo especial para archivos
    if (type === 'file') {
      const file = files[0]
      setFormData(prev => ({ ...prev, [name]: file || null }))

      // ✅ Generar preview si es imagen
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews(prev => ({ ...prev, [name]: reader.result }))
        }
        reader.readAsDataURL(file)
      } else {
        // Limpiar preview si no es imagen
        setImagePreviews(prev => {
          const newPreviews = { ...prev }
          delete newPreviews[name]
          return newPreviews
        })
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    setError(null)
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

    setSaving(true)
    setError(null)

    try {

      const payload = transformPayload ? transformPayload(formData) : formData
      await onCreate(payload)
      onClose?.()
    } catch (err) {
      setError(err?.message || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4"
      style={{ zIndex: 1050, background: 'rgba(0,0,0,0.45)' }}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="card shadow-sm" style={{ width: 920, maxWidth: '90vw', maxHeight: '90vh', overflow: 'hidden' }}>
        <div className="card-body" style={{ overflowY: 'auto' }}>

          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 className="mb-1">{title}</h5>
              <small className="text-muted">Complete los datos requeridos</small>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Cerrar"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {fields.map(field => {
                // ✅ Campo de contraseña especial
                if (field.type === 'password' && field.name === 'contrasena') {
                  return (
                    <div key={field.name} className={field.colClass || 'col-12'}>
                      <PasswordInput
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                      />
                    </div>
                  )
                }

                // ✅ Campo de archivo (imagen, PDF, etc.)
                if (field.type === 'file') {
                  return (
                    <div key={field.name} className={field.colClass || 'col-12'}>
                      <label className="form-label small mb-1">
                        {field.label}
                        {field.required && <span className="text-danger ms-1">*</span>}
                      </label>

                      {/* Preview de imagen */}
                      {imagePreviews[field.name] && (
                        <div className="mb-2">
                          <img
                            src={imagePreviews[field.name]}
                            alt="Preview"
                            className="img-thumbnail d-block"
                            style={{
                              maxWidth: field.previewSize || 200,
                              maxHeight: field.previewSize || 200,
                              objectFit: 'cover'
                            }}
                          />
                          <small className="text-success d-block mt-1">
                            ✅ Imagen seleccionada
                          </small>
                        </div>
                      )}

                      <input
                        type="file"
                        name={field.name}
                        className="form-control"
                        accept={field.accept || 'image/*'}
                        onChange={handleChange}
                        required={field.required}
                      />

                      {field.helperText && (
                        <small className="text-muted d-block mt-1">
                          {field.helperText}
                        </small>
                      )}
                    </div>
                  )
                }

                // ✅ Campo textarea
                if (field.type === 'textarea') {
                  return (
                    <div key={field.name} className={field.colClass || 'col-12'}>
                      <label className="form-label small mb-1">
                        {field.label}
                        {field.required && <span className="text-danger ms-1">*</span>}
                      </label>
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="form-control"
                        rows={field.rows || 3}
                        placeholder={field.placeholder}
                        required={field.required}
                        maxLength={field.maxLength}
                      />
                      {field.maxLength && (
                        <small className="text-muted d-block mt-1">
                          {(formData[field.name] || '').length} / {field.maxLength}
                        </small>
                      )}
                    </div>
                  )
                }

                // ✅ Campo select (con opciones estáticas o dinámicas)
                if (field.type === 'select') {
                  // Usar opciones de API si están disponibles, sino usar opciones estáticas
                  const options = field.apiEndpoint
                    ? (selectOptions[field.name] || [])
                    : (field.options || [])

                  return (
                    <div key={field.name} className={field.colClass || 'col-12 col-md-6'}>
                      <label className="form-label small mb-1">
                        {field.label}
                        {field.required && <span className="text-danger ms-1">*</span>}
                      </label>
                      <select
                        name={field.name}
                        className="form-select"
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.apiEndpoint && loadingOptions}
                      >
                        <option value="">
                          {loadingOptions && field.apiEndpoint ? 'Cargando...' : 'Seleccione...'}
                        </option>
                        {options.map((opt, index) => (
                          <option
                            key={field.valueKey ? opt[field.valueKey] : opt.id || index}
                            value={field.valueKey ? opt[field.valueKey] : opt.id}
                          >
                            {field.labelKey ? opt[field.labelKey] : opt.nombre}
                          </option>
                        ))}
                      </select>

                      {!loadingOptions && field.apiEndpoint && options.length === 0 && (
                        <small className="text-warning d-block mt-1">
                          ⚠️ No se pudieron cargar las opciones
                        </small>
                      )}
                    </div>
                  )
                }

                // ✅ Campos normales (text, email, number, etc.)
                return (
                  <div key={field.name} className={field.colClass || 'col-12 col-md-6'}>
                    <label className="form-label small mb-1">
                      {field.label}
                      {field.required && <span className="text-danger ms-1">*</span>}
                    </label>
                    {(() => {
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
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          inputMode={field.onlyNumbers ? 'numeric' : undefined}
                        />
                      )
                    })()}
                    {field.helperText && (
                      <small className="text-muted d-block mt-1">
                        {field.helperText}
                      </small>
                    )}
                  </div>
                )
              })}
            </div>

            {error && (
              <div className="alert alert-danger mt-3 mb-0">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving || loadingOptions}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle me-2"></i>
                    Crear
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}