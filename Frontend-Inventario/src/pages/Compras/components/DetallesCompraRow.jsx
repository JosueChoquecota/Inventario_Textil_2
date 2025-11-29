import React from 'react'

export default function DetallesCompraRow({ detalles = [], precioTotal }) {
  if (!detalles || detalles.length === 0) {
    return (
      <div className="alert alert-info mb-0">
        <i className="bi bi-info-circle me-2"></i>
        No hay detalles de productos para esta compra
      </div>
    )
  }

  const formatCurrency = (value) => `S/ ${Number(value || 0).toFixed(2)}`

  return (
    <div className="table-responsive">
      <table className="table table-sm table-bordered table-hover mb-0 bg-white">
        <thead className="table-secondary">
          <tr>
            <th style={{ width: '35%' }}><i className="bi bi-tag me-1"></i>Producto</th>
            <th style={{ width: '12%' }}><i className="bi bi-bookmark me-1"></i>Marca</th>
            <th style={{ width: '12%' }}><i className="bi bi-collection me-1"></i>Categoría</th>
            <th style={{ width: '8%' }} className="text-center">Talla</th>
            <th style={{ width: '8%' }} className="text-center">Color</th>
            <th style={{ width: '10%' }} className="text-end">P. Unit.</th>
            <th style={{ width: '8%' }} className="text-center">Cant.</th>
            <th style={{ width: '12%' }} className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, idx) => (
            <tr key={idx}>
              <td><div className="fw-semibold">{detalle.nombreProducto || '-'}</div></td>
              <td><small className="text-muted">{detalle.marcaProducto || '-'}</small></td>
              <td><small className="text-muted">{detalle.categoriaProducto || '-'}</small></td>
              <td className="text-center"><span className="badge bg-secondary">{detalle.talla || '-'}</span></td>
              <td className="text-center"><span className="badge bg-info text-dark">{detalle.color || '-'}</span></td>
              <td className="text-end"><span className="text-muted">{formatCurrency(detalle.precioUnitario)}</span></td>
              <td className="text-center"><strong className="text-primary">{detalle.cantidad}</strong></td>
              <td className="text-end"><strong className="text-success">{formatCurrency(detalle.subTotal)}</strong></td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-light">
          <tr className="fw-bold">
            <td colSpan="7" className="text-end">
              <i className="bi bi-calculator me-2"></i>
              TOTAL DE LA COMPRA:
            </td>
            <td className="text-end">
              <span className="fs-5 text-success">{formatCurrency(precioTotal)}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}