import { useMemo } from 'react';

/**
 * Hook para filtrar productos del inventario
 */
export function useInventarioFilter(data, search, categoriaFilter, marcaFilter) {
  
  // ✅ Obtener categorías únicas ordenadas
  const categorias = useMemo(() => {
    if (!data || data.length === 0) return []
    
    const cats = new Set()
    data.forEach(producto => {
      if (producto.categoria?.nombre) {
        cats.add(producto.categoria.nombre)
      }
    })
    
    return Array.from(cats).sort((a, b) => a.localeCompare(b, 'es'))
  }, [data])

  // ✅ Obtener marcas únicas ordenadas
  const marcas = useMemo(() => {
    if (!data || data.length === 0) return []
    
    const marcasSet = new Set()
    data.forEach(producto => {
      const marcaNombre = producto.marca?.marca || producto.marca?.nombre
      if (marcaNombre) {
        marcasSet.add(marcaNombre)
      }
    })
    
    return Array.from(marcasSet).sort((a, b) => a.localeCompare(b, 'es'))
  }, [data])

  // ✅ Filtrar productos
  const filtered = useMemo(() => {
    if (!data || data.length === 0) return []

    return data.filter(producto => {
      // Filtro de búsqueda
      const q = search.trim().toLowerCase()
      if (q) {
        const searchIn = [
          String(producto.idProducto || producto.id),
          producto.nombre,
          producto.descripcion,
          producto.categoria?.nombre,
          producto.marca?.marca || producto.marca?.nombre
        ].filter(Boolean).join(' ').toLowerCase()
        
        if (!searchIn.includes(q)) return false
      }
      
      // Filtro de categoría
      if (categoriaFilter && categoriaFilter !== '') {
        if (producto.categoria?.nombre !== categoriaFilter) return false
      }
      
      // Filtro de marca
      if (marcaFilter && marcaFilter !== '') {
        const marcaNombre = producto.marca?.marca || producto.marca?.nombre
        if (marcaNombre !== marcaFilter) return false
      }
      
      return true
    })
  }, [data, search, categoriaFilter, marcaFilter])

  return { filtered, categorias, marcas }
}
