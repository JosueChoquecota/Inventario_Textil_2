import { useCRUD } from "../../../hooks/useCRUD";
import {
    obtenerProductos,
    registrarProducto,
    actualizarProducto,
    eliminarProducto
} from "../../../api/productosApi";

const normalizeProducto = (p) => {
      let imagenUrl = "";
    // ✅ CORRECCIÓN: Construir URL completa
    if (p.imagen) {
        // Si ya tiene http://, usar tal cual
        if (p.imagen.startsWith('http://') || p.imagen.startsWith('https://')) {
            imagenUrl = p.imagen;
        } else {
            // Quitar "/" inicial si existe
            const cleanPath = p.imagen.startsWith('/') ? p.imagen.slice(1) : p.imagen;
            // Agregar dominio base
            imagenUrl = `http://localhost:8081/${cleanPath}`;
        }
    }


    return {
        idProducto: p.idProducto,
        nombre: p.nombre,
        descripcion: p.descripcion,
        idCategoria: p.idCategoria,
        idMarca: p.idMarca,
        imagen: imagenUrl,
        // ✅ Mantener objetos relacionados
        categoria: p.categoria,
        marca: p.marca
    };
};
export function useInventario() {
    const {
        data, 
        loading, 
        error, 
        refresh, 
        add: _add, 
        update: _update, 
        delete: deleteItem
    } = useCRUD({
        fetchAll: obtenerProductos,
        create: registrarProducto,
        update: actualizarProducto,
        remove: eliminarProducto,
        normalize: normalizeProducto
    });
    const addProducto = async (formData) => {
        return _add(formData, formData.imagenFile);
    };
    const updateProducto = async (id, formData) => {
        return _update(id, formData, formData.imagenFile);
    };

    return {
        data,
        loading,
        error,
        onRefresh: refresh,
        addProducto,
        updateProducto,
        deleteProducto: deleteItem
    };
}