export const createFilterConfig = ({
    search,
    setSearch,
    handlePrint,
    handleCreate,
    filtered,
    total,
    handleClearFilters
}) => ({
    searchConfig: {
        value: search,
        onChange: setSearch,
        placeholder: 'Buscar por marca o descripción...'
    },
    actionButtons: [
        {
            label: 'Imprimir PDF',
            icon: 'bi-printer',
            onClick: handlePrint,
            className: 'btn-success',
            hideTextOnMobile: false
        },
        {
            label: 'Agregar Marca',
            icon: 'bi-plus-square',
            onClick: handleCreate,
            className: 'btn-primary',
            hideTextOnMobile: false
            
        }
    ],
    resultsInfo: filtered !== total ? {
        filtered,
        total,
        onClearFilters: handleClearFilters
    } : null
})