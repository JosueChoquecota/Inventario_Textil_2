const API_URL= "http://localhost:8081/api/v1/ventas";

export const obtenerVentas = async () => {
    const response = await fetch(`${API_URL}/listar`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok)  throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export const registrarVenta = async (venta) => {
    try {
        console.log('📤 Enviando al backend:', venta)

        const response = await fetch(`${API_URL}/registrar`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(venta)
        });
        if (!response.ok)  throw new Error(`Error: ${response.status} ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Error al registrar la venta:', error);
        throw error;
    }
}

export const actualizarVenta = async (id, venta) => {
    const response = await fetch(`${API_URL}/actualizar/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(venta)
    });
    if (!response.ok)  throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}
export const eliminarVenta = async (id) => {
    const response = await fetch(`${API_URL}/eliminar/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    // ✅ Solo intenta leer JSON si hay contenido
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}
