import React, { useState, useEffect } from 'react'
import { obtenerProveedores } from '../../../api/proveedoresApi'
import { obtenerTrabajadores } from '../../../api/trabajadoresApi'
import { obtenerProductos } from '../../../api/productosApi'
import { obtenerTallas } from '../../../api/tallasApi'
import { obtenerColores } from '../../../api/coloresApi'
import { toast } from 'react-toastify'

export default function ModalCrearCompra({ onClose, onCreate }) {
  // ========================================
  // ESTADO DEL FORMULARIO
  // ========================================
  const [formData, setFormData] = useState({
    idProveedor: '',
    idTrabajador: '',
    fecha: new Date().toISOString().split('T')[0]
  })

  // ========================================
  // ESTADO DE PRODUCTOS
  // ========================================
  const [detalles, setDetalles] = useState([])
  const [productoActual, setProductoActual] = useState({
    idProducto: '',
    idTalla: '',
    idColor: '',
    nombreProducto: '',
    marcaProducto: '',
    categoriaProducto: '',
    talla: '',
    color: '',
    precioUnitario: '',
    cantidad: 1
  })

  // ========================================
  // OPCIONES DE SELECTS
  // ========================================
  const [proveedores, setProveedores] = useState([])
  const [trabajadores, setTrabajadores] = useState([])
  const [productos, setProductos] = useState([])
  const [tallas, setTallas] = useState([])
  const [colores, setColores] = useState([])

  // ========================================
  // ESTADOS DE CARGA
  // ========================================
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // ========================================
  // CARGAR DATOS INICIALES
  // ========================================
  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {

      setLoading(true)
      const [provs, trabs, prods, tallasList, coloresList] = await Promise.all([
        obtenerProveedores(),
        obtenerTrabajadores(),
        obtenerProductos(),
        obtenerTallas(),
        obtenerColores()
      ])
      setProveedores(provs)
      setTrabajadores(trabs)
      setProductos(prods)
      setTallas(tallasList)
      setColores(coloresList)

  }

  // ========================================
  // MANEJAR SELECCIÓN DE PRODUCTO
  // ========================================
  const handleProductoChange = (idProducto) => {
    if (!idProducto) {
      setProductoActual({
        ...productoActual,
        idProducto: '',
        nombreProducto: '',
        marcaProducto: '',
        categoriaProducto: ''
      })
      return
    }

    const producto = productos.find(p => 
      String(p.idProducto || p.id) === String(idProducto)
    )

    if (producto) {
      // ✅ Extraer datos de forma segura
      const nombre = producto.nombre || 'Sin nombre'
      const marca = producto.marca?.nombre || producto.marcaNombre || 'Sin marca'
      const categoria = producto.categoria?.nombre || producto.categoriaNombre || 'Sin categoría'

      setProductoActual({
        ...productoActual,
        idProducto: producto.idProducto || producto.id,
        nombreProducto: nombre,
        marcaProducto: marca,
        categoriaProducto: categoria
      })
    }
  }

  // ========================================
  // MANEJAR SELECCIÓN DE TALLA
  // ========================================
  const handleTallaChange = (idTalla) => {
    if (!idTalla) {
      setProductoActual({ ...productoActual, idTalla: '', talla: '' })
      return
    }

    const talla = tallas.find(t => 
      String(t.idTalla || t.id) === String(idTalla)
    )

    if (talla) {
      setProductoActual({
        ...productoActual,
        idTalla: talla.idTalla || talla.id,
        talla: talla.talla || talla.nombre || talla.descripcion || 'Sin talla'
      })
    }
  }

  // ========================================
  // MANEJAR SELECCIÓN DE COLOR
  // ========================================
  const handleColorChange = (idColor) => {
    if (!idColor) {
      setProductoActual({ ...productoActual, idColor: '', color: '' })
      return
    }

    const color = colores.find(c => 
      String(c.idColor || c.id) === String(idColor)
    )

    if (color) {
      setProductoActual({
        ...productoActual,
        idColor: color.idColor || color.id,
        color: color.color || color.nombre || color.descripcion || 'Sin color'
      })
    }
  }

  // ========================================
  // BUSCAR idListaProducto
  // ========================================
  const buscarIdListaProducto = async () => {
    // Aquí deberías llamar a un endpoint que busque el idListaProducto
    // basándose en idProducto + idTalla + idColor
    // Por ahora, generamos un ID temporal
    return Date.now()
  }

  // ========================================
  // AGREGAR PRODUCTO A LA LISTA
  // ========================================
  const agregarProducto = async () => {
    // Validaciones
    if (!productoActual.idProducto) {
      toast.error('Debe seleccionar un producto')
      return
    }
    if (!productoActual.idTalla) {
      toast.error('Debe seleccionar una talla')
      return
    }
    if (!productoActual.idColor) {
      toast.error('Debe seleccionar un color')
      return
    }
    if (!productoActual.precioUnitario || parseFloat(productoActual.precioUnitario) <= 0) {
      toast.error('Debe ingresar un precio válido')
      return
    }
    if (!productoActual.cantidad || parseInt(productoActual.cantidad) <= 0) {
      toast.error('Debe ingresar una cantidad válida')
      return
    }

    // Verificar si ya está agregado (misma combinación)
    const yaAgregado = detalles.some(d => 
      String(d.idProducto) === String(productoActual.idProducto) &&
      String(d.idTalla) === String(productoActual.idTalla) &&
      String(d.idColor) === String(productoActual.idColor)
    )
    if (yaAgregado) {
      toast.error('Esta combinación de producto ya fue agregada')
      return
    }

    // Calcular subtotal
    const subtotal = parseFloat(productoActual.precioUnitario) * parseInt(productoActual.cantidad)

    // Buscar o generar idListaProducto
    const idListaProducto = await buscarIdListaProducto()

    // Agregar a la lista
    const nuevoDetalle = {
      idListaProducto,
      idProducto: productoActual.idProducto,
      idTalla: productoActual.idTalla,
      idColor: productoActual.idColor,
      nombreProducto: productoActual.nombreProducto,
      marcaProducto: productoActual.marcaProducto,
      categoriaProducto: productoActual.categoriaProducto,
      talla: productoActual.talla,
      color: productoActual.color,
      precioUnitario: parseFloat(productoActual.precioUnitario),
      cantidad: parseInt(productoActual.cantidad),
      subTotal: subtotal
    }

    setDetalles([...detalles, nuevoDetalle])

    // Limpiar formulario de producto
    setProductoActual({
      idProducto: '',
      idTalla: '',
      idColor: '',
      nombreProducto: '',
      marcaProducto: '',
      categoriaProducto: '',
      talla: '',
      color: '',
      precioUnitario: '',
      cantidad: 1
    })

    toast.success('Producto agregado')
  }

  // ========================================
  // ELIMINAR PRODUCTO DE LA LISTA
  // ========================================
  const eliminarProducto = (index) => {
    const nuevosDetalles = detalles.filter((_, i) => i !== index)
    setDetalles(nuevosDetalles)
    toast.info('Producto eliminado')
  }

  // ========================================
  // CALCULAR TOTALES
  // ========================================
  const calcularTotales = () => {
    const totalProductos = detalles.length
    const totalUnidades = detalles.reduce((sum, d) => sum + d.cantidad, 0)
    const precioTotal = detalles.reduce((sum, d) => sum + d.subTotal, 0)

    return { totalProductos, totalUnidades, precioTotal }
  }

  const totales = calcularTotales()

  // ========================================
  // ENVIAR FORMULARIO
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones
    if (!formData.idProveedor) {
      toast.error('Debe seleccionar un proveedor')
      return
    }
    if (!formData.idTrabajador) {
      toast.error('Debe seleccionar un trabajador')
      return
    }
    if (detalles.length === 0) {
      toast.error('Debe agregar al menos un producto')
      return
    }

    try {
      setSubmitting(true)

      const compraData = {
        idProveedor: parseInt(formData.idProveedor),
        idTrabajador: parseInt(formData.idTrabajador),
        fecha: formData.fecha,
        precioTotal: totales.precioTotal,
        detalles: detalles.map(d => ({
          idProducto: parseInt(d.idProducto),
          idTalla: parseInt(d.idTalla),
          idColor: parseInt(d.idColor),
          precioUnitario: parseFloat(d.precioUnitario),
          cantidad: parseInt(d.cantidad),
          subTotal: parseFloat(d.subTotal)
        }))
      }

      await onCreate(compraData)
      toast.success('Compra registrada exitosamente')
      onClose()
    } catch (error) {
      toast.error(error.message || 'Error al registrar la compra')
    } finally {
      setSubmitting(false)
    }
  }

  // ========================================
  // LOADING STATE
  // ========================================
  if (loading) {
    return (
      <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Cargando datos...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // RENDER PRINCIPAL
  // ========================================
  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="bi bi-cart-plus me-2"></i>
              Registrar Compra
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              disabled={submitting}
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* SECCIÓN 1: DATOS GENERALES */}
              <div className="card mb-3">
                <div className="card-header bg-light">
                  <h6 className="mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    Datos Generales
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    {/* Proveedor */}
                    <div className="col-12 col-md-6">
                      <label className="form-label">
                        Proveedor <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={formData.idProveedor}
                        onChange={(e) => setFormData({ ...formData, idProveedor: e.target.value })}
                        required
                      >
                        <option value="">Seleccione un proveedor</option>
                        {proveedores.map(p => {
                          const nombre = p.nombre || p.nombres || p.razonSocial || 'Sin nombre'
                          const doc = p.documento || p.nDocumento || p.ruc || 'Sin documento'
                          const tipoDoc = p.tipoDocumento?.tipo || p.tipoDocumento || 'Doc'
                          
                          return (
                            <option key={p.idProveedor || p.id} value={p.idProveedor || p.id}>
                              {nombre} - {tipoDoc}: {doc}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Trabajador */}
                    <div className="col-12 col-md-6">
                      <label className="form-label">
                        Trabajador <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={formData.idTrabajador}
                        onChange={(e) => setFormData({ ...formData, idTrabajador: e.target.value })}
                        required
                      >
                        <option value="">Seleccione un trabajador</option>
                        {trabajadores.map(t => {
                          const nombres = t.nombres || t.nombre || ''
                          const apellidos = t.apellidos || t.apellido || ''
                          const nombreCompleto = `${nombres} ${apellidos}`.trim() || 'Sin nombre'
                          
                          return (
                            <option key={t.idTrabajador || t.id} value={t.idTrabajador || t.id}>
                              {nombreCompleto}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Fecha */}
                    <div className="col-12 col-md-6">
                      <label className="form-label">
                        Fecha de Compra <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        max={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: AGREGAR PRODUCTOS */}
              <div className="card mb-3">
                <div className="card-header bg-light">
                  <h6 className="mb-0">
                    <i className="bi bi-box-seam me-2"></i>
                    Agregar Productos
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    {/* Producto */}
                    <div className="col-12 col-md-4">
                      <label className="form-label">
                        Producto/Modelo <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={productoActual.idProducto}
                        onChange={(e) => handleProductoChange(e.target.value)}
                      >
                        <option value="">Seleccione un producto</option>
                        {productos.map(p => {
                          const nombre = p.nombre || 'Sin nombre'
                          const marca = p.marca?.nombre || p.marcaNombre || 'Sin marca'
                          
                          return (
                            <option key={p.idProducto || p.id} value={p.idProducto || p.id}>
                              {nombre} - {marca}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Talla */}
                    <div className="col-6 col-md-2">
                      <label className="form-label">
                        Talla <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={productoActual.idTalla}
                        onChange={(e) => handleTallaChange(e.target.value)}
                      >
                        <option value="">Seleccione</option>
                        {tallas.map(t => {
                          const talla = t.talla || t.nombre || t.descripcion || 'Sin talla'
                          
                          return (
                            <option key={t.idTalla || t.id} value={t.idTalla || t.id}>
                              {talla}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Color */}
                    <div className="col-6 col-md-2">
                      <label className="form-label">
                        Color <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={productoActual.idColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                      >
                        <option value="">Seleccione</option>
                        {colores.map(c => {
                          const color = c.color || c.nombre || c.descripcion || 'Sin color'
                          
                          return (
                            <option key={c.idColor || c.id} value={c.idColor || c.id}>
                              {color}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Precio Unitario */}
                    <div className="col-6 col-md-2">
                      <label className="form-label">Precio Unit.</label>
                      <div className="input-group">
                        <span className="input-group-text">S/</span>
                        <input
                          type="number"
                          className="form-control"
                          value={productoActual.precioUnitario}
                          onChange={(e) => setProductoActual({ ...productoActual, precioUnitario: e.target.value })}
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Cantidad */}
                    <div className="col-6 col-md-2">
                      <label className="form-label">Cantidad</label>
                      <input
                        type="number"
                        className="form-control"
                        value={productoActual.cantidad}
                        onChange={(e) => setProductoActual({ ...productoActual, cantidad: e.target.value })}
                        min="1"
                        placeholder="1"
                      />
                    </div>

                    {/* Botón Agregar */}
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn btn-success w-100"
                        onClick={agregarProducto}
                      >
                        <i className="bi bi-plus-circle me-2"></i>
                        Agregar Producto
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 3: LISTA DE PRODUCTOS */}
              {detalles.length > 0 && (
                <div className="card mb-3">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="bi bi-list-check me-2"></i>
                      Productos Agregados ({detalles.length})
                    </h6>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Producto</th>
                            <th>Talla</th>
                            <th>Color</th>
                            <th className="text-end">P. Unit.</th>
                            <th className="text-center">Cant.</th>
                            <th className="text-end">Subtotal</th>
                            <th className="text-center">Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detalles.map((detalle, index) => (
                            <tr key={index}>
                              <td>
                                <div className="fw-semibold">{detalle.nombreProducto}</div>
                                <small className="text-muted">{detalle.marcaProducto}</small>
                              </td>
                              <td>
                                <span className="badge bg-secondary">{detalle.talla}</span>
                              </td>
                              <td>
                                <span className="badge bg-info text-dark">{detalle.color}</span>
                              </td>
                              <td className="text-end">S/ {detalle.precioUnitario.toFixed(2)}</td>
                              <td className="text-center">
                                <strong>{detalle.cantidad}</strong>
                              </td>
                              <td className="text-end">
                                <strong>S/ {detalle.subTotal.toFixed(2)}</strong>
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => eliminarProducto(index)}
                                  title="Eliminar"
                                >
                                  <i className="bi bi-trash-fill"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SECCIÓN 4: RESUMEN */}
              {detalles.length > 0 && (
                <div className="card bg-light">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-6 col-md-4 text-center">
                        <div className="fs-4 fw-bold text-primary">{totales.totalProductos}</div>
                        <small className="text-muted">Productos</small>
                      </div>
                      <div className="col-6 col-md-4 text-center">
                        <div className="fs-4 fw-bold text-info">{totales.totalUnidades}</div>
                        <small className="text-muted">Unidades</small>
                      </div>
                      <div className="col-12 col-md-4 text-center">
                        <div className="fs-3 fw-bold text-success">S/ {totales.precioTotal.toFixed(2)}</div>
                        <small className="text-muted">Total</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submitting || detalles.length === 0}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Guardando...
                </>
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>
                  Guardar Compra
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}