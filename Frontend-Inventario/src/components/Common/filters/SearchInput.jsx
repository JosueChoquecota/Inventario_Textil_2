import React from 'react'

export default function SearchInput({ 
  value = '', 
  onChange, 
  placeholder = 'Buscar...',
  className = ''
}) {
  const handleChange = (e) => {
    const newValue = e.target.value
    console.log('🔍 SearchInput - Valor:', newValue)
    
    // ✅ Pasar solo el valor, no el evento
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleClear = () => {
    console.log('🧹 SearchInput - Limpiar')
    if (onChange) {
      onChange('')
    }
  }

  return (
    <div className={`position-relative ${className}`}>
      <input
        type="text"
        className="form-control ps-5"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={{ paddingRight: value ? '2.5rem' : '1rem' }}
      />
      <i 
        className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
        style={{ pointerEvents: 'none' }}
      ></i>
      {value && (
        <button
          type="button"
          className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 p-0"
          onClick={handleClear}
          style={{ 
            width: '24px', 
            height: '24px',
            border: 'none',
            background: 'transparent'
          }}
          title="Limpiar búsqueda"
        >
          <i className="bi bi-x-circle text-muted"></i>
        </button>
      )}
    </div>
  )
}