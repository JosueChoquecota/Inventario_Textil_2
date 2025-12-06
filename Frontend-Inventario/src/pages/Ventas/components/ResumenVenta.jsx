import React from 'react'

export default function ResumenVenta({ totales, detalles }) {
  if (detalles.length === 0) return null

  return (
    <div className="card bg-light">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-6 col-md-4 text-center">
            <div className="fs-4 fw-bold text-primary">{totales.totalProductos}</div>
            <small className="text-muted">Productos</small>
          </div>
          <div className="col-6 col-md-4 text-center">
            <div className="fs-4 fw-bold text-info">{totales.totalUnidades}</div>
            <small className="text-muted">Unidades</small>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="fs-3 fw-bold text-success">S/ {totales.precioTotal.toFixed(2)}</div>
            <small className="text-muted">Total</small>
          </div>
        </div>
      </div>
    </div>
  )
}