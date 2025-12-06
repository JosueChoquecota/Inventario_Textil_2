import React from 'react'

export default function ProductoSelector({
  productoActual,
  setProductoActual,
  productos,
  tallasFiltradas,
  coloresFiltradas,
  cantidadDisponible,
  handleProductoChange,
  handleTallaChange,
  handleColorChange,
  agregarProducto
}) {
  return (
    <div className="card mb-3">
      <div className="card-header bg-light">
        <h6 className="mb-0">
          <i className="bi bi-box-seam me-2"></i>
          Agregar Productos
        </h6>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {/* Producto */}
          <div className="col-12 col-md-4">
            <label className="form-label">
              Producto/Modelo <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={productoActual.idProducto}
              onChange={(e) => handleProductoChange(e.target.value)}
            >
              <option value="">Seleccione un producto</option>
              {productos.map(p => {
                const nombre = p.nombre || 'Sin nombre'
                const marca = p.marca?.nombre || p.marcaNombre || 'Sin marca'
                return (
                  <option key={p.idProducto || p.id} value={p.idProducto || p.id}>
                    {nombre} - {marca}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Talla */}
          <div className="col-6 col-md-2">
            <label className="form-label">
              Talla <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={productoActual.idTalla}
              onChange={(e) => handleTallaChange(e.target.value)}
              disabled={!productoActual.idProducto}
            >
              <option value="">Seleccione</option>
              {tallasFiltradas.map(t => {
                const talla = t.talla || t.nombre || t.descripcion || 'Sin talla'
                return (
                  <option key={t.idTalla || t.id} value={t.idTalla || t.id}>
                    {talla}
                  </option>
                )
              })}
            </select>
          </div>
          
          {/* Color */}
          <div className="col-6 col-md-2">
            <label className="form-label">
              Color <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={productoActual.idColor}
              onChange={(e) => handleColorChange(e.target.value)}
              disabled={!productoActual.idTalla}
            >
              <option value="">Seleccione</option>
              {coloresFiltradas.map(c => {
                const color = c.color || c.nombre || c.descripcion || 'Sin color'
                return (
                  <option key={c.idColor || c.id} value={c.idColor || c.id}>
                    {color}
                  </option>
                )
              })}
            </select>
          </div>
          
          {/* Precio Unitario */}
          <div className="col-6 col-md-2">
            <label className="form-label">Precio Unit.</label>
            <div className="input-group">
              <span className="input-group-text">S/</span>
              <input
                type="number"
                className="form-control"
                value={productoActual.precioUnitario}
                onChange={(e) => setProductoActual({ ...productoActual, precioUnitario: e.target.value })}
                min="0.01"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>
          
          {/* Cantidad */}
          <div className="col-6 col-md-2">
            <label className="form-label">
              Cantidad
              {cantidadDisponible !== null && (
                <small className="text-success ms-1">(Stock: {cantidadDisponible})</small>
              )}
            </label>
            <input
              type="number"
              className="form-control"
              value={productoActual.cantidad}
              onChange={(e) => setProductoActual({ ...productoActual, cantidad: e.target.value })}
              min="1"
              max={cantidadDisponible || undefined}
              placeholder="1"
              disabled={!cantidadDisponible || cantidadDisponible === 0}
            />
          </div>
          
          {/* Botón Agregar */}
          <div className="col-12">
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={agregarProducto}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Agregar Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}