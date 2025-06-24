import React, { useState } from "react";
import { useCart } from "../../cart/hooks/cartContext";
import { useNotification } from "../../cart/hooks/useNotification";

export function MostrarProductos({ id, nombre, marca, precio, tipoProducto, colores, imagen }) {
    const { addToCart } = useCart();
    const { showNotification } = useNotification();
    const [contador, setContador] = useState(1);
    const [statusBtn, setStatusBtn] = useState(false);

    const aumentarDisabled = contador >= 10;
    const disminuirDisabled = contador <= 1;

    const aumentar = () => {
        if (!aumentarDisabled) {
            setContador(contador + 1);
        }
    };

    const disminuir = () => {
        if (!disminuirDisabled) {
            setContador(contador - 1);
        }
    };

    const handleAgregarAlCarrito = () => {
        const product = {
            id,
            title: nombre,
            price: precio,
            image: imagen,
            description: marca,
            category: tipoProducto,
        };

        for (let i = 0; i < contador; i++) {
            addToCart(product);
        }

        showNotification(`${nombre} agregado al carrito`, "success", 2000);

        setStatusBtn(true);
        setTimeout(() => {
            setStatusBtn(false);
            setContador(1);
        }, 1000);
    };

    return (
        <div className="producto2" style={{ border: "3px solid #FFB6C1", padding: "20px", width: "30%", marginBottom: "200px" }}>
            <img src={imagen} alt={nombre} style={{ width: "100%", height: "auto" }} />
            <h3>{nombre} </h3>
            <p>
                <strong>Marca:</strong> {marca} <br />
                <strong>Precio:</strong> {precio} <br />
                <strong>Tipo Producto:</strong> {tipoProducto} <br />
                <strong>Colores Disponibles:</strong> {colores.join(" ,")} <br />
            </p>
            <div className="d-flex gap-3 align-items-center mb-3">
                <button className="btn btn-danger" onClick={handleAgregarAlCarrito} disabled={statusBtn}>
                    {statusBtn ? "Agregado" : "Agregar al carrito"}
                </button>
                <button className="btn btn-info" disabled>
                    Cantidad: {contador}
                </button>
            </div>
            <div className="d-flex gap-2 mb-2">
                <button className="btn btn-info" onClick={aumentar} disabled={aumentarDisabled}>
                    +
                </button>
                <button className="btn btn-info" onClick={disminuir} disabled={disminuirDisabled}>
                    -
                </button>
                <button className="btn btn-success" onClick={() => setContador(1)} disabled={statusBtn}>
                    Resetear
                </button>
            </div>
        </div>
    );
}
