import {
    obtenerTallas,
    registrarTalla,
    actualizarTalla,
    eliminarTalla
} from '../../../api/tallasApi';

const cleanString = (value) => {
    if (!value && value !== 0) return ''
    return String(value).trim()
}

export const  tallasConfig = {
    entityName: 'tallas',

    getAll: obtenerTallas,
    create: registrarTalla,
    update: actualizarTalla,
    remove: eliminarTalla,
    getId: (item) => {
        return item.id ?? item.idTalla ?? item.id_talla
    },
    displayField: 'talla',

    fields: [
        {
            name: 'talla',
            label: 'Nombre de la talla',
            type: 'text',
            placeholder: 'Ingrese el nombre de la talla',
            required: true,
            colClass: 'col-12 col-md-6'
        },
        {
            name: 'tipo',
            label: 'Tipo de talla',
            type: 'select',
            valueKey: 'value',      // <-- Agrega esto
            labelKey: 'label',      // <-- Y esto
            options: [
                { value: 'Letras', label: 'Letras' },
                { value: 'Número', label: 'Número' },
                { value: 'Pantalón', label: 'Pantalón' }
            ],
            required: true,
            colClass: 'col-12 col-md-6'
        },
        {
            name: 'descripcion',
            label: 'Descripción',
            type: 'text',
            colClass: 'col-12 col-md-6'
        }
    ],

    transformPayload: (formData) => {
        const payload = {
            talla: cleanString(formData.talla),
            tipo: cleanString(formData.tipo),
            descripcion: cleanString(formData.descripcion)
        };
        return payload;
    }
}