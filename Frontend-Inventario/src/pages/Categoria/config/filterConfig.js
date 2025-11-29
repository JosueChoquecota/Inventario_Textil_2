export const createFilterConfig = ({
    search,
    setSearch,
    handlePrint,
    handleCreate,
    filtered,
    total,
    handleClearFilters
}) => ({
    // ✅ Búsqueda
    searchConfig: {
        value: search,
        onChange: setSearch,
        placeholder: 'Buscar por código, nombre, descripción...'
    },

    // ✅ Botones de acción
    actionButtons: [
        {
            label: 'Imprimir PDF',
            icon: 'bi-printer',
            onClick: handlePrint,
            className: 'btn-success',
            hideTextOnMobile: false
        },
        {
            label: 'Crear Categoría',
            icon: 'bi-plus-square',
            onClick: handleCreate,
            className: 'btn-primary',
            hideTextOnMobile: false 
        }
    ],
    // ✅ Info de resultados
    resultsInfo: filtered !== total ? {
        filtered,
        total,
        onClearFilters: handleClearFilters
    } : null
})