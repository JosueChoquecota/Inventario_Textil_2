const API_URL = "http://localhost:8081/api/v1/clientes";

export const obtenerClientes = async () => {
  const response = await fetch(`${API_URL}/listar`, {
    method: 'GET', 
    credentials: 'include',
  });
  if (!response.ok) throw new Error(`Error ${response.status}`);
  return response.json();
}
export const registrarCliente = async (cliente) => {
  const response = await fetch(`${API_URL}/registrar`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json',
              'Accept': 'application/json'

     },
    body: JSON.stringify(cliente),
    });
  if (!response.ok) throw new Error(`Error ${response.status}`);
  return response.json();
}
export const actualizarCliente = async (id, cliente) => {
  const response = await fetch(`${API_URL}/actualizar/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(cliente),
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}

export const eliminarCliente = async (id) => {
  const response = await fetch(`${API_URL}/eliminar/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  
  return response.json(); 
}