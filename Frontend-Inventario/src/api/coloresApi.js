const API_URL = "http://localhost:8081/api/v1/colores";

export const obtenerColores = async () => {
    const response = await fetch(`${API_URL}/listar`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}

export const registrarColor = async (color) => {
    const response = await fetch(`${API_URL}/registrar`, {
        method: 'POST', 
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(color)
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}
export const actualizarColor = async (id, color) => {
    const response = await fetch(`${API_URL}/actualizar/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(color),
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}
export const eliminarColor = async (id) => {
    const response = await fetch(`${API_URL}/eliminar/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}