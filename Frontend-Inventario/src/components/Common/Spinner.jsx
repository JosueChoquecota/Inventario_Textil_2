import React from 'react'

export default function Spinner({size='4rem',fullScreen=false}) {
  return (
    <div
        className={`d-flex justify-content-center align-items-center ${
            fullScreen ? 'position-fixed top-0 start-0 vw-100 vh-100 bg-white bg-opacity-75' : ''}`}
        style={{
            height: fullScreen ? '100%' : '60hv',
            background: fullScreen ? 'rgba(255, 255, 255, 0.75)' : 'transparent',
            zIndex: fullScreen ? 1060 : 'auto'
        }}
    >
        <div 
        className='spinner-border text-primary'
        style={{width: size, height: size}}
        role='status'
        >
            <span className='visually-hidden'>Cargando...</span>
        </div>
    </div>
  )
}
