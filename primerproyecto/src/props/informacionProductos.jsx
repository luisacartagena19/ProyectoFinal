import React, { useContext } from 'react';
import { ProductContext } from '../hooks/ProductContext';
import { MostrarProductos } from './productos.jsx';

export const InformacionProductos = ({ startPosition = 0, endPosition }) => {
  const { loading, error, products } = useContext(ProductContext);

  if (loading) {
    return <div className="spinner">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const productosFiltrados = endPosition !== undefined ? products.slice(startPosition, endPosition) : products.slice(startPosition);

  return (
    <section className="productos-section" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
      {productosFiltrados.map((producto) => (
        <MostrarProductos
          key={producto.id}
          id={producto.id}
          nombre={producto.name}
          marca={producto.brand}
          precio={producto.price}
          tipoProducto={producto.product_type}
          colores={producto.product_colors ? producto.product_colors.map(c => c.colour_name) : []}
          imagen={producto.image_link}
        />
      ))}
    </section>
  );
};
