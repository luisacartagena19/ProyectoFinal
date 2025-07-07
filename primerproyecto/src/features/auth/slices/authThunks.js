import { createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUser } from '../services/authServices';
import { loginStart, loginSuccess, loginFailure } from './authSlices';

// un thunk es una funcion de redux que maneja logica asincrona, primero loginUser recibe los datos del usuario y despacha la accion de que el login empezo.
// o sea con el loginStart, despues llama al servidor para autenticar los datos del usuario (authenticateUser), si todo es correcto despacha el inicio de sesion con loginSuccess.
// si hay un error ya sea en el correo o la contraseña despacha la accion de loginFailure.
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      const user = await authenticateUser(credentials);
      if (user) {
        dispatch(loginSuccess(user));
        return user;
      } else {
        dispatch(loginFailure('Credenciales incorrectas'));
        return rejectWithValue('Credenciales incorrectas');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      return rejectWithValue(error.message);
    }
  }
);

// este thunk recarga la pagina con los datos desde localstorage para que la sesion se mantenga activa y mostrando toda la informacion sin cerrar la sesion
// autoLogin carga los datos que se almacenaron en el localstorage.
// loginSucces mantiene el inicio de sesion si los datos existen.
export const autoLogin = createAsyncThunk(
  'auth/autoLogin',
  async (_, { dispatch }) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if (user) {
      dispatch(loginSuccess(user));
    }
  }
);
