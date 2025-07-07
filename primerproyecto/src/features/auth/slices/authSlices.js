
// Este slice exporta las acciones para ser usadas en otras partes de la aplicación y el reducer para ser incluido en el store de Redux.
// un slice agrupa el estado y la lógica para una funcionalidad específica. Esto se exportara a index.js
import {createSlice} from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState={
    user: userFromStorage, 
    isAuthenticated: !!userFromStorage,
    isLoading: false,
    error: null
};


const authSlice =createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginStart: (state) =>{
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) =>{
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null; 
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure: (state, action) =>{
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) =>{
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user');
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
