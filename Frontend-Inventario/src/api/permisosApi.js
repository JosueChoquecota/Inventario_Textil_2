const API_URL = 'http://localhost:8081/api/v1/permisos'

export const getRecursos = async () => {
    const response = await fetch(`${API_URL}/recursos`, {
        method: 'GET',
        credentials: 'include'
    })
    if (!response.ok) throw new Error('Error al cargar recursos')
    return response.json()
}

export const getPermisosPorRol = async (idRol) => {
    const response = await fetch(`${API_URL}/rol/${idRol}`, {
        method: 'GET',
        credentials: 'include'
    })
    if (!response.ok) throw new Error('Error al cargar permisos')
    return response.json()
}

export const savePermisos = async (idRol, permisos) => {
    const response = await fetch(`${API_URL}/rol/${idRol}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(permisos)
    })
    if (!response.ok) throw new Error('Error al guardar permisos')
    return response.json()
}

export const initRecursos = async () => {
    const response = await fetch(`${API_URL}/init`, {
        method: 'POST',
        credentials: 'include'
    })
    if (!response.ok) throw new Error('Error al inicializar recursos')
    return response.text()
}
