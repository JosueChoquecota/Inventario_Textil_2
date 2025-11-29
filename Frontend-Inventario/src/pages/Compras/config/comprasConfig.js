import {
    obtenerCompras,
    registrarCompra,
    eliminarCompra
} from '../../../api/comprasApi';

/**
 * Configuración para compras
 * NO necesita 'fields' porque usa modal personalizado
 */
export const comprasConfig = {
    entityName: 'compras',
    getAll: obtenerCompras,
    create: registrarCompra,
    remove: eliminarCompra,
    
    // ❌ Las compras NO se editan
    update: null,
    
    getId: (item) => {
        return item.idCompra ?? item.id;
    },
    
    displayField: 'nombreProveedor',
    
    // ========================================
    // UTILIDADES
    // ========================================
    utils: {
        /**
         * Formatear fecha (DD/MM/YYYY)
         */
        formatDate: (fecha) => {
            if (!fecha) return '-';
            const [year, month, day] = fecha.split('-');
            return `${day}/${month}/${year}`;
        },

        /**
         * Formatear moneda
         */
        formatCurrency: (value) => {
            return `S/ ${Number(value || 0).toFixed(2)}`;
        },

        /**
         * Obtener tipo de documento
         */
        getTipoDocumento: (documento) => {
            if (!documento) return '';
            const numeros = String(documento).replace(/\D/g, '');
            if (numeros.length === 8) return 'DNI';
            if (numeros.length === 11) return 'RUC';
            return 'OTRO';
        },

        /**
         * Calcular totales de una compra
         */
        calcularTotales: (detalles) => {
            if (!detalles || !Array.isArray(detalles)) {
                return { total: 0, productos: 0, unidades: 0 };
            }

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