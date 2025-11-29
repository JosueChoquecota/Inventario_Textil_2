import { 
  obtenerProveedores, 
  registrarProveedor, 
  actualizarProveedor, 
  eliminarProveedor 
} from '../../../api/proveedoresApi';

const cleanString = (value) => {
  value ? String(value).trim() : '';
  return String(value).trim();
  }

export const proveedoresConfig = {
  entityName: 'proveedores',
  
  getAll: obtenerProveedores,
  create: registrarProveedor,
  update: actualizarProveedor,
  remove: eliminarProveedor,

  getId: (item) => item.id ?? item.idProveedor ?? item.id_proveedor,

  displayField: 'nombres',

  fields: [
    {
      name: 'nombres',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Nombres',
      required: true,
      colClass: 'col-12 col-md-6 col-lg-3'
    },
    {
      name: 'apellidos',
      label: 'Apellido',
      type: 'text',
      placeholder: 'Apellidos',
      required: true,
      colClass: 'col-12 col-md-6 col-lg-3'
    },
    {
      name: 'idTipoDoc',
      label: 'Tipo de documento',
      type: 'select',
      required: true,
      colClass: 'col-12 col-md-6 col-lg-3',
      options: [
        { id: 1, nombre: 'DNI' },
        { id: 2, nombre: 'RUC' },
        { id: 3, nombre: 'CE' },
        { id: 4, nombre: 'Pasaporte' }
      ]
    },
    {
      name: 'nDocumento',
      label: 'DNI / RUC',
      type: 'text',
      placeholder: 'Número de documento',
      required: true,
      colClass: 'col-12 col-md-6 col-lg-3'
    },
    {
      name: 'telefono',
      label: 'Teléfono',
      type: 'tel',
      placeholder: 'Teléfono',
      required: false,
      colClass: 'col-12 col-md-4'
    },
    {
      name: 'direccion',
      label: 'Dirección',
      type: 'text',
      placeholder: 'Dirección',
      required: false,
      colClass: 'col-12 col-md-8'
    }
  ],

  // ✅ Transformación segura con String()
  transformPayload: (formData) => ({
    nombres: cleanString(formData.nombres),
    apellidos: cleanString(formData.apellidos),
    idTipoDoc: parseInt(formData.idTipoDoc) || null,
    nDocumento: cleanString(formData.nDocumento),
    telefono: cleanString(formData.telefono),
    direccion: cleanString(formData.direccion)
  })
}

