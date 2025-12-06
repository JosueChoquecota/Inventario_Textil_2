import React, { useState, useEffect } from 'react'

export default function DashboardPage() {
  // Tu enlace de Power BI (tomado de tu código anterior)
  const powerBiUrl = "https://app.powerbi.com/view?r=eyJrIjoiZmRjMjFhMjMtNDViMy00MWI2LWJkNGItN2VmODIxM2YyMjQ0IiwidCI6ImM0YTY2YzM0LTJiYjctNDUxZi04YmUxLWIyYzI2YTQzMDE1OCIsImMiOjR9&pageName=49fe28e24938c770190d";
  
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Detectar automáticamente si el iframe está bloqueado después de 3 segundos
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-fluid py-0">
      {/* Header */}
      <div className="mb-4">
        <h4 className="mb-1">
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard de Inventario
        </h4>
        <small className="text-muted">
          Análisis y métricas en tiempo real
        </small>
      </div>

      {/* Power BI Dashboard Card */}
      <div className="card shadow-sm">
        <div className="card-header bg-white py-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <i className="bi bi-graph-up text-primary me-2"></i>
              <h5 className="mb-0">Reporte Interactivo</h5>
            </div>
            <span className="badge bg-success">
              <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.5rem' }}></i>
              En línea
            </span>
          </div>
        </div>
        
        <div className="card-body p-0">
          {!showFallback ? (
            /* Intentar mostrar iframe inicialmente */
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '70vh', 
              minHeight: '500px',
              maxHeight: '700px',
              overflow: 'hidden'
            }}>
              <iframe 
                title="Dashboard de Inventario Power BI"
                width="100%" 
                height="100%" 
                src={powerBiUrl}
                frameBorder="0" 
                allowFullScreen={true}
                style={{ 
                  border: 'none',
                  display: 'block'
                }}
                onLoad={() => {
                  // Si carga exitosamente, mantener el iframe
                  console.log('Dashboard cargado exitosamente');
                }}
                onError={() => {
                  // Si falla, mostrar fallback inmediatamente
                  setShowFallback(true);
                }}
              />
              
              {/* Spinner de carga */}
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="d-flex flex-column align-items-center">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <small className="text-muted">Cargando dashboard...</small>
                </div>
              </div>
            </div>
          ) : (
            /* Mostrar botón de acceso directo */
            <div className="d-flex flex-column align-items-center justify-content-center bg-light" style={{ height: '60vh', minHeight: '400px', maxHeight: '500px' }}>
              <div className="text-center p-5">
                <div className="mb-4">
                  <i className="bi bi-bar-chart-line-fill text-primary" style={{ fontSize: '4rem' }}></i>
                </div>
                <h4 className="mb-3">Dashboard de Power BI</h4>
                <p className="text-muted mb-4 px-3">
                  Por políticas de seguridad, el dashboard se abre en una nueva pestaña para garantizar 
                  la mejor experiencia y seguridad de tus datos.
                </p>
                <button 
                  className="btn btn-primary btn-lg px-4 py-2 mb-3"
                  onClick={() => window.open(powerBiUrl, '_blank', 'noopener,noreferrer')}
                >
                  <i className="bi bi-graph-up me-2"></i>
                  Acceder al Dashboard
                </button>
                <br />
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Conexión segura y cifrada
                </small>
              </div>
            </div>
          )}
          
          {/* Fallback para móviles */}
          <div className="d-block d-md-none p-3 text-center bg-light border-top">
            <small className="text-muted">
              <i className="bi bi-phone me-1"></i>
              Para mejor experiencia en móvil:
            </small>
            <br />
            <button 
              className="btn btn-outline-primary btn-sm mt-2"
              onClick={() => window.open(powerBiUrl, '_blank', 'noopener,noreferrer')}
            >
              <i className="bi bi-box-arrow-up-right me-1"></i>
              Abrir en Nueva Pestaña
            </button>
          </div>
        </div>

        <div className="card-footer bg-light py-2">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Interactúa con los filtros dentro del reporte
            </small>
            <small className="text-muted">
              <i className="bi bi-microsoft me-1"></i>
              Power BI
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}