import {
    obtenerMarcas,
    registrarMarca,
    actualizarMarca,
    eliminarMarca
} from '../../../api/marcasApi';

const cleanString = (value) => {
    if (!value && value !== 0) return '';
    return String(value).trim();
}

// ✅ Función para normalizar URL de logo
const normalizeImageUrl = (logo) => {
    if (!logo) return '';
    if (logo.startsWith('http://') || logo.startsWith('https://')) {
        return logo;
    }
    const cleanPath = logo.startsWith('/') ? logo.slice(1) : logo;
    return `http://localhost:8081/${cleanPath}`;
}

export const marcasConfig = {
    entityName: 'marca',

    getAll: obtenerMarcas,
    create: registrarMarca,
    update: actualizarMarca,
    remove: eliminarMarca,

    getId: (item) => {
        return item.id ?? item.idMarca ?? item.id_marca;
    },

    // ✅ Normalizar datos al cargarlos
    normalize: (marca) => ({
        ...marca,
        marca: cleanString(marca.marca),
        descripcion: cleanString(marca.descripcion),
        logo: normalizeImageUrl(marca.logo)
    }),

    // Campo a mostrar en modal eliminar
    displayField: 'marca',

    // ✅ Campos del formulario
    fields: [
        {
            name: 'marca',
            label: 'Nombre de la Marca',
            type: 'text',
            required: true,
            colClass: 'col-12',
            placeholder: 'Ej: Nike, Adidas, Samsung...',
            maxLength: 100
        },
        {
            name: 'descripcion',
            label: 'Descripción',
            type: 'textarea',
            required: false,
            rows: 3,
            colClass: 'col-12',
            placeholder: 'Descripción breve de la marca',
            maxLength: 100
        },
        {
            name: 'logo',
            label: 'Logo de la Marca',
            type: 'file',
            accept: 'image/*',
            required: false,
            colClass: 'col-12',
            showPreview: true,
            previewField: 'logo',
            previewSize: 150,
            helperText: 'Formatos: JPG, PNG, SVG. Máximo 5MB. Recomendado: fondo transparente'
        }
    ],

    // ✅ Transformar datos antes de enviar
    transformPayload: (data, isEdit = false) => {


        // ✅ Si hay un archivo, pasarlo directamente
        if (data.logo instanceof File) {

            return {
                marca: cleanString(data.marca),
                descripcion: data.descripcion || '',
                logo: data.logo // ← La API manejará FormData
            };
        }

        // ✅ Si no hay archivo nuevo, enviar solo datos básicos

        return {
            marca: cleanString(data.marca),
            descripcion: data.descripcion || ''
        };
    }
};