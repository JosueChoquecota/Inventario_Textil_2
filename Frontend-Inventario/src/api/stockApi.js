const API_URL = "http://localhost:8081/api/v1/stock";

export const obtenerStock = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error al obtener el stock');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en obtenerStock:', error);
        throw error;
    }
}