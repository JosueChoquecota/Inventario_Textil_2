const API_URL = "http://localhost:8081/api/v1/auth";

export const login = async (correo, contrasena) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ correo, contrasena }),
  })
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en el inicio de sesión");
  }
  return response.json();
}

export const logout = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}`)
  }
  return response.json();
}

export const checkSession = async () => {
  const response = await fetch(`${API_URL}/check`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}`)
  }
  return response.json();
}

export const updateProfile = async (id, data) => {
  const response = await fetch(`http://localhost:8081/api/v1/trabajadores/actualizar/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al actualizar perfil");
  }
  return response.json();
}