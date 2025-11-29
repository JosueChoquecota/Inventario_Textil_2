const API_URL = "http://localhost:8081/api/v1/marcas";

// ✅ Listar marcas (sin cambios)
export const obtenerMarcas = async () => {
    const response = await fetch(`${API_URL}/listar`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}

// ✅ Registrar marca CON logo (FormData)
export const registrarMarca = async (marcaData) => {
    console.log('📤 Enviando marca:', marcaData);
    
    const formData = new FormData();
    
    // ✅ Crear objeto con datos básicos (sin el logo)
    const dataObject = {
        marca: marcaData.marca,
        descripcion: marcaData.descripcion || ''
    };
    
    // ✅ Agregar JSON como parte "data"
    const jsonBlob = new Blob([JSON.stringify(dataObject)], { 
        type: 'application/json' 
    });
    formData.append('data', jsonBlob);
    
    // ✅ Agregar logo si existe
    if (marcaData.logo instanceof File) {
        console.log('🖼️ Logo detectado:', marcaData.logo.name);
        formData.append('logo', marcaData.logo);
    } else {
        console.log('📝 Sin logo');
    }
    
    // ✅ Debug: Ver contenido del FormData
    console.log('📦 FormData contents:');
    for (let pair of formData.entries()) {
        console.log(`  ${pair[0]}:`, pair[1]);
    }
    
    const response = await fetch(`${API_URL}/registrar`, {
        method: 'POST',
        credentials: 'include',
        body: formData
        // ⚠️ NO incluir 'Content-Type' - el browser lo configura automáticamente
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
    }
    
    return response.json();
}

// ✅ Actualizar marca CON posibilidad de cambiar logo (FormData)
export const actualizarMarca = async (id, marcaData) => {
    console.log('📤 Actualizando marca ID:', id);
    console.log('📦 Datos:', marcaData);
    
    const formData = new FormData();
    
    // ✅ Crear objeto con datos básicos (sin el logo)
    const dataObject = {
        marca: marcaData.marca,
        descripcion: marcaData.descripcion || ''
    };
    
    // ✅ Agregar JSON como parte "data"
    const jsonBlob = new Blob([JSON.stringify(dataObject)], { 
        type: 'application/json' 
    });
    formData.append('data', jsonBlob);
    
    // ✅ Agregar nuevo logo SOLO si es un archivo nuevo
    if (marcaData.logo instanceof File) {
        console.log('🖼️ Nuevo logo detectado:', marcaData.logo.name);
        formData.append('logo', marcaData.logo);
    } else {
        console.log('📝 Sin cambio de logo (mantener existente)');
        // No agregar nada - el backend mantendrá el logo actual
    }
    
    // ✅ Debug
    console.log('📦 FormData contents:');
    for (let pair of formData.entries()) {
        console.log(`  ${pair[0]}:`, pair[1]);
    }
    
    const response = await fetch(`${API_URL}/actualizar/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData
        // ⚠️ NO incluir 'Content-Type'
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
    }
    
    return response.json();
}

// ✅ Eliminar marca (sin cambios)
export const eliminarMarca = async (id) => {
   console.log('🗑️ Eliminando marca ID:', id);
    
    const response = await fetch(`${API_URL}/eliminar/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    
    console.log('📥 Response status:', response.status);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
    }
    
    // Verificar si hay contenido antes de parsear JSON
    if (response.status === 204 || response.status === 200) {
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        
        const text = await response.text();
        console.log('✅ Respuesta del servidor:', text);
        return { success: true, message: text || 'Marca eliminada' };
    }
    
    return { success: true };
}