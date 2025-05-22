import React from 'react';
import '../css/Footer.css';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 SUBLIME WOMAN. Todos los derechos reservados.</p>
        <nav className="footer-nav">
          <a href="#inicio">Inicio</a> | 
          <a href="#productos">Productos</a> | 
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="redes">
          <a href="https://www.facebook.com" target="_blank" rel="#">
            <img src={facebook} alt="Facebook" className="social"/>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="#">
            <img src={instagram} alt="Instagram" className="social" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
