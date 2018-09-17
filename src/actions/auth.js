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
});