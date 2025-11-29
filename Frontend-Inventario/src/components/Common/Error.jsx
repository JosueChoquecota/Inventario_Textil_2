import ErrorImage from '../../assets/noBackError.svg'

export default function error({message = 'Ha ocurrido un error'}) {
  return (
    <div className="row">
      <div className="col-12 text-center"> 
        
        {/* Contenedor del texto (sin alerta visible) */}
        <div className="p-2pb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 className="alert-heading">¡Error de Carga!</h1>
          <p className="lead mb-0">{message}</p> 
        </div>
        
        {/* Contenedor para la imagen, centrado y con margen superior negativo */}
        <div style={{ maxWidth: '650px', marginTop: '-7rem', marginLeft: 'auto', marginRight: 'auto' }}> 
            <img 
              src={ErrorImage} 
              alt="Ilustración de error de carga"
              className="img-fluid d-block mx-auto" 
            />
        </div>
      </div>
    </div>
  )
}
