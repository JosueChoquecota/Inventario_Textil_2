import { useState, useEffect } from 'react'
import { obtenerClientes } from '../../../api/clientesApi'
import { obtenerTrabajadores } from '../../../api/trabajadoresApi'
import { obtenerProductosConStock } from '../../../api/productosApi'
import { obtenerTallas } from '../../../api/tallasApi'
import { obtenerColores } from '../../../api/coloresApi'
import { toast } from 'react-toastify'

export default function useVentaForm() {
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
  
  // Filtrados y stock
  const [tallasFiltradas, setTallasFiltradas] = useState([])
  const [coloresFiltradas, setColoresFiltradas] = useState([])
  const [cantidadDisponible, setCantidadDisponible] = useState(null)

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
        obtenerProductosConStock(),
        obtenerTallas(),
        obtenerColores()
        
      ])
      setClientes(clis)
      setTrabajadores(trabs)
      setProductos(prods)
      setTallas(tallasList)
      setColores(coloresList)
      
      // Debug: Ver datos cargados

    } catch (error) {
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
        categoriaProducto: '',
        idTalla: '',
        idColor: '',
        talla: '',
        color: ''
      })
      setTallasFiltradas([])
      setColoresFiltradas([])
      setCantidadDisponible(null)
      return
    }
    const producto = productos.find(p => String(p.idProducto || p.id) === String(idProducto))
    if (producto) {
      const nombre = producto.nombre || 'Sin nombre'
      const marca = producto.marca?.nombre || producto.marcaNombre || 'Sin marca'
      const categoria = producto.categoria?.nombre || producto.categoriaNombre || 'Sin categoría'
      
      // Filtrar tallas y colores según el stock del producto
      const stock = producto.stock || []

      
      const tallasIds = [...new Set(stock.map(s => s.idTalla))]
      const coloresIds = [...new Set(stock.map(s => s.idColor))]
      

      
      const tallasFilt = tallas.filter(t => tallasIds.includes(t.idTalla || t.id))
      const coloresFilt = colores.filter(c => coloresIds.includes(c.idColor || c.id))
      

      
      setTallasFiltradas(tallasFilt)
      setColoresFiltradas(coloresFilt)
      setCantidadDisponible(null)
      
      setProductoActual({
        ...productoActual,
        idProducto: producto.idProducto || producto.id,
        nombreProducto: nombre,
        marcaProducto: marca,
        categoriaProducto: categoria,
        idTalla: '',
        idColor: '',
        talla: '',
        color: ''
      })
    }
  }

  // Selección de talla
  const handleTallaChange = (idTalla) => {
    if (!idTalla) {
      setProductoActual({ ...productoActual, idTalla: '', talla: '' })
      setColoresFiltradas([])
      setCantidadDisponible(null)
      return
    }
    const talla = tallas.find(t => String(t.idTalla || t.id) === String(idTalla))
    setProductoActual({
      ...productoActual,
      idTalla: talla?.idTalla || talla?.id || '',
      talla: talla?.talla || talla?.nombre || talla?.descripcion || 'Sin talla',
      idColor: '',
      color: ''
    })
    
    // Filtrar colores según el stock del producto y la talla
    const producto = productos.find(p => String(p.idProducto || p.id) === String(productoActual.idProducto))
    if (producto && producto.stock) {
      const coloresIds = [...new Set(producto.stock.filter(s => String(s.idTalla) === String(idTalla)).map(s => s.idColor))]
      setColoresFiltradas(colores.filter(c => coloresIds.includes(c.idColor || c.id)))
      setCantidadDisponible(null)
    }
  }

  // Selección de color
  const handleColorChange = (idColor) => {
    if (!idColor) {
      setProductoActual({ ...productoActual, idColor: '', color: '' })
      setCantidadDisponible(null)
      return
    }
    const color = colores.find(c => String(c.idColor || c.id) === String(idColor))
    setProductoActual({
      ...productoActual,
      idColor: color?.idColor || color?.id || '',
      color: color?.color || color?.nombre || color?.descripcion || 'Sin color'
    })
    
    // Buscar cantidad disponible para la combinación producto-talla-color
    const producto = productos.find(p => String(p.idProducto || p.id) === String(productoActual.idProducto))
    if (producto && producto.stock) {
      const stockItem = producto.stock.find(s => String(s.idTalla) === String(productoActual.idTalla) && String(s.idColor) === String(idColor))
      setCantidadDisponible(stockItem ? stockItem.cantidad : null)
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

  return {
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
  }
}