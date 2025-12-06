import React, { useEffect, useState, useMemo } from 'react'
import { obtenerStockPorProducto } from '../../api/stockApi'
import Spinner from '../../components/Common/Spinner'
import Error from '../../components/Common/error'

// ✅ Mapa de colores
const colorMap = {
  'rojo': '#dc3545',
  'azul': '#0d6efd',
  'verde': '#198754',
  'amarillo': '#ffc107',
  'negro': '#212529',
  'blanco': '#ffffff',
  'gris': '#6c757d',
  'naranja': '#fd7e14',
  'morado': '#6f42c1',
  'rosa': '#d63384',
  'marrón': '#795548',
  'celeste': '#0dcaf0',
  'beige': '#f5f5dc',
  'turquesa': '#20c997',
  'lila': '#e0cffc',
  'fucsia': '#d63384',
  'vino': '#800020'
}

const getColorStyle = (colorName) => {
  const name = colorName?.toLowerCase()?.trim()
  const bg = colorMap[name] || '#e9ecef' // Default gray
  const isLight = ['amarillo', 'blanco', 'beige', 'celeste', 'lila'].includes(name)

  return {
    backgroundColor: bg,
    color: isLight ? '#000' : '#fff',
    border: name === 'blanco' ? '1px solid #dee2e6' : '1px solid transparent'
  }
}

