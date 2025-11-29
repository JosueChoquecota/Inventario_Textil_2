import { useState, useEffect } from 'react'
import {
    obtenerCompras,
    registrarCompra,
    eliminarCompra
} from "../../../api/comprasApi"
import { toast } from 'react-toastify'

/**
 * Normalizar datos de compra
 */
const normalizeCompra = (c) => ({
    idCompra: c.idCompra || c.id_compra || c.id,
    fecha: c.fecha || new Date().toISOString().split('T')[0],
    precioTotal: parseFloat(c.precioTotal || 0),
    
    // Proveedor
    idProveedor: c.idProveedor || 0,
    nombreProveedor: c.nombreProveedor || "Sin proveedor",
    documentoProveedor: c.documentoProveedor || "",
    tipoDocumentoProveedor: c.tipoDocumentoProveedor || "",
    
    // Trabajador
    idTrabajador: c.idTrabajador || 0,
    nombreCompletoTrabajador: c.nombreCompletoTrabajador || "Sin trabajador",
    
    // Detalles
    detalles: Array.isArray(c.detalles) ? c.detalles : [],
    
    // Totales
    totalProductos: c.totalProductos || c.detalles?.length || 0,
    totalUnidades: c.totalUnidades || 0
})

/**
 * Hook personalizado para gestionar compras
 */
export function useCompras() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // ========================================
    // CARGAR COMPRAS
    // ========================================
    const loadData = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await obtenerCompras()
            const normalized = response.map(normalizeCompra)
            setData(normalized)
        } catch (err) {
            console.error('Error al cargar compras:', err)
            setError(err.message || 'Error al cargar compras')
            toast.error('Error al cargar compras')
        } finally {
            setLoading(false)
        }
    }

    // ========================================
    // CARGAR AL MONTAR
    // ========================================
    useEffect(() => {
        loadData()
    }, [])

    // ========================================
    // CREAR COMPRA
    // ========================================
    const addCompra = async (compraData) => {
        try {
            await registrarCompra(compraData)
            await loadData() // Recargar datos
        } catch (err) {
            console.error('Error al crear compra:', err)
            throw err
        }
    }

    // ========================================
    // ELIMINAR COMPRA
    // ========================================
    const deleteCompra = async (id) => {
        try {
            await eliminarCompra(id)
            await loadData() // Recargar datos
            toast.success('Compra eliminada exitosamente')
        } catch (err) {
            console.error('Error al eliminar compra:', err)
            toast.error(err.message || 'Error al eliminar compra')
            throw err
        }
    }

    return {
        data,
        loading,
        error,
        onRefresh: loadData,
        addCompra,
        deleteCompra
    }
}