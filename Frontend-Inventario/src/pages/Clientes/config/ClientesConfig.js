import {
    obtenerClientes,
    registrarCliente,
    actualizarCliente,
    eliminarCliente
} from '../../../api/clientesApi';

const cleanString = (value) => {
    if (!value && value !== 0) return '';
    return String(value).trim();
}
export const clientesConfig = {
    entityName: 'clientes',
    getAll: obtenerClientes,
    create: registrarCliente,
    update: actualizarCliente,
    remove: eliminarCliente,
    getId: (item) => {
        return item.id ?? item.idCliente ?? item.id_cliente;
    },
    displayField: 'nombres',
    fields: [
        {
            name: 'nombres',
            label: 'Nombres',
            type: 'text',
            placeholder: 'Nombres',
            required: true,
            colClass: 'col-12 col-md-6 col-lg-4'
        },
        {
            name: 'apellidos',
            label: 'Apellidos',
            type: 'text',
            placeholder: 'Apellidos',
            required: true,
            colClass: 'col-12 col-md-6 col-lg-4'
        },
        {
            name: 'idTipoDoc',
            label: 'Tipo de documento',
            type: 'select',
            required: true,
            colClass: 'col-12 col-md-6 col-lg-4',
            options: [
                { id: 1, nombre: 'DNI' },
                { id: 2, nombre: 'RUC' },
                { id: 3, nombre: 'CE' },
                { id: 4, nombre: 'Pasaporte' }
            ]
        },
        {
            name: 'nDocumento',
            label: 'Número de documento',
            type: 'text',
            placeholder: 'Número de documento',
            required: true,
            colClass: 'col-12 col-md-6 col-lg-4'
        },
        {
            name: 'telefono',
            label: 'Teléfono',
            type: 'text',
            placeholder: 'Teléfono',
            required: true,
            colClass: 'col-12 col-md-6 col-lg-4'
        },
        {
            name: 'correo',
            label: 'Correo',
            type: 'email',
            placeholder: 'Correo electrónico',
            required: true,
            colClass: 'col-12 col-md-6 col-lg-4'
        },
        {
            name: 'direccion',
            label: 'Dirección',
            type: 'text',
            placeholder: 'Dirección',
            required: false,
            colClass: 'col-12 col-md-6 col-lg-4'
        }
    ],

    transformPayload: (formData) => {
        const payload = {
            nombres: cleanString(formData.nombres),
            apellidos: cleanString(formData.apellidos),
            idTipoDoc: parseInt(formData.idTipoDoc) || 1,
            nDocumento: cleanString(formData.nDocumento),
            tipoDocumento: cleanString(formData.tipoDocumento),
            telefono: cleanString(formData.telefono),
            correo: cleanString(formData.correo),
            direccion: cleanString(formData.direccion),
        };
        return payload;
    }
}