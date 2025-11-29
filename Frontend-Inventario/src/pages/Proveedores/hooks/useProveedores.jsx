import { useCRUD } from '../../../hooks/useCRUD'
import { 
  obtenerProveedores, 
  registrarProveedor, 
  eliminarProveedor, 
  actualizarProveedor 
} from '../../../api/proveedoresApi'

const normalizeProveedor = (p) => ({
  id: p.id ?? p.idProveedor,
  nombres: p.nombres ?? p.nombre ?? '',
  apellidos: p.apellidos ?? p.apellido ?? '',
  tipoDocumento: p.tipoDocumento ?? p.tipodocumento ?? 'DNI',
  nDocumento: p.nDocumento ?? 'No hay DNI',
  telefono: p.telefono ?? '',
  direccion: p.direccion ?? ''
})

export function useProveedores() {
  const { 
    data, 
    loading, 
    error, 
    refresh, 
    add, 
    update, 
    delete: deleteItem 
  } = useCRUD({
    fetchAll: obtenerProveedores,
    create: registrarProveedor,
    update: actualizarProveedor,
    remove: eliminarProveedor,
    normalize: normalizeProveedor
  })

  return {
    data,
    loading,
    error,
    onRefresh: refresh,
    addProveedor: add,
    updateProveedor: update,
    deleteProveedor: deleteItem
  }
}