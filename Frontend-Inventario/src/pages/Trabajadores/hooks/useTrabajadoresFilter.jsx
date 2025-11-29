import { useMemo } from 'react'

export function useTrabajadoresFilter(data, search, roleFilter, showInactive) {
  
  const getRoleName = (idRol) => {
    const roles = {
      1: 'Administrador',
      2: 'Vendedor',
      3: 'Almacenero'
    }
    return roles[idRol] || ''
  }

  // Lista de roles únicos
  const roles = useMemo(() => {
    const set = new Set(
      data.map(t => getRoleName(t.idRol)).filter(Boolean)
    )
    return Array.from(set)
  }, [data])

  // Trabajadores filtrados
  const filtered = useMemo(() => {
    return data.filter(t => {
      // Filtro por estado
      if (!showInactive && !t.estado) return false

      // Filtro por búsqueda
      const q = search.trim().toLowerCase()
      if (q) {
        const roleName = getRoleName(t.idRol)
        const matchText =
          String(t.id).includes(q) ||
          (t.nombres + ' ' + t.apellidos).toLowerCase().includes(q) ||
          (t.apellidos + ' ' + t.nombres).toLowerCase().includes(q) ||
          (t.nDocumento || '').toLowerCase().includes(q) ||
          (t.telefono || '').toLowerCase().includes(q) ||
          (t.correo || '').toLowerCase().includes(q) ||
          roleName.toLowerCase().includes(q)
        if (!matchText) return false
      }
      
      // Filtro por rol
      if (roleFilter && roleFilter !== '') {
        return getRoleName(t.idRol) === roleFilter
      }
      
      return true
    })
  }, [data, search, roleFilter, showInactive])

  return { filtered, roles, getRoleName }
}