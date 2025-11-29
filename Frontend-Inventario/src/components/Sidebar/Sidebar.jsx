import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom' // ✅ Cambiar Link por NavLink
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

function SidebarLinks() {
  const { isAdmin, isVendedor } = useAuth()

  return (
    <ul className="sidebar-nav ps-3">
      <li className='nav-item'>
        {/* ✅ Cambiar Link por NavLink */}
        <NavLink className='sidebar-link' to='/dashboard/Dashboard'>
          <i className="bi bi-speedometer"></i>
          <span className='label'>Dashboard</span>
        </NavLink>
      </li>

      {isAdmin && (
        <li className="nav-item">
          <NavLink className="sidebar-link" to="/dashboard/trabajadores">
            <i className="bi bi-people-fill icon" />
            <span className="label">Trabajadores</span>
          </NavLink>
        </li>
      )}

      <li className="nav-item">
        <NavLink className="sidebar-link" to="/dashboard/proveedores">
          <i className="bi bi-truck icon" />
          <span className="label">Proveedores</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <a
          className="sidebar-link collapse-toggle collapsed"
          data-bs-toggle="collapse"
          href="#inventarioSubmenu"
          role="button"
          aria-expanded="false"
          aria-controls="inventarioSubmenu"
        >
          <i className="bi bi-clipboard2-check-fill"></i>

          <span className="label">Producto</span>
          <i className="bi bi-chevron-down ms-auto chevron" />
        </a>

        <div className="collapse ms-3" id="inventarioSubmenu">
          <ul className="nav flex-column ps-1 sublist">
            <li className="nav-item small-item">
              <NavLink className="sidebar-link small-link" to="/dashboard/inventario">
                <i className="bi bi-list small-icon" />
                <span className="label">Listado</span>
              </NavLink>
            </li>
            <li className="nav-item small-item">
              <NavLink className="sidebar-link small-link" to="/dashboard/inventario/categorias">
                <i className="bi bi-tags small-icon" />
                <span className="label">Categorías</span>
              </NavLink>
            </li>
            <li className="nav-item small-item">
              <NavLink className="sidebar-link small-link" to="/dashboard/inventario/marcas">
                <i className="bi bi-award small-icon" />
                <span className="label">Marcas</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </li>

      <li className="nav-item">
        <a 
          className="sidebar-link collapse-toggle collapsed"
          data-bs-toggle="collapse"
          href="#configuracionSubmenu"
          role="button"
          aria-expanded="false"
          aria-controls="configuracionSubmenu"
        >
          <i className="bi bi-journal-text icon" />
          <span className="label">Detalle Compra</span>
          <i className="bi bi-chevron-down ms-auto chevron"></i>
        </a>
        <div className='collapse ms-3' id='configuracionSubmenu'>
          <ul className="nav flex-column ps-1 sublist">
            <li className="nav-item small-item">
              <NavLink className="sidebar-link small-link" to="/dashboard/compras">
                <i className="bi bi-bag-check-fill small-icon" />
                <span className="label">Compras</span>
              </NavLink>
            </li>
            <li className="nav-item small-item">
              <NavLink className="sidebar-link small-link" to="/dashboard/compras/configuracion">
                <i className="bi bi-palette small-icon" />
                <span className="label">Configuración</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </li>
        
      <li className="nav-item">
        <NavLink className="sidebar-link" to="/dashboard/clientes">
          <i className="bi bi-person icon" />
          <span className="label">Clientes</span>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="sidebar-link" to="/dashboard/stock">
          <i className="bi bi-box-seam icon" />
          <span className="label">Stock</span>
        </NavLink>
      </li>

      {(isAdmin || isVendedor) && (
        <li className="nav-item">
          <NavLink className="sidebar-link" to="/dashboard/ventas">
            <i className="bi bi-currency-dollar icon" />
            <span className="label">Ventas</span>
          </NavLink>
        </li>
      )}
    </ul>
  )
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      try {
        await logout()
        navigate('/login', { replace: true })
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
        navigate('/login', { replace: true })
      }
    }
  }

  return (
    <>
      <div
        className="offcanvas offcanvas-start d-md-none bg-primary text-white"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-body p-3 d-flex flex-column" style={{ minHeight: 'calc(100vh - 56px)' }}>
          <div className="sidebar-brand mb-3">
            <h4 className="mb-0 text-center fw-bold">
              <i className="bi bi-box me-2" /> Dashboard
            </h4>
          </div>

          {user && (
            <div className="user-info-mobile p-2 mb-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <div className="d-flex align-items-center">
                <div 
                  className="avatar bg-light text-primary rounded-circle me-2 d-flex align-items-center justify-content-center"
                  style={{ width: '35px', height: '35px', fontSize: '0.9rem', fontWeight: 'bold' }}
                >
                  {user.nombres?.charAt(0)}{user.apellidos?.charAt(0)}
                </div>
                <div>
                  <div className="fw-bold small">{user.nombres} {user.apellidos}</div>
                  <small className="opacity-75">{user.rol}</small>
                </div>
              </div>
            </div>
          )}

          <div className="nav-center">
            <SidebarLinks />
          </div>

          <div className="account-section mt-3">
            <div className="account-title ps-3 mb-2"><strong>CUENTA</strong></div>
            <ul className="sidebar-nav">
              <li className="nav-item">
                <NavLink className="sidebar-link" to="/dashboard/configuracion">
                  <i className="bi bi-gear icon" />
                  <span className="label">Configuración</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <hr className="menu-separator" />

          <div className="mt-3 logout-wrap-mobile">
            <button 
              className="logout-btn w-100 text-start" 
              onClick={handleLogout}
              aria-label="Cerrar sesión"
            >
              <i className="bi bi-box-arrow-right" />
              <span className="label ms-2">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      <aside
        className="d-none d-md-flex sidebar bg-primary text-white p-3 flex-column vh-100 overflow-auto"
        id="sidebarMenu"
        aria-label="Panel lateral"
      >
        {user && (
          <div className="user-info p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <div className="d-flex align-items-center">
              <div 
                className="avatar bg-light text-primary rounded-circle me-2 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', fontSize: '1rem', fontWeight: 'bold' }}
              >
                {user.nombres?.charAt(0)}{user.apellidos?.charAt(0)}
              </div>
              <div>
                <div className="fw-bold small">{user.nombres} {user.apellidos}</div>
                <small className="opacity-75">{user.rol}</small>
              </div>
            </div>
          </div>
        )}
      
        <div className="main-menu-title pt-3 ps-3"><strong>MAIN MENU</strong></div>

        <div className="nav-center">
          <SidebarLinks />
        </div>


        <hr className="menu-separator" />

        <div className="logout-wrap">
          <button 
            className="logout-btn w-100 text-start" 
            onClick={handleLogout}
            aria-label="Cerrar sesión"
          >
            <i className="bi bi-box-arrow-right" />
            <span className="label ms-2">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}