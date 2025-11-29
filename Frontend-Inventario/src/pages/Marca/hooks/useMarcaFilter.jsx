import { useMemo } from "react";


export function useMarcaFilter(data, search) {
    // Marcas filtradas
    const filtered = useMemo(() => {
        return data.filter(t => {
            // Filtro por búsqueda
            const q = search.trim().toLowerCase();
            if (q) {
                const matchText =
                    String(t.id).includes(q) ||
                    (t.marca || '').toLowerCase().includes(q) ||
                    (t.descripcion || '').toLowerCase().includes(q);
                if (!matchText) return false;
            }
            return true;
        });
    }, [data, search]);

    return { filtered };
}