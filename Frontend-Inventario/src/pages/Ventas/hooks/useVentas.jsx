import { useState, useEffect } from 'react'
import {
    obtenerVentas,
    registrarVenta,
    eliminarVenta,
} from '../../../api/ventasApi'
import { toast } from 'react-toastify'


const normalizeVenta = (v) => ({
    idVenta: v.idVenta || v.id_venta || v.id,
    fecha: v.fecha || new Date().toISOString().split('T')[0],
    precioTotal: parseFloat(v.precioTotal || 0),

    // Cliente
    idCliente: v.idCliente || 0,
    nombreCliente: v.nombreCliente || 'Sin cliente',
    documentoCliente: v.documentoCliente || '',
    tipoDocumentoCliente: v.tipoDocumentoCliente || '',

    // Trabajador
    idTrabajador: v.idTrabajador || 0,
    nombreCompletoTrabajador: v.nombreCompletoTrabajador || 'Sin trabajador',

    // Detalles
    detalles: Array.isArray(v.detalles) ? v.detalles : [],

    // Totales
    totalProductos: v.totalProductos || v.detalles?.length || 0,
    totalUnidades: v.totalUnidades || 0,
})


export function useVentas() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadData = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await obtenerVentas()
            const normalized = response.map(normalizeVenta)
            setData(normalized)
        } catch (err) {
            setError(err.message || 'Error al cargar ventas')
            toast.error('Error al cargar ventas')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const addVenta = async (ventaData) => {
        try {
            await registrarVenta(ventaData)
            await loadData()
            toast.success('Venta registrada con éxito')
        } catch (err) {
            console.error('Error al registrar venta:', err)
            toast.error(err.message || 'Error al registrar venta')
            throw err
        }
    }
    const deleteVenta = async (id) => {
        try {
            await eliminarVenta(id)
            await loadData()
            toast.success('Venta eliminada con éxito')
        } catch (err) {
            console.error('Error al eliminar venta:', err)
            toast.error('Error al eliminar venta')
            throw err
        }
    }

    return {
        data,
        loading,
        error,
        onRefresh: loadData,
        addVenta,
        deleteVenta,
    }
}