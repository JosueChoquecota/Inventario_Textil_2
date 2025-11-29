import { useCRUD } from "../../../hooks/useCRUD";

import {
  obtenerMarcas,
  registrarMarca,
  actualizarMarca,
  eliminarMarca
} from '../../../api/marcasApi';

const normalizeMarca = (m) => ({
    idMarca: m.idMarca,
    marca: m.marca,
    logo: m.logo || '',
    descripcion: m.descripcion || ''
});
export function useMarca() {
    const {
        data, 
        loading, 
        error, 
        refresh, 
        add, 
        update, 
        delete: deleteItem
    } = useCRUD({
        fetchAll: obtenerMarcas,
        create: registrarMarca,
        update: actualizarMarca,
        remove: eliminarMarca,
        normalize: normalizeMarca
    });
    return {
        data,
        loading,
        error,
        onRefresh: refresh,
        addMarca: add,
        updateMarca: update,
        deleteMarca: deleteItem
    };
}