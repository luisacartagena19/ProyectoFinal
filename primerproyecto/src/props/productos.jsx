import React from "react"



export function MostrarProductos({ nombre, marca, precio, tipoProducto, colores, imagen }) {
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
            <button className="btn btn-danger">Comprar</button>
        </div>
    )
}