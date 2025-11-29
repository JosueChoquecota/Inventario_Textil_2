import { 
  obtenerTrabajadores, 
  registrarTrabajador, 
  actualizarTrabajador, 
  eliminarTrabajador 
} from '../../../api/trabajadoresApi'

// ✅ Helper para limpiar strings
const cleanString = (value) => {
  if (!value && value !== 0) return ''
  return String(value).trim()
}

export const trabajadoresConfig = {
  entityName: 'trabajadores',
  
  getAll: obtenerTrabajadores,
  create: registrarTrabajador,
  update: actualizarTrabajador,
  remove: eliminarTrabajador,

  getId: (item) => {
        return item.id ?? item.idTrabajador ?? item.id_trabajador
    },

  // ✅ Campo a mostrar en modal eliminar
  displayField: 'nombres',

  // ✅ Campos del formulario
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
      label: 'N° Documento',
      type: 'text',
      placeholder: 'Número de documento',
      required: true,
      colClass: 'col-12 col-md-6 col-lg-4'
    },
    {
      name: 'telefono',
      label: 'Teléfono',
      type: 'tel',
      placeholder: 'Teléfono',
      required: false,
      colClass: 'col-12 col-md-6 col-lg-4'
    },
    {
      name: 'correo',
      label: 'Correo electrónico',
      type: 'email',
      placeholder: 'correo@ejemplo.com',
      required: false,
      colClass: 'col-12 col-md-6 col-lg-4'
    },
    {
      name: 'idRol',
      label: 'Rol',
      type: 'select',
      required: true,
      colClass: 'col-12 col-md-6',
      options: [
        { id: 1, nombre: 'Administrador' },
        { id: 2, nombre: 'Vendedor' },
        { id: 3, nombre: 'Almacenero' }
      ]
    },
     {
      name: 'contrasena',
      label: 'Contraseña',
      type: 'password',
      placeholder: 'Contraseña (mín. 6 caracteres)',
      required: false,
      minLength: 6,
      colClass: 'col-12 col-md-6'
    },
    
  ],

  // ✅ CORREGIDO: transformPayload
  transformPayload: (formData) => {
    const payload = {
      nombres: cleanString(formData.nombres),
      apellidos: cleanString(formData.apellidos),
      idTipoDoc: formData.idTipoDoc ? parseInt(formData.idTipoDoc) : null,
      nDocumento: cleanString(formData.nDocumento),
      telefono: cleanString(formData.telefono),
      correo: cleanString(formData.correo),
      idRol: formData.idRol ? parseInt(formData.idRol) : null,
      contrasena: cleanString(formData.contrasena) || ''  // ✅ Agregar contraseña
    }

    // ✅ Solo incluir estado si viene explícitamente
    if (formData.estado !== undefined) {
      payload.estado = formData.estado
    }

    return payload
  }
}

