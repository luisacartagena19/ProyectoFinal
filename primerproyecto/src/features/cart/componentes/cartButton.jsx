import React from 'react';
import { useCart } from '../hooks/cartContext';

export const CartButton = () => {
    const { itemCount, toggleCart } = useCart();

    return (
        <button 
            className="btn btn-outline-danger position-relative mt-2 mb-2 pt-0 pb-0 " 
            onClick={toggleCart}
        >
            <i
                className="bi bi-cart3 text-danger"
                style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.classList.replace('text-danger', 'text-white')}
                onMouseLeave={e => e.currentTarget.classList.replace('text-white', 'text-danger')}
            ></i>
            {/* Badge con cantidad (solo si hay productos) */}
            {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                    <span className="visually-hidden">productos en el carrito</span>
                </span>
            )}
        </button>
    );
};