import React from 'react';
import { Link } from 'react-router-dom';

import '../../../shared/estiloLanding.css';
import logoSub from '../../../assets/logoSub.png';
import lupa from '../../../assets/lupa.png';
import { CartButton } from '../../cart/componentes/cartButton';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logoSub} alt="Logo Cosmeticos" style={{ height: '100px', width: '170px' }} />
           <Link to="/login" className="btn btn-danger">Iniciar Sesión</Link>
      </div>
      
      <nav>
     
        <a href="#inicio" className="nav-link">Inicio</a>
        <a href="#productos" className="nav-link">Productos</a>
        <a href="#contacto" className="nav-link">Contacto</a>
      </nav>
      <div className="icono-lupa">
         <CartButton />
        <input 
          type="text" 
          placeholder="Buscar..." 
          className="search-input"
        />
        <img src={lupa} alt="Icono de lupa" className="lupa" />
        
      </div>
    </header>
  );
}

export default Header;
