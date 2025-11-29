const API_URL = "http://localhost:8081/api/v1/tallas";

export const obtenerTallas = async () => { 
    const response = await fetch(`${API_URL}/listar`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json();
};

export const registrarTalla = async (talla) => {
    const response = await fetch(`${API_URL}/registrar`, {  
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(talla)
    });
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json();
};
export const actualizarTalla = async (id, talla) => {
    const response = await fetch(`${API_URL}/actualizar/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(talla),
    });
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json();
};
export const eliminarTalla = async (id) => {
    const response = await fetch(`${API_URL}/eliminar/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    });
    
    if (!response.ok) throw new Error(`Error ${response.status}`)
    
    const contentType = response.headers.get('content-type')
    const text = await response.text()
    
    if (!text || text.trim() === '') {
        return { success: true, id }
    }
    
    if (contentType && contentType.includes('application/json')) {
        return JSON.parse(text)
    }
    
    return { success: true, message: text }
};