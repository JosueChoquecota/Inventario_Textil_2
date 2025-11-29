const API_URL = "http://localhost:8081/api/v1/categorias";

export const obtenerCategorias = async () => {
    const response = await fetch(`${API_URL}/listar`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}
export const registrarCategoria = async (categoria) => {
    const response = await fetch(`${API_URL}/registrar`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoria)
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}
export const actualizarCategoria = async (id, categoria) => {
    const response = await fetch(`${API_URL}/actualizar/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoria),
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}
export const eliminarCategoria = async (id) => {
    const response = await fetch(`${API_URL}/eliminar/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    
    if (!response.ok) throw new Error(`Error ${response.status}`);
    // No es necesario retornar nada si la eliminación fue exitosa
    if(response.status === 204) {
        return { success: true, message: 'Categoría eliminada correctamente' };
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    const text = await response.text();
    return { success: true, message: text || 'Categoría eliminada' };

}