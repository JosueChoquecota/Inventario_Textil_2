const API_URL = "http://localhost:8081/api/v1/compras";


export const obtenerCompras = async () => {
    const response = await fetch(`${API_URL}/listar`, {
        method: 'GET',
        credentials: 'include',
        
    });
    if (!response.ok)  throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}
export const registrarCompra = async (compra) => {
    try {
        console.log('📤 Enviando al backend:', compra)
        
        const response = await fetch(`${API_URL}/registrar`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(compra)
        });

        // ✅ DEBUG: Ver respuesta completa
        console.log('📥 Respuesta status:', response.status)
        
        if (!response.ok) {
            // Intentar leer el mensaje de error del backend
            const contentType = response.headers.get('content-type')
            let errorMessage = `Error: ${response.status}`
            
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json()
                console.error('❌ Error del backend:', errorData)
                errorMessage = errorData.mensaje || errorData.message || errorData.error || errorMessage
            } else {
                const errorText = await response.text()
                console.error('❌ Error del backend (texto):', errorText)
                errorMessage = errorText || errorMessage
            }
            
            throw new Error(errorMessage)
        }

        const result = await response.json()
        console.log('✅ Respuesta exitosa:', result)
        return result
    } catch (error) {
        console.error('❌ Error en registrarCompra:', error)
        throw error
    }
}
export const actualizarCompra = async (id, compra) => {
    const response = await fetch(`${API_URL}/actualizar/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(compra)
    });
    if (!response.ok)  throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}
export const eliminarCompra = async (id) => {
    const response = await fetch(`${API_URL}/eliminar/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    // ✅ Solo intenta leer JSON si hay contenido
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

export const obtenerProductosDisponibles = async () => {
    const response = await fetch(`${API_URL}/productos-disponibles`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}