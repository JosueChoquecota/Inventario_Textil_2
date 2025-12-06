import React from 'react'
import { toast } from 'react-toastify'
import useVentaForm from '../hooks/useVentaForm'
import DatosGenerales from './DatosGenerales'
import ProductoSelector from './ProductoSelector'
import ListaProductos from './ListaProductos'
import ResumenVenta from './ResumenVenta'
import Spinner from '../../../components/Common/Spinner'

export default function ModalCrearVenta({ onClose, onCreate }) {
  const {
    // Estados
    formData,
    setFormData,
    detalles,
    productoActual,
    setProductoActual,
    clientes,
    trabajadores,
    productos,
    tallasFiltradas,
    coloresFiltradas,
    cantidadDisponible,
    loading,
    submitting,
    setSubmitting,
    
    // Funciones
    handleProductoChange,
    handleTallaChange,
    handleColorChange,
    agregarProducto,
    eliminarProducto,
    calcularTotales
  } = useVentaForm()

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
    return <Spinner fullScreen size="3rem" />
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
              <DatosGenerales 
                formData={formData}
                setFormData={setFormData}
                clientes={clientes}
                trabajadores={trabajadores}
              />

              {/* SECCIÓN 2: AGREGAR PRODUCTOS */}
              <ProductoSelector
                productoActual={productoActual}
                setProductoActual={setProductoActual}
                productos={productos}
                tallasFiltradas={tallasFiltradas}
                coloresFiltradas={coloresFiltradas}
                cantidadDisponible={cantidadDisponible}
                handleProductoChange={handleProductoChange}
                handleTallaChange={handleTallaChange}
                handleColorChange={handleColorChange}
                agregarProducto={agregarProducto}
              />

              {/* SECCIÓN 3: LISTA DE PRODUCTOS */}
              <ListaProductos 
                detalles={detalles}
                eliminarProducto={eliminarProducto}
              />

              {/* SECCIÓN 4: RESUMEN */}
              <ResumenVenta 
                totales={totales}
                detalles={detalles}
              />
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



