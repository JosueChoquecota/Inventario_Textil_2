import { useCRUD } from "../../../hooks/useCRUD";
import {
    obtenerTallas,
    registrarTalla,
    actualizarTalla,
    eliminarTalla
} from '../../../api/tallaApi';

const normalizeTalla = (t) => ({
    idTalla: t.idTalla,
    talla: t.talla || '',
    tipo: t.tipo || '',
    descripcion: t.descripcion || ''
});
export function useTallas() {
    const {
        data, loading, error, refresh, add, update, delete: deleteItem
    } = useCRUD({
        fetchAll: obtenerTallas,
        create: registrarTalla,
        update: actualizarTalla,
        remove: eliminarTalla,
        normalize: normalizeTalla
    });
    return {
        data,
        loading,
        error,
        onRefresh: refresh,
        addTalla: add,
        updateTalla: update,
        deleteTalla: deleteItem
    };
}