import { useMemo } from 'react';

export function useCategoriaFilter(data, search, tipoFilter) {
    const filtered = useMemo(() => {
        if (!data || data.length === 0) return [];

        return data.filter(categoria => {
            const q = search.trim().toLowerCase();

            // 🔍 Filtro de búsqueda genera
            if (q) {
                const searchableText = [
                    categoria.nombre,
                    categoria.descripcion
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();
                if (!searchableText.includes(q)) {
                    return false;
                }
            }

            // 🏷️ Filtro por tipo de categoría (si aplica)
            if (tipoFilter && tipoFilter !== '') {
                if (categoria.tipoCategoria !== tipoFilter) {
                    return false;
                }
            }
            return true;
        });
    }, [data, search, tipoFilter]);

    return {filtered};
}