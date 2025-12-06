import React from 'react'

export default function DatosGenerales({ 
  formData, 
  setFormData, 
  clientes, 
  trabajadores 
}) {
  return (
    <div className="card mb-3">
      <div className="card-header bg-light">
        <h6 className="mb-0">
          <i className="bi bi-info-circle me-2"></i>
          Datos Generales
        </h6>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {/* Cliente */}
          <div className="col-12 col-md-6">
            <label className="form-label">
              Cliente <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={formData.idCliente}
              onChange={(e) => setFormData({ ...formData, idCliente: e.target.value })}
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(c => {
                const nombre = c.nombres || c.nombre || c.razonSocial || 'Sin nombre'
                const doc = c.documento || c.nDocumento || c.ruc || 'Sin documento'
                return (
                  <option key={c.idCliente || c.id} value={c.idCliente || c.id}>
                    {nombre} - {doc}
                  </option>
                )
              })}
            </select>
          </div>
          
          {/* Trabajador */}
          <div className="col-12 col-md-6">
            <label className="form-label">
              Trabajador <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={formData.idTrabajador}
              onChange={(e) => setFormData({ ...formData, idTrabajador: e.target.value })}
              required
            >
              <option value="">Seleccione un trabajador</option>
              {trabajadores.map(t => {
                const nombres = t.nombres || t.nombre || ''
                const apellidos = t.apellidos || t.apellido || ''
                const nombreCompleto = `${nombres} ${apellidos}`.trim() || 'Sin nombre'
                return (
                  <option key={t.idTrabajador || t.id} value={t.idTrabajador || t.id}>
                    {nombreCompleto}
                  </option>
                )
              })}
            </select>
          </div>
          
          {/* Fecha */}
          <div className="col-12 col-md-6">
            <label className="form-label">
              Fecha de Venta <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}