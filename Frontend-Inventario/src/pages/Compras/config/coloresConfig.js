import {
    obtenerColores,
    registrarColor,
    actualizarColor,
    eliminarColor
} from '../../../api/coloresApi';

const cleanString = (value) => {
    if (!value && value !== 0) return ''
    return String(value).trim()
}

export const  coloresConfig = {
    entityName: 'colores',

    getAll: obtenerColores,
    create: registrarColor,
    update: actualizarColor,
    remove: eliminarColor,
    getId: (item) => {
        return item.id ?? item.idColor ?? item.id_color
    },
    displayField: 'color',

    fields: [
        {
            name: 'color',
            label: 'Nombre del color',
            type: 'text',
            placeholder: 'Ingrese el nombre del color',
            required: true,
            colClass: 'col-12 col-md-6'
        },
        {
            name: 'codigo',
            label: 'Código Hexadecimal',
            type: 'text',
            placeholder: 'Ingrese el código hexadecimal del color',
            required: true,
            colClass: 'col-12 col-md-6'
        }
    ],

    transformPayload: (formData) => {
        const payload = {
            color: cleanString(formData.color),
            codigo: cleanString(formData.codigo)    
        };
        return payload;
    }
}