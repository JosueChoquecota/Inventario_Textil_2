export const createFilterConfig = ({
  search,
  setSearch,
  roleFilter,
  handlePrint,
  handleCreate,
  filtered,
  total,
  handleClearFilters
}) => ({
  searchConfig: {
    value: search,
    onChange: setSearch,
    placeholder: 'Buscar por nombre, documento, rol...'
  },
  
  

  
  actionButtons: [
    {
      label: 'Imprimir PDF',
      icon: 'bi-printer',
      onClick: handlePrint,
      className: 'btn-success'
    },
    {
      label: 'Agregar Trabajador',
      icon: 'bi-plus-square',
      onClick: handleCreate,
      className: 'btn-primary'
    }
  ],
  
  resultsInfo: (search || roleFilter) ? {
    filtered: filtered,
    total: total,
    onClearFilters: handleClearFilters
  } : null
})