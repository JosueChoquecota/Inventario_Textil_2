import React, { useState } from 'react';
import Spinner from '../../components/Common/Spinner';
import Error from '../../components/Common/error';

// ✅ Componente para renderizar logo CON protección contra bucles
function MarcaLogo({ url, nombre, size = 50 }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Si no hay URL, mostrar placeholder
  if (!url || hasError) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center bg-light rounded"
        style={{ 
          width: size, 
          height: size 
        }}
      >
        <i className="bi bi-image text-muted" style={{ fontSize: size * 0.4 }}></i>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {isLoading && (
        <div 
          className="d-flex align-items-center justify-content-center position-absolute"
          style={{ 
            width: size, 
            height: size 
          }}
        >
          <div className="spinner-border spinner-border-sm text-secondary" style={{ width: 20, height: 20 }} />
        </div>
      )}
      
      <img
        src={url}
        alt={nombre || 'Logo'}
        className="rounded"
        style={{ 
          width: size, 
          height: size, 
          objectFit: 'cover',
          display: isLoading ? 'none' : 'block'
        }}
        onError={(e) => {
          console.error('❌ Error al cargar logo:', url);
          setHasError(true);
          setIsLoading(false);
          e.target.onerror = null;
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}

// ✅ NUEVO: Componente de alerta de restricción
function AlertaRestriccion({ mensaje, onClose }) {
  return (
    <div className="alert alert-warning alert-dismissible fade show mb-3" role="alert">
      <div className="d-flex align-items-start">
        <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
        <div className="flex-grow-1">
          <strong>No se puede eliminar</strong>
          <p className="mb-0 mt-1 small">{mensaje}</p>
        </div>
        <button 
          type="button" 
          className="btn-close" 
          onClick={onClose}
          onRefresh={false}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

export default function TablaMarca({ 
  marcas = [],
  loading, 
  error, 
  onEdit,    
  onDelete,
  getId,
  alertaRestriccion = null,
  onCloseAlerta = null
}) {
  if (loading) return <Spinner fullScreen size='5rem' />
  if (error) return <Error />

  return (
    <div className='card mt-3 p-3'>
      {/* ✅ Mostrar alerta de restricción si existe */}
      {alertaRestriccion && onCloseAlerta && (
        <AlertaRestriccion 
          mensaje={alertaRestriccion} 
          onClose={onCloseAlerta}
        />
      )}

      <div className="mb-2">
        <strong>Marcas</strong>
        <small className="text-muted ms-2">
          ({marcas.length} {marcas.length === 1 ? 'marca' : 'marcas'})
        </small>
      </div>

      {/* Escritorio / Tablet */}
      <div className="d-none d-md-block" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}>
        <div className='table-responsive'>
          <table className="table table-hover align-middle" style={{ minWidth: 700 }}>
            <thead className="table-light sticky-top">
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Marca</th>
                <th>Descripción</th>
                <th style={{ width: 140 }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {marcas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    <i className="bi bi-inbox display-4 d-block mb-2"></i>
                    No hay marcas registradas
                  </td>
                </tr>
              ) : (
                marcas.map(t => (
                  <tr key={getId(t)}>
                    <td className="text-muted">
                      {t.idMarca}
                    </td>
                    <td>
                      <MarcaLogo 
                        url={t.logo} 
                        nombre={t.marca}
                        size={50}
                      />
                    </td>
                    <td>
                      <strong>{t.marca}</strong>
                    </td>
                    <td className="text-muted small">
                      {t.descripcion || '—'}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary" 
                          title="Editar" 
                          onClick={() => onEdit(t)}
                        >
                          <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          title="Eliminar" 
                          onClick={() => onDelete(t)}
                        >
                          <i className="bi bi-trash-fill" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Móvil - Igual a TablaInventario */}
      <div className='d-block d-md-none'>
        {marcas.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i className="bi bi-inbox display-4 d-block mb-2"></i>
            No hay marcas registradas
          </div>
        ) : (
          marcas.map(t => {
            const id = getId(t);
            return (
              <div key={id} className="card mb-2 shadow-sm ">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    {/* ✅ Logo a la izquierda */}
                    <MarcaLogo 
                      url={t.logo} 
                      nombre={t.marca}
                      size={60}
                    />
                    
                    {/* ✅ Información en el centro */}
                    <div className="flex-grow-1 ms-3">
                      <div className="fw-bold mb-1">
                        <span className="text-muted small">{id}</span> · {t.marca}
                      </div>
                      
                      {t.descripcion && (
                        <div className="small text-muted mb-2">
                          {t.descripcion}
                        </div>
                      )}
                    </div>
                    
                    {/* ✅ Botones a la derecha en columna */}
                    <div className="d-flex flex-column gap-2 ms-3">
                      <button 
                        className="btn btn-sm btn-outline-primary" 
                        style={{
                          width: '50px',
                          height: '50px',
                          padding: 0
                        }}
                        title="Editar"
                        onClick={() => onEdit(t)}
                      >
                        <i className="bi bi-pencil-fill" aria-hidden="true"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger" 
                        style={{
                          width: '50px',
                          height: '50px',
                          padding: 0
                        }}
                        title="Eliminar"
                        onClick={() => onDelete(t)}
                      >
                        <i className="bi bi-trash-fill" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}
