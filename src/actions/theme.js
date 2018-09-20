import { API_BASE_URL } from '../config';
import { loadAuthToken } from './../local-storage';

export const CHANGE_THEME_REQUEST = 'CHANGE_THEME_REQUEST';
export const changeThemeRequest = () => ({
  type: CHANGE_THEME_REQUEST
})
export const CHANGE_THEME_SUCCESS = 'CHANGE_THEME_SUCCESS';
export const changeThemeSuccess = theme => ({
  type: CHANGE_THEME_SUCCESS,
  theme
});
export const CHANGE_THEME_ERROR = 'CHANGE_THEME_ERROR';
export const changeThemeError = err => ({
  type: CHANGE_THEME_ERROR,
  err
});
export const GET_THEME_REQUEST = 'GET_THEME_REQUEST';
export const getThemeRequest = () => ({
  type: GET_THEME_REQUEST,
});
export const GET_THEME_SUCCESS = 'GET_THEME_SUCCESS';
export const getThemeSuccess = theme => ({
  type: GET_THEME_SUCCESS,
  theme
});
export const GET_THEME_ERROR = 'GET_THEME_ERROR';
export const getThemeError = err => ({
  type: GET_THEME_ERROR,
  err
});
export const SET_THEME_ON_LOGOUT = 'SET_THEME_ON_LOGOUT';
export const setThemeOnLogout = () => ({
  type: SET_THEME_ON_LOGOUT
});

export const changeTheme = toggleTheme => dispatch => {
  dispatch(changeThemeRequest());
  const authToken = loadAuthToken();
  return fetch(`${API_BASE_URL}/user-theme`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({toggleTheme})
  })
  .then(res => res.json())
  .then((data) => {
    dispatch(changeThemeSuccess(data.theme));
  })
  .catch(err => dispatch(changeThemeError(err))
  )
}

export const fetchTheme = () => dispatch => {
  dispatch(getThemeRequest());
  const authToken = loadAuthToken();
  return fetch(`${API_BASE_URL}/user-theme`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then((data) => {
  dispatch(getThemeSuccess(data.theme));
  })
  .catch(err => {
    dispatch(getThemeError(err));
  });
}