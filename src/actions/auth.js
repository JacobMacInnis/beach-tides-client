// import {saveAuthToken, clearAuthToke} from '../local-storage';


export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (user, token) => ({
    type: AUTH_SUCCESS,
    user,
    token
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT,
})


// dispatch(authRequest());
// dispatch(authError(err));
// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
// export const storeAuthInfo = (authToken, dispatch) => {
//   // const decodedToken = jwtDecode(authToken);
//   dispatch(setAuthToken(authToken));
//   dispatch(authSuccess(decodedToken.user));
//   // saveAuthToken(authToken);
// };