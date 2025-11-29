import React from 'react'
import SearchInput from './SearchInput'
import SelectFilter from './SelectFilter'

export default function FilterBar({
  searchConfig,
  selectFilters = [],
  actionButtons = [],
  resultsInfo,
  className = ''
}) {
  console.log('📊 FilterBar - searchConfig:', searchConfig)
  console.log('📊 FilterBar - selectFilters:', selectFilters)

  return (
    <div className={`card shadow-sm mb-3 ${className}`}>
      <div className="card-body">
        <div className="row g-2 align-items-center">
          
          {/* Búsqueda */}
          {searchConfig && (
            <div className="col-12 col-md-4">
              <SearchInput
                value={searchConfig.value}
                onChange={searchConfig.onChange}
                placeholder={searchConfig.placeholder}
              />
            </div>
          )}

          {/* Filtros de selección */}
          {selectFilters && selectFilters.length > 0 && selectFilters.map((filter, index) => (
            <div key={index} className="col-12 col-md-2">
              <SelectFilter
                value={filter.value}
                onChange={filter.onChange}
                options={filter.options}
                placeholder={filter.placeholder}
              />
            </div>
          ))}

          {/* Botones de acción */}
          {actionButtons && actionButtons.length > 0 && (
            <div className="col-12 col-md-auto ms-md-auto">
              <div className="d-grid d-md-flex gap-2">
                {actionButtons.map((button, index) => (
                  <button
                    key={index}
                    className={`btn ${button.className || 'btn-primary'}`}
                    onClick={button.onClick}
                    title={button.title}
                  >
                    <i className={`bi ${button.icon} ${button.hideTextOnMobile ? '' : 'me-2'}`}></i>
                    {button.hideTextOnMobile ? (
                      <span className="d-md-inline ms-2">{button.label}</span>
                    ) : (
                      <span>{button.label}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info de resultados */}
        {resultsInfo && (
          <div className="mt-3 pt-3 border-top">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
              <small className="text-muted">
                <i className="bi bi-funnel me-1"></i>
                Mostrando <strong>{resultsInfo.filtered}</strong> de <strong>{resultsInfo.total}</strong> registros
              </small>
              {resultsInfo.filtered < resultsInfo.total && resultsInfo.onClearFilters && (
                <button 
                  className="btn btn-sm btn-outline-secondary w-100 w-sm-auto"
                  onClick={resultsInfo.onClearFilters}
                >
                  <i className="bi bi-x-circle me-1"></i>
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}