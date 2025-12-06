import React from 'react'

export default function ListaProductos({ detalles, eliminarProducto }) {
  if (detalles.length === 0) return null

  return (
    <div className="card mb-3">
      <div className="card-header bg-light">
        <h6 className="mb-0">
          <i className="bi bi-list-check me-2"></i>
          Productos Agregados ({detalles.length})
        </h6>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th>Talla</th>
                <th>Color</th>
                <th className="text-end">P. Unit.</th>
                <th className="text-center">Cant.</th>
                <th className="text-end">Subtotal</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle, index) => (
                <tr key={index}>
                  <td>
                    <div className="fw-semibold">{detalle.nombreProducto}</div>
                    <small className="text-muted">{detalle.marcaProducto}</small>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{detalle.talla}</span>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">{detalle.color}</span>
                  </td>
                  <td className="text-end">S/ {detalle.precioUnitario.toFixed(2)}</td>
                  <td className="text-center">
                    <strong>{detalle.cantidad}</strong>
                  </td>
                  <td className="text-end">
                    <strong>S/ {detalle.subTotal.toFixed(2)}</strong>
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => eliminarProducto(index)}
                      title="Eliminar"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}