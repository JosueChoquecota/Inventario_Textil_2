export const createFilterConfig = ({
  search,
  setSearch,
  handlePrint,
  handleCreate,
  filtered,
  total,
  handleClearFilters
}) => ({
  // 🔍 Búsqueda
  searchConfig: {
    value: search,
    onChange: (value) => {

      setSearch(value)
    },
    placeholder: 'Buscar por nombre, descripción, categoría o marca...'
  },

  

  // 🔘 Botones de acción
  actionButtons: [
    {
      label: 'Imprimir PDF',
      icon: 'bi-printer',
      onClick: handlePrint,
      className: 'btn-success',
      hideTextOnMobile: false,
      title: 'Generar PDF'
    },
    {
      label: 'Agregar Producto',
      icon: 'bi-plus-square',
      onClick: handleCreate,
      className: 'btn-primary',
      hideTextOnMobile: false
    }
  ],

  // 📊 Info de resultados
  resultsInfo: filtered !== total ? {
        filtered,
        total,
        onClearFilters: handleClearFilters
    } : null
})