import {
    obtenerCategorias,
    registrarCategoria,
    actualizarCategoria,
    eliminarCategoria
} from '../../../api/categoriaApi';

const cleanString = (value) => {
    if (!value) return '';  // ✅ Retorna string vacío si es falsy
    return String(value).trim();
}
export const categoriasConfig = {
    entityName: 'categorias',

    getAll: obtenerCategorias,
    create: registrarCategoria,
    update: actualizarCategoria,
    remove: eliminarCategoria,
    getId: (item) => item.id ?? item.idCategoria ?? item.id_categoria,

    displayField: 'nombre',

    fields: [
    {
         name: 'nombre',
         label: 'Nombre',
         type: 'text',
         placeholder: 'Nombre de la categoría',
         required: true,
         colClass: 'col-12 col-md-6 col-lg-4',
        
    },
    {
        name: 'descripcion',
        label: 'Descripción',
        type: 'textarea',
        placeholder: 'Descripción de la categoría',
        required: false,
        rows:3,
        colClass: 'col-12',
        maxLength: 30
    }
],
    transformPayload: (formData) => ({
        nombre: cleanString(formData.nombre),
        descripcion: cleanString(formData.descripcion),
    })
}
