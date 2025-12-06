import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import PasswordInput from '../Trabajadores/validations/PasswordInput'
import { updateProfile, login as loginApi } from '../../api/authApi'
import { getTiposDocumento } from '../../api/tipoDocumentoApi'
import { toast } from 'react-toastify'

export default function ConfiguracionUserPage() {
  const { user } = useAuth()
  const { darkMode, setDarkMode, compactMode, setCompactMode } = useTheme()
  const [activeTab, setActiveTab] = useState('perfil')
  const [tiposDocumento, setTiposDocumento] = useState([])

  // Profile Form State
  const [profileData, setProfileData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    rol: '',
    nDocumento: '',
    idTipoDoc: '',
    idRol: null,
    estado: true
  })

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const data = await getTiposDocumento()
        setTiposDocumento(data)
      } catch (error) {

      }
    }
    fetchTipos()
  }, [])

  useEffect(() => {
    if (user) {
      setProfileData({
        nombre: user.nombres || '',
        apellido: user.apellidos || '',
        email: user.correo || '',
        telefono: user.telefono || '',
        rol: user.rolNombre || 'Usuario',
        nDocumento: user.nDocumento || '',
        idTipoDoc: user.idTipoDoc || '',
        idRol: user.idRol,
        estado: user.estado
      })
    }
  }, [user])

  // Security Form State
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswords(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    try {
      const payload = {
        nombres: profileData.nombre,
        apellidos: profileData.apellido,
        correo: profileData.email,
        telefono: profileData.telefono,
        nDocumento: profileData.nDocumento,
        idTipoDoc: Number(profileData.idTipoDoc), // Asegurar que sea número
        idRol: profileData.idRol,
        estado: profileData.estado,
        contrasena: null // No cambiar contraseña
      }

      await updateProfile(user.id, payload)
      toast.success('Perfil actualizado correctamente')

      // Recargar sesión para actualizar datos en el contexto
      // Nota: Esto depende de si checkSession actualiza el contexto automáticamente o si necesitamos forzarlo
      window.location.reload()

    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Error al actualizar perfil')
    }
  }

  const handleSavePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('Las contraseñas nuevas no coinciden')
      return
    }

    // Validaciones estrictas
    if (passwords.new.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }

    if (!/[A-Z]/.test(passwords.new)) {
      toast.error('La contraseña debe contener al menos una mayúscula')
      return
    }

    if (!/\d/.test(passwords.new)) {
      toast.error('La contraseña debe contener al menos un número')
      return
    }

    try {
      // 1. Verificar contraseña actual intentando loguearse
      await loginApi(user.correo, passwords.current)

      // 2. Si es correcto, proceder a actualizar
      const payload = {
        nombres: profileData.nombre,
        apellidos: profileData.apellido,
        correo: profileData.email,
        telefono: profileData.telefono,
        nDocumento: profileData.nDocumento,
        idTipoDoc: Number(profileData.idTipoDoc),
        idRol: profileData.idRol,
        estado: profileData.estado,
        contrasena: passwords.new
      }

      await updateProfile(user.id, payload)
      toast.success('Contraseña actualizada correctamente')
      setPasswords({ current: '', new: '', confirm: '' })

    } catch (error) {
      console.error(error)
      // Manejo específico de errores
      if (error.message.includes('credenciales') || error.message.includes('401') || error.message.includes('incorrectos')) {
        toast.error('La contraseña actual es incorrecta ❌')
      } else {
        toast.error(error.message || 'Error al actualizar contraseña')
      }
    }
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-primary fw-bold">
        <i className="bi bi-gear-fill me-2"></i>Configuración
      </h2>

      <div className="row">
        {/* Sidebar de Navegación */}
        <div className="col-md-3 mb-4">
          <div className="list-group shadow-sm">
            <button
              className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'perfil' ? 'active' : ''}`}
              onClick={() => setActiveTab('perfil')}
            >
              <i className="bi bi-person-circle me-3 fs-5"></i> Perfil
            </button>
            <button
              className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'seguridad' ? 'active' : ''}`}
              onClick={() => setActiveTab('seguridad')}
            >
              <i className="bi bi-shield-lock me-3 fs-5"></i> Seguridad
            </button>
            <button
              className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'apariencia' ? 'active' : ''}`}
              onClick={() => setActiveTab('apariencia')}
            >
              <i className="bi bi-palette me-3 fs-5"></i> Apariencia
            </button>
          </div>
        </div>

        {/* Área de Contenido */}
        <div className="col-md-9">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              {/* SECCIÓN PERFIL */}
              {activeTab === 'perfil' && (
                <div className="animate__animated animate__fadeIn">
                  <h4 className="mb-4 text-secondary">Información Personal</h4>
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                      {profileData.nombre.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h5 className="mb-0">{profileData.nombre} {profileData.apellido}</h5>
                      <span className="badge bg-info text-dark">{profileData.rol}</span>
                    </div>
                  </div>

                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" name="nombre" value={profileData.nombre} onChange={handleProfileChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Apellido</label>
                        <input type="text" className="form-control" name="apellido" value={profileData.apellido} onChange={handleProfileChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={profileData.email} onChange={handleProfileChange} disabled />
                        <div className="form-text">El email no se puede cambiar.</div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" name="telefono" value={profileData.telefono} onChange={handleProfileChange} />
                      </div>

                      {/* ✅ Nuevos campos: Tipo y Número de Documento */}
                      <div className="col-md-6">
                        <label className="form-label">Tipo de Documento</label>
                        <select
                          className="form-select"
                          name="idTipoDoc"
                          value={profileData.idTipoDoc}
                          onChange={handleProfileChange}
                        >
                          <option value="">Seleccione...</option>
                          {tiposDocumento.map(tipo => (
                            <option key={tipo.id_tipo_doc} value={tipo.id_tipo_doc}>
                              {tipo.tipo}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Número de Documento</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nDocumento"
                          value={profileData.nDocumento}
                          onChange={handleProfileChange}
                        />
                      </div>

                    </div>
                    <div className="mt-4 text-end">
                      <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>
                        <i className="bi bi-save me-2"></i>Guardar Cambios
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* SECCIÓN SEGURIDAD */}
              {activeTab === 'seguridad' && (
                <div className="animate__animated animate__fadeIn">
                  <h4 className="mb-4 text-secondary">Cambiar Contraseña</h4>
                  <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Asegúrate de usar una contraseña segura.
                  </div>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Contraseña Actual</label>
                      <PasswordInput
                        name="current"
                        value={passwords.current}
                        onChange={handlePasswordChange}
                        placeholder="Ingresa tu contraseña actual"
                        withConfirmation={false}
                        showStrength={false}
                        label={null}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nueva Contraseña</label>
                      <PasswordInput
                        name="new"
                        value={passwords.new}
                        onChange={handlePasswordChange}
                        placeholder="Mínimo 8 caracteres"
                        withConfirmation={false}
                        showStrength={true}
                        label={null}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirmar Contraseña</label>
                      <PasswordInput
                        name="confirm"
                        value={passwords.confirm}
                        onChange={handlePasswordChange}
                        placeholder="Repite la nueva contraseña"
                        withConfirmation={false}
                        showStrength={false}
                        label={null}
                      />
                    </div>
                    <div className="mt-4 text-end">
                      <button type="button" className="btn btn-danger" onClick={handleSavePassword}>
                        <i className="bi bi-key me-2"></i>Actualizar Contraseña
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* SECCIÓN APARIENCIA */}
              {activeTab === 'apariencia' && (
                <div className="animate__animated animate__fadeIn">
                  <h4 className="mb-4 text-secondary">Personalización</h4>

                  <div className="mb-4">
                    <label className="form-label d-block mb-3 fw-bold">Tema de la Aplicación</label>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="darkModeSwitch"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="darkModeSwitch">
                        {darkMode ? '🌙 Modo Oscuro Activado' : '☀️ Modo Claro Activado'}
                      </label>
                    </div>
                  </div>

                  <hr />

                  <div className="mb-4">
                    <label className="form-label d-block mb-3 fw-bold">Densidad de Tablas</label>
                    <div className="btn-group" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        name="density"
                        id="densityNormal"
                        autoComplete="off"
                        checked={!compactMode}
                        onChange={() => setCompactMode(false)}
                      />
                      <label className="btn btn-outline-primary" htmlFor="densityNormal">Normal</label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="density"
                        id="densityCompact"
                        autoComplete="off"
                        checked={compactMode}
                        onChange={() => setCompactMode(true)}
                      />
                      <label className="btn btn-outline-primary" htmlFor="densityCompact">Compacto</label>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
