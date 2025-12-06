const API_URL = "http://localhost:8081/api/v1/stock";


export const obtenerStockPorProducto = async () => {
    const response = await fetch(`${API_URL}/listar`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
};