import { useCRUD } from '../../../hooks/useCRUD'
import {
    obtenerTrabajadores,
    registrarTrabajador,
    actualizarTrabajador,
    eliminarTrabajador
} from '../../../api/trabajadoresApi';

const normalizeTrabajador = (t) => ({
    id_trabajador: t.id_trabajador,
    nombres: t.nombres,
    apellidos: t.apellidos,
    tipoDocumento: t.tipoDocumento || 'DNI',
    nDocumento: t.nDocumento || 'No hay DNI',
    telefono: t.telefono || '',
    correo: t.correo || '',
    idRol: t.idRol || null,
    contrasena: t.contrasena || '',
    estado: t.estado || true
});
export function useTrabajadores() {
    const {
        data, loading, error, refresh, add, update, delete: deleteItem
    } = useCRUD({
        fetchAll: obtenerTrabajadores,
        create: registrarTrabajador,
        update: actualizarTrabajador,
        remove: eliminarTrabajador,
        normalize: normalizeTrabajador
    });
    return {
        data,
        loading,
        error,
        onRefresh: refresh,
        addTrabajador: add,
        updateTrabajador: update,
        deleteTrabajador: deleteItem
    };
}