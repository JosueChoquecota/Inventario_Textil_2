import {
    obtenerVentas,
    registrarVenta,
    actualizarVenta,
    eliminarVenta,
} from '../../../api/ventasApi';

export const ventasConfig = {
    entityName: 'ventas',
    getAll: obtenerVentas,
    create: registrarVenta,
    update: actualizarVenta,
    delete: eliminarVenta,
    
    getId: (item) => item.id ?? item.idVenta ?? item.id_venta,
    displayField: 'producto',
  
    utils: {
        formateDate: (fecha) => {
            if (!fecha) return '-';
            const [year, month, day] = fecha.split('-');
            return `${day}/${month}/${year}`;
        },

        formatCurrency: (value) => {
            return `S/ ${Number(value || 0).toFixed(2)}`;
        },

        getTipoDocumento: (documento) => {
            if (!documento) return '';
            const numeros = String(documento).replace(/\D/g, '');
            if (numeros.length === 8) return 'DNI';
            if (numeros.length === 11) return 'RUC';
            return 'OTRO';
        },

        calcularTotales: (detalles) => {
            if (!detalles || !Array.isArray(detalles)) 
                return { totalCantidad: 0, totalPrecio: 0, totalSubtotal: 0 };

            const total = detalles.reduce((sum, detalle) => {
                return sum + (parseFloat(detalle.precioUnitario || 0) * parseInt(detalle.cantidad || 0));
            }, 0);
            const productos = detalles.length;
            const unidades = detalles.reduce((sum, detalle) => {
                return sum + parseInt(detalle.cantidad || 0);
            }, 0);

            return { total, productos, unidades };
        }
    }
};