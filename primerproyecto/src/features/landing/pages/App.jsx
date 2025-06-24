import '../../../shared/estiloLanding.css'
import Header from '../componentes/Header.jsx'
import Slider from '../componentes/Slider.jsx'
import Footer from '../componentes/footer.jsx'
import imagen4 from '../../../assets/imagen4.png';
import imagen11 from '../../../assets/imagen11.png';
import imagen12 from '../../../assets/imagen12.png';
import samy from '../../../assets/samy.png';
import bloom from '../../../assets/bloom.png';
import ame from '../../../assets/ame.png';
import melu from '../../../assets/melu.png';
import { MostrarProductos } from '../componentes/productos.jsx';
import { productosprops } from '../data/datos.js';
import Formulario from '../componentes/formulario.jsx';
import { ProductProvider } from '../hooks/ProductContext';
import { InformacionProductos } from '../componentes/informacionProductos.jsx';
import { CartProvider } from '../../cart/hooks/cartContext';
import { Cart } from '../../cart/componentes/cart.jsx';
function App() {
  // Asignar imágenes a cada producto
  // eso si me toco pedirle ayuda a la IA porque no me querian aparecer las imagenes, pero de reso si lo hice yo. Es una aclaracion jaja
  const productosConImagenes = productosprops.map((producto, index) => {
    let imagen;
    switch (index) {
      case 0:
        imagen = samy;
        break;
      case 1:
        imagen = bloom;
        break;
      case 2:
        imagen = ame;
        break;
      case 3:
        imagen = melu;
        break;

    }
    return { ...producto, imagen };
  });

  return (
    <CartProvider>
      <Header  />
      <div style={{ height: '70px' }}></div>
      <Slider />
      <h1 className="productos">LOS MÁS VENDIDOS🔝</h1>
      <section className="productos-section" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
        <div className="producto" style={{ border: '3px solid #FFB6C1', padding: '20px', width: '30%', marginBottom: '200px' }}>
          <img src={imagen4} alt="Producto 1" style={{ width: '100%', height: 'auto' }} />
          <h3>Paleta Light Set Montoc</h3>
          <p>La paleta de Montoc es un imprescindible en u kit de maquillaje, te puedes hacer un maquillaje de rostro completo, contiene rubor, iluminador y bronceador.</p>
          <button className="btn btn-danger">Conoce más</button>
        </div>
        <div className="producto" style={{ border: '3px solid #FFB6C1', padding: '20px', width: '30%', marginBottom: '50px' }}>
          <img src={imagen11} alt="Producto 2" style={{ width: '100%', height: 'auto' }} />
          <h3>Gloss Bonita AniK</h3>
          <p>Quieres tener los labios mas jugosos? Este gloss es perfecto para ti, hay 3 presentaciones y las 3 son hermosas. No deja sensación aceitosa e hidrata tus labios.</p>
         <button className="btn btn-danger">Conoce más</button>
        </div>
        <div className="producto" style={{ border: '3px solid #FFB6C1', padding: '20px', width: '30%', marginBottom: '90px' }}>
          <img src={imagen12} alt="Producto 3" style={{ width: '100%', height: 'auto' }} />
          <h3>Bye Bye Frizz by PYT</h3>
          <p>El termoprotector de PYT que aparte de que protege a tu cabello del calor excesivo, dejará tu cabello sin frizz y oliendo de una manera deliciosa.</p>
          <button className="btn btn-danger">Conoce más</button>
        </div>
      </section>
      <h1 className="productos"> ⭐NUESTROS PRODUCTOS ESTRELLA⭐</h1>
      <ProductProvider>
        <InformacionProductos startPosition={125} endPosition={129} />
        <section className="productos-section" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
          {productosConImagenes.map((producto, index) => (
            <MostrarProductos
              key={producto.id || index}
              id={producto.id || index}
              nombre={producto.nombre}
              marca={producto.marca}
              precio={producto.precio}
              tipoProducto={producto.tipoProducto}
              colores={producto.colores}
              imagen={producto.imagen}
            />
          ))}
        </section>
      </ProductProvider>
      <Formulario/>
      <Footer />
      <Cart/>
    </CartProvider>
  );
}

export default App
