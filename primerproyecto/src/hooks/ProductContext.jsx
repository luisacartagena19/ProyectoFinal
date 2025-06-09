/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [contador, setContador] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [carritoComprado, setCarritoComprado] = useState(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const agregarAlCarrito = (id) => {
    setCarritoComprado(prev => {
      const nuevoSet = new Set(prev);
      nuevoSet.add(id);
      return nuevoSet;
    });
    alert('Los productos fueron agregados al carrito');
  };

  return (
    <ProductContext.Provider value={{ contador, setContador, loading, error, products, carritoComprado, agregarAlCarrito }}>
      {children}
    </ProductContext.Provider>
  );
};
