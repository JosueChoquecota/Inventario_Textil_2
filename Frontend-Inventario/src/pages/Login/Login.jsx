import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoginIllustration from '../../assets/login.svg'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth() // ✅ Usar el hook
  
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: ''
  })
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validated, setValidated] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setLoading(true)
    setError('')

    try {
      // ✅ Llamar a login del context (incluye remember)
      await login(formData.correo, formData.contrasena, remember)


      
      // Redirigir al dashboard
      navigate('/dashboard')

    } catch (err) {

      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-white">
      {/* Card centrada */}
      <div
        className="card shadow border-0 rounded overflow-hidden d-flex flex-column flex-md-row align-items-stretch"
        style={{ maxWidth: "1000px", width: "100%", height: "55vh" }}
      >
        {/* Formulario */}
        <div className="card-body p-5 d-flex flex-column justify-content-center align-items-center bg-white" style={{ flex: 1 }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h1 className="display-6 fw-bold mb-1 text-center">Login</h1>
            <p className="text-muted small mb-4 text-center">
              Necesitas una cuenta verificada para acceder
            </p>
            <hr />

            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
                <button type="button" className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}

            <form 
              className={`needs-validation ${validated ? 'was-validated' : ''}`} 
              noValidate 
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo</label>
                <input
                  id="correo"
                  type="email"
                  className="form-control"
                  placeholder="correo@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <div className="invalid-feedback">Ingresa un correo válido.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label">Contraseña</label>
                <input
                  id="contrasena"
                  type="password"
                  className="form-control"
                  placeholder="***************"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                  minLength={6}
                  disabled={loading}
                />
                <div className="invalid-feedback">
                  La contraseña debe tener al menos 6 caracteres.
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input 
                    id="remember" 
                    className="form-check-input" 
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    disabled={loading}
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Recordar
                  </label>
                </div>

                <a href="#" className="small text-decoration-none">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div className="d-grid">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Ingresando...
                    </>
                  ) : (
                    'Ingresar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Imagen (visible solo en pantallas md y mayores) */}
        <div
          className="d-none d-md-flex align-items-center justify-content-center bg-white p-4"
          style={{ flex: 1 }}
        >
          <img
            src={LoginIllustration}
            alt="Ilustración de login"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>

  )
}
