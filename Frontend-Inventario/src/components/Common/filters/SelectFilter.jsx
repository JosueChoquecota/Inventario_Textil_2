import React from 'react'

export default function SelectFilter({ 
  value = '', 
  onChange, 
  options = [], 
  placeholder = 'Seleccionar...',
  className = ''
}) {
  const handleChange = (e) => {
    const newValue = e.target.value

    
    // ✅ Pasar solo el valor, no el evento
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <select
      className={`form-select ${className}`}
      value={value}
      onChange={handleChange}
    >
      {placeholder && (
        <option value="">
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option 
          key={option.value || index} 
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}