import React, { useState } from 'react'
import { NavLink } from 'react-router-dom' // ✅ Cambiar Link por NavLink
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import './Sidebar.css'

export default function Sidebar() {
  const { user, checkPermission } = useAuth()
  const { darkMode } = useTheme()

  // ✅ Estado para colapsar/expandir automático con hover
  const [isCollapsed, setIsCollapsed] = useState(true)

  // Clases dinámicas según el tema
  const sidebarClasses = `offcanvas offcanvas-start d-md-none ${darkMode ? 'bg-dark text-white' : 'bg-primary text-white'}`

  // ✅ Añadir clase 'collapsed' si está colapsado
  const desktopSidebarClasses = `d-none d-md-flex sidebar ${isCollapsed ? 'collapsed' : ''} ${darkMode ? 'bg-dark text-white border-end border-secondary' : 'bg-primary text-white'} p-3 flex-column`

  // Componente interno para reutilizar el contenido
  const SidebarContent = ({ isMobile = false }) => (
    <>
      {user && (
        <div className={`user-info p-4 rounded d-flex align-items-center ${isMobile ? 'mb-3' : ''}`} style={{ backgroundColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div
            className={`avatar ${darkMode ? 'bg-secondary text-white' : 'bg-light text-primary'} rounded-circle d-flex align-items-center justify-content-center flex-shrink-0`}
            style={{ width: '40px', height: '40px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            {user.nombres?.charAt(0)}{user.apellidos?.charAt(0)}
          </div>
          {/* En móvil siempre visible, en desktop depende de isCollapsed */}
          <div className={`ms-2 transition-opacity ${!isMobile && isCollapsed ? 'opacity-0 d-none' : 'opacity-100'}`} style={{ flex: 1, minWidth: 0 }}>
            <div className="fw-bold small text-truncate">{user.nombres} {user.apellidos}</div>
            <small className="opacity-75">{user.rol}</small>
          </div>
        </div>
      )}

      <div className={`main-menu-title pt-3 ps-3 ${!isMobile && isCollapsed ? 'd-none' : ''}`}><strong>MAIN MENU</strong></div>

      <div className="nav-center">
        <ul className={`sidebar-nav ${!isMobile && isCollapsed ? 'ps-0' : 'ps-3'}`}>
          {checkPermission('Dashboard', 'canRead') && (
            <li className='nav-item'>
              <NavLink className='sidebar-link' to='/dashboard/Dashboard'>
                <i className="bi bi-speedometer icon"></i>
                <span className='label'>Dashboard</span>
                {isCollapsed && !isMobile && <span className="custom-tooltip">Dashboard</span>}
              </NavLink>
            </li>
          )}

          {checkPermission('Trabajadores', 'canRead') && (
            <li className="nav-item">
              <NavLink className="sidebar-link" to="/dashboard/trabajadores">
                <i className="bi bi-people-fill icon" />
                <span className="label">Trabajadores</span>
                {isCollapsed && !isMobile && <span className="custom-tooltip">Trabajadores</span>}
              </NavLink>
            </li>
          )}

          {checkPermission('Proveedores', 'canRead') && (
            <li className="nav-item">
              <NavLink className="sidebar-link" to="/dashboard/proveedores">
                <i className="bi bi-truck icon" />
                <span className="label">Proveedores</span>
                {isCollapsed && !isMobile && <span className="custom-tooltip">Proveedores</span>}
              </NavLink>
            </li>
          )}

          {checkPermission('Producto', 'canRead') && (
            <li className="nav-item">
              <a
                className="sidebar-link collapse-toggle collapsed"
                data-bs-toggle="collapse"
                href="#inventarioSubmenu"
                role="button"
                aria-expanded="false"
                aria-controls="inventarioSubmenu"
              >
                <i className="bi bi-clipboard2-check-fill icon"></i>
                <span className="label">Producto</span>
                <i className="bi bi-chevron-down ms-auto chevron" />
                {isCollapsed && !isMobile && <span className="custom-tooltip">Producto</span>}
              </a>

              <div className="collapse ms-3" id="inventarioSubmenu">
                <ul className="nav flex-column ps-1 sublist">
                  <li className="nav-item small-item">
                    <NavLink className="sidebar-link small-link" to="/dashboard/inventario" title={!isMobile && isCollapsed ? "Listado" : ""}>
                      <i className="bi bi-list small-icon" />
                      <span className="label">Listado</span>
                    </NavLink>
                  </li>
                  <li className="nav-item small-item">
                    <NavLink className="sidebar-link small-link" to="/dashboard/inventario/categorias" title={!isMobile && isCollapsed ? "Categorías" : ""}>
                      <i className="bi bi-tags small-icon" />
                      <span className="label">Categorías</span>
                    </NavLink>
                  </li>
                  <li className="nav-item small-item">
                    <NavLink className="sidebar-link small-link" to="/dashboard/inventario/marcas" title={!isMobile && isCollapsed ? "Marcas" : ""}>
                      <i className="bi bi-award small-icon" />
                      <span className="label">Marcas</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          )}

          {checkPermission('Compras', 'canRead') && (
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
                {isCollapsed && !isMobile && <span className="custom-tooltip">Detalle Compra</span>}
              </a>
              <div className='collapse ms-3' id='configuracionSubmenu'>
                <ul className="nav flex-column ps-1 sublist">
                  <li className="nav-item small-item">
                    <NavLink className="sidebar-link small-link" to="/dashboard/compras" title={!isMobile && isCollapsed ? "Compras" : ""}>
                      <i className="bi bi-bag-check-fill small-icon" />
                      <span className="label">Compras</span>
                    </NavLink>
                  </li>
                  <li className="nav-item small-item">
                    <NavLink className="sidebar-link small-link" to="/dashboard/compras/configuracion" title={!isMobile && isCollapsed ? "Configuración" : ""}>
                      <i className="bi bi-palette small-icon" />
                      <span className="label">Configuración</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          )}

          {checkPermission('Clientes', 'canRead') && (
            <li className="nav-item">
              <NavLink className="sidebar-link" to="/dashboard/clientes">
                <i className="bi bi-person icon" />
                <span className="label">Clientes</span>
                {isCollapsed && !isMobile && <span className="custom-tooltip">Clientes</span>}
              </NavLink>
            </li>
          )}

          {checkPermission('Stock', 'canRead') && (
            <li className="nav-item">
              <NavLink className="sidebar-link" to="/dashboard/stock">
                <i className="bi bi-box-seam icon" />
                <span className="label">Stock</span>
                {isCollapsed && !isMobile && <span className="custom-tooltip">Stock</span>}
              </NavLink>
            </li>
          )}

          {checkPermission('Ventas', 'canRead') && (
            <li className="nav-item">
              <NavLink className="sidebar-link" to="/dashboard/ventas">
                <i className="bi bi-currency-dollar icon" />
                <span className="label">Ventas</span>
                {isCollapsed && !isMobile && <span className="custom-tooltip">Ventas</span>}
              </NavLink>
            </li>
          )}


        </ul>
      </div>
    </>
  )

  return (
    <>
      {/* MOBILE SIDEBAR (OFFCANVAS) */}
      <div
        className={sidebarClasses}
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">Menú</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <SidebarContent isMobile={true} />
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={desktopSidebarClasses}
        id="sidebarMenu"
        aria-label="Panel lateral"
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        <SidebarContent isMobile={false} />
      </aside>
    </>
  )
}