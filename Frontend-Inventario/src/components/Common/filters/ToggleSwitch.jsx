import React from 'react'

export default function ToggleSwitch({ 
  checked = false, 
  onChange, 
  label, 
  id = 'toggle-switch',
  className = '' 
}) {
  return (
    <div className={`form-check form-switch ${className}`}>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}