export const createFilterConfig = ({
  search,
  setSearch,
  handlePrint,
  handleCreate,
  filtered,
  total,
  handleClearFilters,
}) => ({
  // 🔍 Búsqueda
  searchConfig: {
    value: search,
    onChange: (e) => setSearch(e.target.value),
    placeholder: 'Buscar por nombre, documento, teléfono...'
  },

  

  // 🔘 Botones de acción
  actionButtons: [
    {
      label: 'PDF',
      icon: 'bi-printer',
      onClick: handlePrint,
      className: 'btn-success',
      hideTextOnMobile: true
    },
    {
      label: 'Agregar Cliente',
      icon: 'bi-plus-square',
      onClick: handleCreate,
      className: 'btn-primary',
      hideTextOnMobile: true
    }
  ],

  // 📊 Info de resultados
  resultsInfo: {
    filtered,
    total,
    onClearFilters: handleClearFilters
  }
})