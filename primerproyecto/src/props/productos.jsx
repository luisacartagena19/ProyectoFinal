import React, { useState } from "react";

export function MostrarProductos({ nombre, marca, precio, tipoProducto, colores, imagen }) {
    const [contador , setContador] = useState(0)
    const aumentar = () => setContador(contador + 1)
    const disminuir = () => setContador(contador - 1)
    const resetear = () => setContador(0)
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
                <button className="btn btn-danger">Comprar</button>
                <button className="btn btn-info">Cantidad: {contador} </button>
            </div>
            <div className="d-flex gap-2 mb-2">
                <button className="btn btn-info" onClick={aumentar}>+</button>
                <button className="btn btn-info" onClick={disminuir}>-</button>
                <button className="btn btn-success" onClick={resetear}>Resetear</button>
            </div>
        </div>
    )
}
