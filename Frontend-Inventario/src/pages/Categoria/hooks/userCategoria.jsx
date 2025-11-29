import { useCRUD } from "../../../hooks/useCRUD";
import {
    obtenerCategorias,
    registrarCategoria,
    actualizarCategoria,
    eliminarCategoria
} from "../../../api/categoriaApi";

const normalizeCategoria = (c) => ({
    idCategoria: c.idCategoria,
    nombre: c.nombre ?? '',
    descripcion: c.descripcion ?? ''
});

export function useCategoria() {
    const {
        data,
        loading,
        error,
        refresh,
        add,
        update,
        delete: deleteItem
    } = useCRUD({
        fetchAll: obtenerCategorias,
        create: registrarCategoria,
        update: actualizarCategoria,
        remove: eliminarCategoria,
        normalize: normalizeCategoria
    });
    return {
        data,
        loading,
        error,
        onRefresh: refresh,
        addCategoria: add,
        updateCategoria: update,
        deleteCategoria: deleteItem
    }
}