import React from 'react'

export default function VentaCardMobile({ venta, isExpanded, onExpand, onDelete, formatDate, formatCurrency }) {
  const id = venta.idVenta

  return (
    <div className="card mb-3">
      <div className="card-header bg-light py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="badge bg-secondary rounded-pill me-2">#{id}</span>
            <small className="text-muted">
              <i className="bi bi-calendar3 me-1"></i>
              {formatDate(venta.fecha)}
            </small>
          </div>
          <span className="fw-bold text-success">
            {formatCurrency(venta.precioTotal)}
          </span>
        </div>
      </div>
      
      <div className="card-body p-3">
        {/* Cliente */}
        <div className="mb-2">
          <div className="fw-semibold text-primary">
            <i className="bi bi-person-fill me-2"></i>
            {venta.nombreCliente || 'Sin cliente'}
          </div>
          <small className="text-muted">
            {venta.documentoCliente ? (
              <>
                <i className="bi bi-card-text me-1"></i>
                {venta.documentoCliente}
              </>
            ) : 'Sin documento'}
          </small>
        </div>

        {/* Trabajador */}
        <div className="mb-2">
          <small className="text-muted">
            <i className="bi bi-person-circle me-1"></i>
            Registrado por: <strong>{venta.nombreCompletoTrabajador || 'Sin datos'}</strong>
          </small>
        </div>

        {/* Badges de totales */}
        <div className="d-flex gap-2 mb-3">
          <span className="badge bg-info text-dark">
            <i className="bi bi-box me-1"></i>
            {venta.totalProductos || 0} productos
          </span>
          <span className="badge bg-primary">
            <i className="bi bi-stack me-1"></i>
            {venta.totalUnidades || 0} unidades
          </span>
        </div>

        {/* Botones */}
        <div className="d-flex gap-2">
          <button
            className={`btn btn-sm flex-fill ${isExpanded ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={onExpand}
          >
            <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} me-1`}></i>
            {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
          </button>
          {onDelete && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={onDelete}
              title="Eliminar venta"
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          )}
        </div>

        {/* Detalles expandidos en móvil */}
        {isExpanded && venta.detalles && venta.detalles.length > 0 && (
          <div className="mt-3 border-top pt-3">
            <h6 className="mb-3 text-primary">
              <i className="bi bi-cart-fill me-2"></i>
              Productos vendidos ({venta.detalles.length})
            </h6>
            {venta.detalles.map((detalle, idx) => (
              <div key={idx} className="card mb-2 bg-light border-start border-3 border-success">
                <div className="card-body p-2">
                  <div className="fw-semibold mb-1">
                    {detalle.nombreProducto || '-'}
                  </div>
                  <small className="text-muted d-block mb-2">
                    <i className="bi bi-bookmark me-1"></i>
                    {detalle.marcaProducto} - {detalle.categoriaProducto}
                  </small>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-secondary me-1">
                        {detalle.talla || '-'}
                      </span>
                      <span className="badge bg-info text-dark">
                        {detalle.color || '-'}
                      </span>
                    </div>
                    <div className="text-end">
                      <small className="text-muted d-block">
                        {detalle.cantidad} × {formatCurrency(detalle.precioUnitario)}
                      </small>
                      <strong className="text-success">
                        {formatCurrency(detalle.subTotal)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Total en móvil */}
            <div className="card bg-success text-white mt-3">
              <div className="card-body p-2">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">
                    <i className="bi bi-calculator me-2"></i>
                    TOTAL:
                  </span>
                  <span className="fs-5 fw-bold">
                    {formatCurrency(venta.precioTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}