import React, { useContext, useState } from "react";
import { ProductContext } from "../hooks/ProductContext";

export function MostrarProductos({ id, nombre, marca, precio, tipoProducto, colores, imagen }) {
    const { carritoComprado, agregarAlCarrito } = useContext(ProductContext);
    const [contador , setContador] = useState(0);

    const aumentar = () => {
        if (contador < 10) {
            setContador(contador + 1)
        }
    }
    const disminuir = () => {
        if (contador > 0) {
            setContador(contador - 1)
        }
    }
    const resetear = () => setContador(0)

    const handleComprar = () => {
        if (contador > 0) {
            agregarAlCarrito(id);
        } else {
            alert("Por favor selecciona una cantidad mayor a 0");
        }
    }

    const productoComprado = carritoComprado.has(id);

    return (
        <div className="producto2" style={{ border: '3px solid #FFB6C1', padding: '20px', width: '30%', marginBottom: '200px'}}>

            <img src={imagen} alt={nombre} style={{ width: '100%', height: 'auto' }} />
            <h3>{nombre} </h3>
            <p>
                <strong>Marca:</strong> {marca} <br />
                <strong>Precio:</strong> {precio} <br />
                <strong>Tipo Producto:</strong> {tipoProducto} <br />
                <strong>Colores Disponibles:</strong> {colores.join(' ,')} <br />
            </p>
            <div className="d-flex gap-3 align-items-center mb-3">
                <button className="btn btn-danger" onClick={handleComprar} disabled={productoComprado}>Comprar</button>
                <button className="btn btn-info" disabled={productoComprado}>Cantidad: {contador} </button>
            </div>
            <div className="d-flex gap-2 mb-2">
                <button className="btn btn-info" onClick={aumentar} disabled={productoComprado}>+</button>
                <button className="btn btn-info" onClick={disminuir} disabled={productoComprado}>-</button>
                <button className="btn btn-success" onClick={resetear} disabled={productoComprado}>Resetear</button>
            </div>
        </div>
    )
}
