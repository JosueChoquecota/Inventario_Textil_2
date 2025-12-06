import {
    obtenerProductos,
    registrarProducto,
    actualizarProducto,
    eliminarProducto    
} from '../../../api/productosApi';

const cleanString = (value) => {
    if (!value && value !== 0) return '';
    return String(value).trim();
}

// ✅ Función para normalizar URL de imagen
const normalizeImageUrl = (imagen) => {
    if (!imagen) return '';
    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
        return imagen;
    }
    const cleanPath = imagen.startsWith('/') ? imagen.slice(1) : imagen;
    return `http://localhost:8081/${cleanPath}`;
}

export const inventarioConfig = {
    entityName: 'productos',
    getAll: obtenerProductos,
    create: registrarProducto,
    update: actualizarProducto,
    remove: eliminarProducto,
    
    getId: (item) => {
        return item.id ?? item.idProducto ?? item.id_producto;
    },

    // ✅ Normalizar datos al cargarlos
    normalize: (producto) => ({
        ...producto,
        nombre: cleanString(producto.nombre),
        descripcion: cleanString(producto.descripcion),
        imagen: normalizeImageUrl(producto.imagen)
    }),

    displayField: 'producto',
    
    fields: [
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            placeholder: 'Nombre del producto',
            required: true,
            colClass: 'col-12 col-md-6'
        },
        {  
            name: 'descripcion',  
            label: 'Descripción',
            type: 'textarea',
            placeholder: 'Descripción del producto',
            required: false,
            rows: 3,
            colClass: 'col-12',
            maxLength: 100
        },
        {
            name: 'idCategoria',
            label: 'Categoría',
            type: 'select',
            required: true,
            apiEndpoint: '/api/v1/categorias/listar',
            valueKey: 'idCategoria',
            labelKey: 'nombre',
            colClass: 'col-12 col-md-6'
        },
        {
            name: 'idMarca',
            label: 'Marca',
            type: 'select',
            required: true,
            apiEndpoint: '/api/v1/marcas/listar',
            valueKey: 'idMarca',
            labelKey: 'marca',
            colClass: 'col-12 col-md-6'
        },
        {
            name: 'imagen',
            label: 'Imagen del Producto',
            type: 'file',
            accept: 'image/*',
            showPreview: true,
            previewField: 'imagen',
            required: false,
            colClass: 'col-12'
            
        }
    ],

    // ✅ SIMPLIFICADO: Solo limpiar datos, la API maneja FormData
    transformPayload: (data, isEdit = false) => {


        // ✅ Validar que los IDs sean números
        const idCategoria = parseInt(data.idCategoria);
        const idMarca = parseInt(data.idMarca);



        if (isNaN(idCategoria) || isNaN(idMarca)) {

            throw new Error('IDs de categoría o marca inválidos');
        }

        // ✅ Si hay un archivo, pasarlo directamente
        if (data.imagen instanceof File) {

            return {
                nombre: cleanString(data.nombre),
                descripcion: data.descripcion || '',
                idCategoria: idCategoria,
                idMarca: idMarca,
                imagen: data.imagen // ← La API manejará esto
            };
        }

        // ✅ Si no hay archivo nuevo, enviar solo datos

        return {
            nombre: cleanString(data.nombre),
            descripcion: data.descripcion || '',
            idCategoria: idCategoria,
            idMarca: idMarca
        };
    }
};