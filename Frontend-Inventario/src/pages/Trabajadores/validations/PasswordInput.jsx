import React, { useState, useEffect } from 'react'

export default function PasswordInput({
  name = 'contrasena',
  value = '',
  onChange,
  required = true,
  withConfirmation = true, // ✅ Nuevo prop para controlar el campo de confirmación
  label = 'Contraseña',    // ✅ Nuevo prop para personalizar la etiqueta
  showStrength = true,     // ✅ Nuevo prop para mostrar/ocultar fortaleza
  placeholder = 'Ingrese contraseña'
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [strength, setStrength] = useState(0)
  const [errors, setErrors] = useState([])

  // ✅ Calcular fortaleza de la contraseña
  useEffect(() => {
    if (!showStrength || !value) {
      setStrength(0)
      setErrors([])
      return
    }

    let score = 0
    const newErrors = []

    // Longitud mínima
    if (value.length >= 6) {
      score += 20
    } else {
      newErrors.push('Mínimo 6 caracteres')
    }

    // Longitud ideal
    if (value.length >= 8) score += 20

    // Contiene números
    if (/\d/.test(value)) {
      score += 20
    } else {
      newErrors.push('Debe contener números')
    }

    // Contiene minúsculas
    if (/[a-z]/.test(value)) score += 20

    // Contiene mayúsculas
    if (/[A-Z]/.test(value)) {
      score += 20
    } else {
      newErrors.push('Debe contener mayúsculas')
    }

    setStrength(score)
    setErrors(newErrors)
  }, [value, showStrength])

  // ✅ Verificar si las contraseñas coinciden (Solo si withConfirmation es true)
  const passwordsMatch = !withConfirmation || (value && confirmPassword && value === confirmPassword)
  const showMismatch = withConfirmation && confirmPassword && !passwordsMatch

  // ✅ Obtener color y texto según fortaleza
  const getStrengthInfo = () => {
    if (strength === 0) return { color: 'secondary', text: '', width: 0 }
    if (strength <= 40) return { color: 'danger', text: 'Débil', width: 33 }
    if (strength <= 80) return { color: 'warning', text: 'Media', width: 66 }
    return { color: 'success', text: 'Fuerte', width: 100 }
  }

  const strengthInfo = getStrengthInfo()

  return (
    <div className="password-input-container">
      {/* Campo Contraseña */}
      <div className="mb-3">
        {label && (
          <label className="form-label small mb-1">
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>
        )}
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={onChange}
            className="form-control"
            placeholder={placeholder}
            required={required}
            minLength={6}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
          </button>
        </div>

        {/* Barra de fortaleza con animación */}
        {showStrength && value && (
          <div className="mt-2">
            <div className="progress" style={{ height: '6px' }}>
              <div
                className={`progress-bar bg-${strengthInfo.color}`}
                role="progressbar"
                style={{
                  width: `${strengthInfo.width}%`,
                  transition: 'width 0.3s ease-in-out'
                }}
                aria-valuenow={strengthInfo.width}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <small className={`text-${strengthInfo.color} d-block mt-1`}>
              {strengthInfo.text && (
                <>
                  <i className="bi bi-shield-fill-check me-1"></i>
                  Seguridad: {strengthInfo.text}
                </>
              )}
            </small>
          </div>
        )}

        {/* Mensajes de error */}
        {showStrength && errors.length > 0 && (
          <div className="mt-2">
            {errors.map((error, idx) => (
              <small key={idx} className="text-danger d-block">
                <i className="bi bi-x-circle me-1"></i>
                {error}
              </small>
            ))}
          </div>
        )}
      </div>

      {/* Campo Confirmar Contraseña (Condicional) */}
      {withConfirmation && (
        <div>
          <label className="form-label small mb-1">
            Confirmar Contraseña
            {required && <span className="text-danger ms-1">*</span>}
          </label>
          <div className="input-group">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`form-control ${confirmPassword && (passwordsMatch ? 'is-valid' : 'is-invalid')
                }`}
              placeholder="Confirme su contraseña"
              required={required}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowConfirm(!showConfirm)}
              tabIndex={-1}
            >
              <i className={`bi bi-eye${showConfirm ? '-slash' : ''}`}></i>
            </button>
          </div>

          {/* Feedback de coincidencia */}
          {passwordsMatch && confirmPassword && (
            <small className="text-success d-block mt-1">
              <i className="bi bi-check-circle-fill me-1"></i>
              Las contraseñas coinciden
            </small>
          )}
          {showMismatch && (
            <small className="text-danger d-block mt-1">
              <i className="bi bi-x-circle-fill me-1"></i>
              Las contraseñas no coinciden
            </small>
          )}
        </div>
      )}

      {/* Indicador de validación completa */}
      {withConfirmation && passwordsMatch && strength >= 60 && (
        <div className="alert alert-success mt-3 mb-0 py-2 px-3 d-flex align-items-center">
          <i className="bi bi-check-circle-fill me-2 fs-5"></i>
          <span className="small">Contraseña válida y confirmada</span>
        </div>
      )}
    </div>
  )
}