import React from 'react';
import { useCart } from '../hooks/cartContext';
import '../../../shared/estiloLanding.css';

export const Cart = () => {
    const { 
        items, 
        isOpen, 
        total, 
        itemCount,
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        toggleCart,
        cartRef 
    } = useCart();

    // Si el carrito está cerrado, no renderizar nada
    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-sidebar" ref={cartRef}>
           
                <div className="cart-header">
                    <h3>
                        <i className="bi bi-cart3"></i>
                        Carrito ({itemCount})
                    </h3>
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={toggleCart}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                {/* Contenido del carrito */}
                <div className="cart-content">
                    {items.length === 0 ? (
                        // Estado vacío
                        <div className="empty-cart">
                            <i className="bi bi-cart-x display-4 text-muted"></i>
                            <p className="text-muted mt-3">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <>
                            {/* Lista de productos */}
                            <div className="cart-items">
                                {items.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeFromCart}
                                    />
                                ))}
                            </div>

                            {/* Footer con total y acciones */}
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <h4>Total: ${total}</h4>
                                </div>
                                
                                <div className="cart-actions">
                                    <button 
                                        className="btn btn-outline-danger btn-sm me-2"
                                        onClick={clearCart}
                                    >
                                        <i className="bi bi-trash"></i>
                                        Vaciar
                                    </button>
                                    <button className="btn btn-info">
                                        <i className="bi bi-credit-card"></i>
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Componente para cada producto en el carrito
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="cart-item">
            {/* Imagen del producto */}
            <img 
                src={item.image} 
                alt={item.title}
                className="cart-item-image"
            />
            
            {/* Detalles del producto */}
            <div className="cart-item-details">
                <h6 className="cart-item-title">{item.title}</h6>
                <p className="cart-item-price">${item.price}</p>
                
                {/*  Controles de cantidad */}
                <div className="quantity-controls">
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                        <i className="bi bi-dash"></i>
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
                
                {/* Subtotal */}
                <div className="item-total">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
            
            {/* Botón eliminar */}
            <button 
                className="btn btn-outline-danger btn-sm remove-btn"
                onClick={() => onRemove(item.id)}
            >
                <i className="bi bi-x"></i>
            </button>
        </div>
    );
};