export default function StockPage() {
  const [stock, setStock] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  // ✅ Estados para búsqueda y ordenamiento
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  useEffect(() => {
    const loadStock = async () => {
      try {
        setLoading(true)
        const stockData = await obtenerStockPorProducto()
        
        // Transform StockResponseDTO to match the table structure
        const stockItems = stockData.map((item, index) => ({
          id: item.idListaProducto ? `stock-${item.idListaProducto}` : `stock-${index}`,
          idProducto: item.idListaProducto,
          idListaProducto: item.idListaProducto,
          nombreProducto: item.nombreProducto,
          marca: item.marca,
          categoria: item.categoria,
          talla: item.talla,
          color: item.color,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          proveedor: item.proveedor,
          imagen: null // Add if available in your DTO
        }))
        
        setStock(stockItems)
        setError(null)
      } catch (err) {
        setError(err.message || 'Error al cargar el stock')
        setStock([])
      } finally {
        setLoading(false)
      }
    }

    loadStock()
  }, [])

  const formatCurrency = (value) => `S/ ${Number(value || 0).toFixed(2)}`

  // ✅ Manejador de ordenamiento
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  // ✅ Lógica de filtrado y ordenamiento
  const filteredStock = useMemo(() => {
    let result = [...stock]

    // 1. Filtrar
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(item =>
        item.nombreProducto?.toLowerCase().includes(q) ||
        item.marca?.toLowerCase().includes(q) ||
        item.categoria?.toLowerCase().includes(q) ||
        item.talla?.toLowerCase().includes(q) ||
        item.color?.toLowerCase().includes(q) ||
        item.proveedor?.toLowerCase().includes(q)
      )
    }

    // 2. Ordenar
    if (sortConfig.key) {
      result.sort((a, b) => {
        // Manejo de nulos
        const valA = a[sortConfig.key] || ''
        const valB = b[sortConfig.key] || ''

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [stock, search, sortConfig])

  // ✅ Helper para icono de ordenamiento
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <i className="bi bi-arrow-down-up text-muted ms-1" style={{ fontSize: '0.8em' }}></i>
    return sortConfig.direction === 'asc'
      ? <i className="bi bi-sort-down-alt text-primary ms-1"></i>
      : <i className="bi bi-sort-up text-primary ms-1"></i>
  }

  return (
    <div className="container-fluid py-0">
      {/* Título y subtítulo */}
      <div className="mb-3">
        <h4 className="mb-1">
          <i className="bi bi-cart-fill me-2"></i>
          Stock
        </h4>
        <small className="text-muted">
          Visor de Stock de Productos
        </small>
      </div>

      <div className="card shadow-sm">
        {/* ✅ Barra de búsqueda y contador */}
        <div className="card-header bg-white py-3">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-2 mb-md-0">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 bg-light"
                  placeholder="Buscar por producto, marca, categoría, color..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    className="btn btn-outline-secondary border-start-0 bg-light"
                    onClick={() => setSearch('')}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <span className="badge bg-primary rounded-pill">
                {loading ? '...' : filteredStock.length} {filteredStock.length === 1 ? 'producto' : 'productos'} encontrados
              </span>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {/* Show error if exists */}
          {error && (
            <div className="alert alert-danger m-3" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              <Error message={error} />
            </div>
          )}

          {/* Show loading only in table area */}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
              <div className="text-center">
                <Spinner size="3rem" />
                <p className="mt-3 text-muted">Cargando stock...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Vista escritorio/tablet */}
              <div className="d-none d-md-block" style={{ overflowY: 'auto', maxHeight: '60vh' }}>
            <div className="table-responsive pe-3 pb-3 pt-0 px-3">
              <table className="table table-hover align-middle" style={{ minWidth: 900 }}>
                <thead className="table-light sticky-top">
                  <tr>
                    <th onClick={() => handleSort('idListaProducto')} style={{ cursor: 'pointer' }}>
                      ID {getSortIcon('idListaProducto')}
                    </th>
                    <th onClick={() => handleSort('nombreProducto')} style={{ cursor: 'pointer' }}>
                      Producto {getSortIcon('nombreProducto')}
                    </th>
                    <th onClick={() => handleSort('categoria')} style={{ cursor: 'pointer' }}>
                      Categoría {getSortIcon('categoria')}
                    </th>
                    <th onClick={() => handleSort('marca')} style={{ cursor: 'pointer' }}>
                      Marca {getSortIcon('marca')}
                    </th>
                    <th onClick={() => handleSort('talla')} style={{ cursor: 'pointer' }}>
                      Talla {getSortIcon('talla')}
                    </th>
                    <th onClick={() => handleSort('color')} style={{ cursor: 'pointer' }}>
                      Color {getSortIcon('color')}
                    </th>
                    <th onClick={() => handleSort('cantidad')} style={{ cursor: 'pointer' }}>
                      Cantidad {getSortIcon('cantidad')}
                    </th>
                    <th onClick={() => handleSort('precioUnitario')} style={{ cursor: 'pointer' }}>
                      Precio Unitario {getSortIcon('precioUnitario')}
                    </th>
                    <th onClick={() => handleSort('proveedor')} style={{ cursor: 'pointer' }}>
                      Proveedor {getSortIcon('proveedor')}
                    </th>
                    <th style={{ width: 140 }}>Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStock.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center text-muted py-4">
                        <i className="bi bi-search display-4 d-block mb-2"></i>
                        No se encontraron resultados
                      </td>
                    </tr>
                  ) : (
                    filteredStock.map(item => {
                      const id = item.id
                      const isExpanded = expandedId === id
                      return (
                        <React.Fragment key={id}>
                          <tr style={{ cursor: 'pointer' }} onClick={() => setExpandedId(isExpanded ? null : id)}>
                            <td className="text-muted">{id}</td>
                            <td>
                              <strong>{item.nombreProducto || '-'}</strong>
                            </td>
                            <td>
                              <span className="">
                                {item.categoria || '—'}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-info">
                                {item.marca || '—'}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-secondary">{item.talla || '-'}</span>
                            </td>
                            <td>
                              <span className="badge" style={getColorStyle(item.color)}>
                                {item.color || '-'}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-primary rounded-pill px-3">
                                {item.cantidad || 0}
                              </span>
                            </td>
                            <td>
                              <span className="fw-bold text-secondary">
                                {formatCurrency(item.precioUnitario)}
                              </span>
                            </td>
                            <td>
                              <span className="fw-semibold text-truncate" style={{ maxWidth: '180px' }}>
                                {item.proveedor || 'Sin proveedor'}
                              </span>
                            </td>
                            <td>
                              <button
                                className={`btn btn-sm ${isExpanded ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={e => {
                                  e.stopPropagation()
                                  setExpandedId(isExpanded ? null : id)
                                }}
                              >
                                <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                                {isExpanded ? 'Ocultar' : 'Ver'}
                              </button>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr className="bg-light">
                              <td colSpan={10} className="p-0">
                                <div className="p-4 border-top border-2 border-primary">
                                  <h6 className="mb-3 text-primary">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Detalles del producto
                                  </h6>
                                  <ul className="mb-0">
                                    <li><strong>ID:</strong> {item.idListaProducto}</li>
                                    <li><strong>Proveedor:</strong> {item.proveedor}</li>
                                    <li><strong>Precio Unitario:</strong> {formatCurrency(item.precioUnitario)}</li>
                                    <li><strong>Cantidad en stock:</strong> {item.cantidad}</li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Vista móvil */}
          <div className="d-block d-md-none p-3">
            {filteredStock.length === 0 ? (
              <div className="text-center text-muted py-5">
                <i className="bi bi-search fs-1 d-block mb-3 text-secondary"></i>
                <p className="mb-0">No se encontraron resultados</p>
              </div>
            ) : (
              filteredStock.map(item => {
                const id = item.id
                const isExpanded = expandedId === id
                return (
                  <div key={id} className="card mb-3 shadow-sm">
                    <div className="card-header bg-light py-2 d-flex justify-content-between align-items-center">
                      <span className="badge bg-secondary rounded-pill">#{id}</span>
                      <span className="fw-bold text-success">{formatCurrency(item.precioUnitario)}</span>
                    </div>
                    <div className="card-body p-3">
                      <div className="fw-semibold text-primary mb-1">
                        <i className="bi bi-box-seam me-2"></i>
                        {item.nombreProducto || '-'}
                      </div>
                      <div className="mb-2">
                        <span className="badge bg-secondary me-1">{item.talla || '-'}</span>
                        <span className="badge" style={getColorStyle(item.color)}>
                          {item.color || '-'}
                        </span>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted">
                          <i className="bi bi-bookmark me-1"></i>
                          {item.marca} - {item.categoria}
                        </small>
                      </div>
                      <div className="mb-2">
                        <span className="badge bg-primary px-3">
                          {item.cantidad || 0} en stock
                        </span>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted">
                          <i className="bi bi-building me-1"></i>
                          {item.proveedor || 'Sin proveedor'}
                        </small>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className={`btn btn-sm flex-fill ${isExpanded ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setExpandedId(isExpanded ? null : id)}
                        >
                          <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} me-1`}></i>
                          {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
                        </button>
                      </div>
                      {isExpanded && (
                        <div className="mt-3 border-top pt-3">
                          <h6 className="mb-2 text-primary">
                            <i className="bi bi-info-circle me-2"></i>
                            Detalles del producto
                          </h6>
                          <ul className="mb-0">
                            <li><strong>ID:</strong> {item.idListaProducto}</li>
                            <li><strong>Proveedor:</strong> {item.proveedor}</li>
                            <li><strong>Precio Unitario:</strong> {formatCurrency(item.precioUnitario)}</li>
                            <li><strong>Cantidad en stock:</strong> {item.cantidad}</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
