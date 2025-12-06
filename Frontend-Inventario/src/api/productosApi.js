const API_URL = "http://localhost:8081/api/v1/productos";

const cleanString = (value) => {
  if (!value && value !== 0) return '';
  return String(value).trim();
}
export const obtenerProductos = async () => {
  try {
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
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const obtenerProductosConStock = async () => {
  try {
    const response = await fetch(`${API_URL}/listar-con-stock`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      // FALLBACK: usar el endpoint normal que funciona
      const fallbackResponse = await fetch(`${API_URL}/listar`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!fallbackResponse.ok) {
        throw new Error(`Error en fallback ${fallbackResponse.status}: ${fallbackResponse.statusText}`);
      }

      const productos = await fallbackResponse.json();
      
      // Agregar campo stock vacío para que no falle el filtrado
      return productos.map(producto => ({
        ...producto,
        stock: [] // Sin stock - dropdowns estarán vacíos hasta que arregles el backend
      }));
    }

    const productos = await response.json();
    
    return productos;
    
  } catch (error) {
    console.error("Error al obtener productos con stock:", error);
    throw error;
  }
};

export const registrarProducto = async (producto) => {
  try {

    const formData = new FormData();
    const dataDTO = {
      nombre: cleanString(producto.nombre),
      descripcion: producto.descripcion || '',
      idCategoria: parseInt(producto.idCategoria),
      idMarca: parseInt(producto.idMarca)
    };
        
    const dataBlob = new Blob(
      [JSON.stringify(dataDTO)], 
      { type: 'application/json' }
    );
    
    formData.append('data', dataBlob);

    if (producto.imagen instanceof File) {
      formData.append('imagen', producto.imagen);
    } else {
      console.log('📝 Sin imagen');
    }

    const response = await fetch(`${API_URL}/registrar`, {
      method: "POST",
      credentials: "include",
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al registrar producto:", error);
    throw error;
  }
};

export const actualizarProducto = async (id, producto) => {
  try {

    const formData = new FormData();
    const dataDTO = {
      nombre: cleanString(producto.nombre),
      descripcion: producto.descripcion || '',
      idCategoria: parseInt(producto.idCategoria),
      idMarca: parseInt(producto.idMarca)
    };
        
    const dataBlob = new Blob(
      [JSON.stringify(dataDTO)], 
      { type: 'application/json' }
    );
    
    formData.append('data', dataBlob);

    if (producto.imagen instanceof File) {
      formData.append('imagen', producto.imagen);
    } else {
      console.log('📝 Sin imagen nueva, se mantendrá la existente');
    }

    // ✅ NUEVO: Log detallado del FormData
    for (let [key, value] of formData.entries()) {
      if (value instanceof Blob && !(value instanceof File)) {
        console.log(`   ${key}: Blob (${value.type})`);
        const text = await value.text();
        console.log(`      Contenido: ${text}`);
      } else if (value instanceof File) {
        console.log(`   ${key}: File (${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`   ${key}:`, value);
      }
    }

    const response = await fetch(`${API_URL}/actualizar/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      console.error('❌ Error completo:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  const response = await fetch(`${API_URL}/eliminar/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    
    if (!response.ok) throw new Error(`Error ${response.status}`);
    
    // ✅ SOLUCIÓN: Verificar si hay contenido antes de parsear JSON
    if (response.status === 204) {
        // 204 No Content - sin cuerpo de respuesta
        return { success: true, message: 'Marca eliminada correctamente' };
    }
    
    // Si hay contenido, verificar que sea JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    
    // Si no es JSON, devolver texto o mensaje genérico
    const text = await response.text();
    return { success: true, message: text || 'Marca eliminada' };
  };

