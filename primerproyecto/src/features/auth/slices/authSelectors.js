export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

// estas son funciones que permiten acceder de manera sencilla y reutilizable a partes específicas del estado global de la aplicación.
//  Estos selectors extraen datos del estado de autenticación.
// selectAuth: devuelve todo el estado de autenticación.
// selectUser: devuelve el usuario actual.
// selectIsAuthenticated: indica si el usuario está autenticado.
// selectIsLoading: indica si hay una operación de carga en curso.
// selectError: devuelve cualquier error relacionado con la autenticación.

// despues estos selectors se importaran en useAuth para acceder al estado de la autenticacion.
//  y poder realizar acciones basadas en el estado de autenticación.