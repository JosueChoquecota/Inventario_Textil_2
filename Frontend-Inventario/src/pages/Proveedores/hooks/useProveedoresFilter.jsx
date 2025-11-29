import { useMemo } from 'react'

export function useProveedoresFilter(data, search, tipoFilter) {
  const filtered = useMemo(() => {
    if (!data || data.length === 0) return []

    return data.filter(proveedor => {
      const q = search.trim().toLowerCase()
      
      // 🔍 Filtro de búsqueda general
      if (q) {
        const searchableText = [
          proveedor.razonSocial,
          proveedor.ruc,
          proveedor.nombreComercial,
          proveedor.contacto,
          proveedor.telefono,
          proveedor.correo,
          proveedor.direccion
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        if (!searchableText.includes(q)) {
          return false
        }
      }

      // 🏷️ Filtro por tipo de proveedor
      if (tipoFilter && tipoFilter !== '') {
        if (proveedor.tipoProveedor !== tipoFilter) {
          return false
        }
      }

      return true
    })
  }, [data, search, tipoFilter])

  return { filtered }
}