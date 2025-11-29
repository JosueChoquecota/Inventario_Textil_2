import React, { useState, useEffect } from 'react'
import { obtenerClientes } from '../../../api/clientesApi'
import { obtenerTrabajadores } from '../../../api/trabajadoresApi'
import { obtenerProductos } from '../../../api/productosApi'
import { obtenerTallas } from '../../../api/tallasApi'
import { obtenerColores } from '../../../api/coloresApi'
import { toast } from 'react-toastify'

export default function ModalCrearVenta({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    idCliente: '',
    idTrabajador: '',
    fecha: new Date().toISOString().split('T')[0]
  })

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

  // Opciones de selects
  const [clientes, setClientes] = useState([])
  const [trabajadores, setTrabajadores] = useState([])
  const [productos, setProductos] = useState([])
  const [tallas, setTallas] = useState([])
  const [colores, setColores] = useState([])

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [clis, trabs, prods, tallasList, coloresList] = await Promise.all([
        obtenerClientes(),
        obtenerTrabajadores(),
        obtenerProductos(),
        obtenerTallas(),
        obtenerColores()
      ])
      setClientes(clis)
      setTrabajadores(trabs)
      setProductos(prods)
      setTallas(tallasList)
      setColores(coloresList)
    } catch (error) {
        console.error('Error cargando datos:', error)
      toast.error('Error al cargar los datos necesarios')
    } finally {
      setLoading(false)
    }
  }

  // Selección de producto
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
    const producto = productos.find(p => String(p.idProducto || p.id) === String(idProducto))
    if (producto) {
      setProductoActual({
        ...productoActual,
        idProducto: producto.idProducto || producto.id,
        nombreProducto: producto.nombre || 'Sin nombre',
        marcaProducto: producto.marca?.nombre || producto.marcaNombre || 'Sin marca',
        categoriaProducto: producto.categoria?.nombre || producto.categoriaNombre || 'Sin categoría'
      })
    }
  }

  // Selección de talla
  const handleTallaChange = (idTalla) => {
    if (!idTalla) {
      setProductoActual({ ...productoActual, idTalla: '', talla: '' })
      return
    }
    const talla = tallas.find(t => String(t.idTalla || t.id) === String(idTalla))
    if (talla) {
      setProductoActual({
        ...productoActual,
        idTalla: talla.idTalla || talla.id,
        talla: talla.talla || talla.nombre || talla.descripcion || 'Sin talla'
      })
    }
  }

  // Selección de color
  const handleColorChange = (idColor) => {
    if (!idColor) {
      setProductoActual({ ...productoActual, idColor: '', color: '' })
      return
    }
    const color = colores.find(c => String(c.idColor || c.id) === String(idColor))
    if (color) {
      setProductoActual({
        ...productoActual,
        idColor: color.idColor || color.id,
        color: color.color || color.nombre || color.descripcion || 'Sin color'
      })
    }
  }

  // Agregar producto a la venta
  const agregarProducto = () => {
    if (!productoActual.idProducto || !productoActual.idTalla || !productoActual.idColor) {
      toast.error('Debe seleccionar producto, talla y color')
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
    const yaAgregado = detalles.some(d =>
      String(d.idProducto) === String(productoActual.idProducto) &&
      String(d.idTalla) === String(productoActual.idTalla) &&
      String(d.idColor) === String(productoActual.idColor)
    )
    if (yaAgregado) {
      toast.error('Esta combinación de producto ya fue agregada')
      return
    }
    const subtotal = parseFloat(productoActual.precioUnitario) * parseInt(productoActual.cantidad)
    const nuevoDetalle = {
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

  // Eliminar producto
  const eliminarProducto = (index) => {
    setDetalles(detalles.filter((_, i) => i !== index))
    toast.info('Producto eliminado')
  }

  // Calcular totales
  const calcularTotales = () => {
    const totalProductos = detalles.length
    const totalUnidades = detalles.reduce((sum, d) => sum + d.cantidad, 0)
    const precioTotal = detalles.reduce((sum, d) => sum + d.subTotal, 0)
    return { totalProductos, totalUnidades, precioTotal }
  }
  const totales = calcularTotales()

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.idCliente) {
      toast.error('Debe seleccionar un cliente')
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
      const ventaData = {
        idCliente: parseInt(formData.idCliente),
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
      await onCreate(ventaData)
      toast.success('Venta registrada exitosamente')
      onClose()
    } catch (error) {
      toast.error(error.message || 'Error al registrar la venta')
    } finally {
      setSubmitting(false)
    }
  }

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

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">
              <i className="bi bi-cash-coin me-2"></i>
              Registrar Venta
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
                    {/* Cliente */}
                    <div className="col-12 col-md-6">
                      <label className="form-label">
                        Cliente <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={formData.idCliente}
                        onChange={(e) => setFormData({ ...formData, idCliente: e.target.value })}
                        required
                      >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map(c => {
                          const nombre = c.nombres || c.nombre || c.razonSocial || 'Sin nombre'
                          const doc = c.documento || c.nDocumento || c.ruc || 'Sin documento'
                          return (
                            <option key={c.idCliente || c.id} value={c.idCliente || c.id}>
                              {nombre} - {doc}
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
                        Fecha de Venta <span className="text-danger">*</span>
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
              className="btn btn-success"
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
                  Guardar Venta
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

