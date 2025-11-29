import { useCRUD } from "../../../hooks/useCRUD";
import {
    obtenerClientes,
    registrarCliente,
    actualizarCliente,
    eliminarCliente
} from "../../../api/clientesApi";

const normalizeCliente = (c) => ({
    idCliente: c.idCliente,
    nombres: c.nombres,
    apellidos: c.apellidos,
    idTipoDoc: c.idTipoDoc || 1,
    nDocumento: c.nDocumento || "no hay DNI",
    telefono: c.telefono || "",
    correo: c.correo || "",
    direccion: c.direccion || ""
});
export function useClientes() {
    const {
        data, loading, error, refresh, add, update, delete: deleteItem
    } = useCRUD({
        fetchAll: obtenerClientes,
        create: registrarCliente,
        update: actualizarCliente,
        remove: eliminarCliente,
        normalize: normalizeCliente
    });
    return {
        data,
        loading,
        error,
        onRefresh: refresh,
        addCliente: add,
        updateCliente: update,
        deleteCliente: deleteItem
    };
}