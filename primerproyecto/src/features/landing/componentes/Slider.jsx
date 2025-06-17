import React from 'react';
import imagen10 from '../../../assets/imagen10.png';
import imagen2 from '../../../assets/imagen2.png';
import imagen9 from '../../../assets/imagen9.png';

function Slider() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ width: '100%', height: '500px', margin: '0 auto', marginTop: '60px' }}>
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner" style={{ height: '100%' }}>
        <div className="carousel-item active" style={{ height: '100%' }}>
          <img src={imagen10} className="d-block w-100 h-100" alt="Slide 1" style={{ objectFit: 'cover' }} />
        </div>
        <div className="carousel-item" style={{ height: '100%' }}>
          <img src={imagen2} className="d-block w-100 h-100" alt="Slide 2" style={{ objectFit: 'cover' }} />
        </div>
        <div className="carousel-item" style={{ height: '100%' }}>
          <img src={imagen9} className="d-block w-100 h-100" alt="Slide 3" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Slider;
