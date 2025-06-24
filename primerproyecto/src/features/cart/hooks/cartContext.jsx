/* eslint-disable react-refresh/only-export-components */
import React, {createContext, useContext, useReducer, useRef, useEffect}from "react";
import {useNotification} from  './useNotification'

// LO QUE PUEDE HACER EL CARRITO
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  TOGGLE_CART: "TOGGLE_CART",
};


// Inicializar variables
export const initialState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount:0,
};

export function cartReducer(state, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM:{
            // Buscar si el producto existe ya en el carrito
            const existingItem = state.items.find(item => item.id === action.payload.id); //se utiliza para identificr el productos especifico al que se le hace click

            let newItems;
            if(existingItem){
                //esto es para aumentar la cantidad se hace un mapeo del estado inicial de los productos y se hace una copia con los 3 puntos en la linea 33
                newItems = state.items.map(item =>
                    item.id === action.payload.id // si el id del item es igual al id del producto que se esta agregando
                        ? {...item, quantity: item.quantity + 1} // entonces se aumenta la cantidad en 1 y los actualiza y crea una copia del producto con la cantidad aumentada
                        :item // aqui es donde se va a guardar el resto de los productos, si se agrega se actualiza y sino se deja tal cual esta el producto
                );
            }else{
                newItems = [...state.items, {...action.payload, quantity: 1}]; // si no existe el producto se agrega al carrito con una cantidad de 1   
            }

            const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // se calcula el total del carrito multiplicando el precio por la cantidad de cada producto
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0); // se calcula el total de productos en el carrito

            return{
                ...state,
                items: newItems, // se actualiza el estado de los productos en el carrito
                total: parseFloat(total.toFixed(2)), // se actualiza el total y se ponen el precio con dos decimales
                itemCount // se actualiza el total de productos en el carrito
            };
        }

        case CART_ACTIONS.REMOVE_ITEM: {
            const newItems = state.items.filter(item => item.id !== action.payload.id); // se filtra el carrito para eliminar el producto por su id
            const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // se calcula el nuevo total del carrito
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);


            return{
                 ...state,
                items: newItems, // se actualiza el estado de los productos en el carrito
                total: parseFloat(total.toFixed(2)), // se actualiza el total y se ponen el precio con dos decimales
                itemCount // se actualiza el total de productos en el carrito
            };
        }
        case CART_ACTIONS.UPDATE_QUANTITY:{
            const{id, quantity}= action.payload;

            // se borra el producto del carrito si se ve que la cantidad es menor que cero
            if(quantity <=0){
                return cartReducer(state ,{type: CART_ACTIONS.REMOVE_ITEM, payload: id});
            }

            const newItems = state.items.map(item =>
                item.id === id ?{...item, quantity}: item
            );
            const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // se calcula el nuevo total del carrito
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

             return{
                 ...state,
                items: newItems, // se actualiza el estado de los productos en el carrito
                total: parseFloat(total.toFixed(2)), // se actualiza el total y se ponen el precio con dos decimales
                itemCount // se actualiza el total de productos en el carrito
            };
        }

        case CART_ACTIONS.CLEAR_CART:
            return{
                ...state,
                items: [],
                total: 0,
                itemCount:0,
            };
            //esto es para la visibilidad del carrito si esta abierto o cerrado
            case CART_ACTIONS.TOGGLE_CART:
                return{
                    ...state,
                    isOpen: !state.isOpen
                };

            default:
                return state;    
    }
}

const CartContext = createContext();

export const useCart = () =>{
    const context = useContext(CartContext);
    if(!context){
        throw new Error('useCart debe ser utilizado dentro de un CartProvider');
    }
    return context;
}

export const CartProvider =({children}) =>{
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const cartRef = useRef(null); 
    const timeoutRef = useRef(null);
    const {showNotification} =useNotification();

    useEffect(() => {
        const handleClickOutside = (event) =>{
            if(cartRef.current && !cartRef.current.contains(event.target)){
                dispatch({type: CART_ACTIONS.TOGGLE_CART});
            }
        };

        if(state.isOpen){
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () =>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [state.isOpen]);

    const addToCart = (product) =>{
        dispatch({type: CART_ACTIONS.ADD_ITEM, payload: product});

        showNotification(`${product.title} agregado al carrito`, 'success', 2000);

        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }

        if(!state.isOpen){
            dispatch({type: CART_ACTIONS.TOGGLE_CART});
            timeoutRef.current =setTimeout(() =>{
                dispatch({type: CART_ACTIONS.TOGGLE_CART});
            }, 2000);
        }
    };

    const removeFromCart = (productId) =>{
        dispatch({type: CART_ACTIONS.REMOVE_ITEM, payload: {id: productId}});
    };

    const updateQuantity = (productId, quantity) =>{
        dispatch({type: CART_ACTIONS.UPDATE_QUANTITY, payload: {id: productId, quantity}});
    };

    const clearCart = () =>{
        dispatch({type: CART_ACTIONS.CLEAR_CART});
        showNotification('Se vacio el carrito', 'info', 1500);
    };

    const toggleCart = () =>{
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }
        dispatch({type: CART_ACTIONS.TOGGLE_CART});
    };

    const value = {
        ...state,           // items, isOpen, total, itemCount
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        cartRef
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
