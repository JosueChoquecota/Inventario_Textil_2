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
    placeholder: 'Buscar por razón social, RUC, contacto...'
  },
  
  // ✅ Botones de acción
  actionButtons: [
    {
      label: 'Imprimir PDF',
      icon: 'bi-printer',
      onClick: handlePrint,
      className: 'btn-success',
      hideTextOnMobile: true
    },
    {
      label: 'Agregar Proveedor',
      icon: 'bi-plus-circle',
      onClick: handleCreate,
      className: 'btn-primary',
      hideTextOnMobile: true
    }
  ],

  // ✅ Info de resultados
  resultsInfo: filtered !== total ? {
    filtered,
    total,
    onClearFilters: handleClearFilters
  } : null
});