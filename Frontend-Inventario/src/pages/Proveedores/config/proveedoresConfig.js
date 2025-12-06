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

export const createProveedoresConfig = (tiposDoc = []) => {

  // ✅ Mapear tipos de documento
  const tipoDocOptions = tiposDoc.map(t => ({
    id: t.id_tipo_doc,
    nombre: t.tipo
  }))

  // ✅ Encontrar IDs dinámicamente
  const dniOption = tiposDoc.find(t => t.tipo.toUpperCase().includes('DNI'))
  const rucOption = tiposDoc.find(t => t.tipo.toUpperCase().includes('RUC'))

  const ID_DNI = dniOption ? dniOption.id_tipo_doc : null
  const ID_RUC = rucOption ? rucOption.id_tipo_doc : null

  return {
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
        options: tipoDocOptions // ✅ Opciones dinámicas
      },
      {
        name: 'nDocumento',
        label: 'DNI / RUC',
        type: 'text',
        placeholder: 'Número de documento',
        required: true,
        colClass: 'col-12 col-md-6 col-lg-3',
        maxLength: (formData) => {
          const tipo = Number(formData.idTipoDoc)
          if (ID_DNI && tipo === ID_DNI) return 8  // DNI Dinámico
          if (ID_RUC && tipo === ID_RUC) return 11 // RUC Dinámico
          return 20
        },
        minLength: (formData) => {
          const tipo = Number(formData.idTipoDoc)
          if (ID_DNI && tipo === ID_DNI) return 8  // DNI Dinámico
          if (ID_RUC && tipo === ID_RUC) return 11 // RUC Dinámico
          return 20 // Otros documentos
        },
        onlyNumbers: true
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
}

