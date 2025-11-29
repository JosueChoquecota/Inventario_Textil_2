import { useMemo } from 'react'

/**
 * Hook para filtrar clientes
 */
export function useClientesFilter(data, search, docTypeFilter) {
  // ✅ Obtener tipos de documento únicos
  const docTypes = useMemo(() => {
    if (!data || data.length === 0) return []
    
    const types = new Set()
    data.forEach(cliente => {
      const doc = cliente.nDocumento || ''
      const cleanDoc = String(doc).replace(/\D/g, '')
      
      if (cleanDoc.length === 8) types.add('DNI')
      else if (cleanDoc.length === 11) types.add('RUC')
      else if (cleanDoc) types.add('OTRO')
    })
    
    return Array.from(types).sort()
  }, [data])

  // ✅ Filtrar clientes
  const filtered = useMemo(() => {
    if (!data || data.length === 0) return []

    return data.filter(cliente => {
      // Filtro de búsqueda
      const q = search.trim().toLowerCase()
      if (q) {
        const searchIn = [
          String(cliente.idCliente),
          cliente.nombres,
          cliente.apellidos,
          cliente.nDocumento,
          cliente.telefono,
          cliente.correo,
          cliente.direccion
        ].filter(Boolean).join(' ').toLowerCase()

        if (!searchIn.includes(q)) return false
      }

      // Filtro de tipo de documento
      if (docTypeFilter && docTypeFilter !== '') {
        const doc = cliente.nDocumento || ''
        const cleanDoc = String(doc).replace(/\D/g, '')
        
        let docType = ''
        if (cleanDoc.length === 8) docType = 'DNI'
        else if (cleanDoc.length === 11) docType = 'RUC'
        else if (cleanDoc) docType = 'OTRO'

        if (docTypeFilter === 'OTRO') {
          if (docType !== 'OTRO') return false
        } else {
          if (docType !== docTypeFilter) return false
        }
      }

      return true
    })
  }, [data, search, docTypeFilter])

  return { filtered, docTypes }
}