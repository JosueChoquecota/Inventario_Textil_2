import React from 'react'
import GestionTallas from './GestionTallas'
import GestionColores from './GestionColores'

export default function ConfiguracionPage() {
  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">Configuración de Compras</h4>
          <small className="text-muted">Administra tallas y colores disponibles para productos</small>
        </div>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => window.history.back()}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Volver
        </button>
      </div>

      {/* Dos Columnas: Tallas | Colores */}
      <div className="row g-4">
        {/* Columna Izquierda: TALLAS */}
        <div className="col-12 col-lg-6">
          <GestionTallas />
        </div>

        {/* Columna Derecha: COLORES */}
        <div className="col-12 col-lg-6">
          <GestionColores />
        </div>
      </div>
    </div>
  )
}
