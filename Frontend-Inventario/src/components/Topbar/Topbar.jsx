import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Topbar.css'

export default function Topbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
            await logout()
            navigate('/login', { replace: true })
        }
    }

    return (
        <nav className="navbar navbar-light bg-white shadow-sm px-4" style={{ height: '70px' }}>
            <div className="container-fluid">
                {/* Botón hamburguesa (móvil) */}
                <button
                    className="navbar-toggler border-0 d-md-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarOffcanvas"
                    aria-controls="sidebarOffcanvas"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Espaciador */}
                <div className="flex-grow-1"></div>

                {/* Usuario: Solo correo + avatar */}
                <div className="dropdown">
                    <button
                        className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
                        id="dropdownUser"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {/* Correo */}
                        <span className="text-dark d-none d-md-inline">
                            {user?.correo}
                        </span>

                        {/* Avatar */}
                        <div 
                            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                            style={{ 
                                width: '40px', 
                                height: '40px', 
                                fontSize: '1rem', 
                                fontWeight: '600',
                                textTransform: 'uppercase'
                            }}
                        >
                            {user?.nombres?.charAt(0)}{user?.apellidos?.charAt(0)}
                        </div>

                        {/* Icono dropdown */}
                        <i className="bi bi-chevron-down text-muted small"></i>
                    </button>

                    {/* Menú desplegable simple */}
                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" style={{ minWidth: '200px' }}>            
                        <li>
                            <a className="dropdown-item" href="/dashboard/configuracion">
                                <i className="bi bi-gear me-2"></i>
                                Configuración
                            </a>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <button 
                                className="dropdown-item text-danger"
                                onClick={handleLogout}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
