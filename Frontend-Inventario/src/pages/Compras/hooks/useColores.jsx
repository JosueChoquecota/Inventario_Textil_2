import { useCRUD } from "../../../hooks/useCRUD";
import {
    obtenerColores,
    registrarColor,
    actualizarColor,
    eliminarColor
} from '../../../api/coloresApi';

const normalizeColor = (c) => ({
    idColor: c.idColor,
    color: c.color || '',
    codigo: c.codigo || ''
});
export function useColores() {
    const {
        data, loading, error, refresh, add, update, delete: deleteItem
    } = useCRUD({
        fetchAll: obtenerColores,
        create: registrarColor,
        update: actualizarColor,
        remove: eliminarColor,
        normalize: normalizeColor
    });
    return {
        data,
        loading,
        error,
        onRefresh: refresh,
        addColor: add,
        updateColor: update,
        deleteColor: deleteItem
    };
}