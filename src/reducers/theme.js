import {  CHANGE_THEME_REQUEST, CHANGE_THEME_SUCCESS, CHANGE_THEME_ERROR, GET_THEME_REQUEST, GET_THEME_SUCCESS, GET_THEME_ERROR, SET_THEME_ON_LOGOUT } from './../actions/theme';

const initialState = {
  loading: false,
  error: null,
  theme: 'day',
  serverMessage: ''
};

export default function themeReducer(state=initialState, action) {
  if (action.type === CHANGE_THEME_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      serverMessage: 'Setting your new theme'
    })
  } else if (action.type === CHANGE_THEME_SUCCESS) {
    if (state.theme === 'day') {
      return Object.assign({}, state, {
        theme: 'night',
        loading: false,
        error: null
      })
    } else if (state.theme === 'night') {
      return Object.assign({}, state, {
        theme: 'day',
        loading: false,
        error: null,
        serverMessage: ''
      })
    } 
  } else if (action.type === CHANGE_THEME_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
      serverMessage: 'Error'
    })
  }  else if (action.type === GET_THEME_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      serverMessage: 'Getting your theme'
    })
  } else if (action.type === GET_THEME_SUCCESS) {
    return Object.assign({}, state, {
      theme: action.theme,
      loading: false,
      error: null
    }) 
  } else if (action.type === GET_THEME_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
      serverMessage: 'Error'
    })
  } else if (action.type === SET_THEME_ON_LOGOUT) {
    return Object.assign({}, state, {
      theme: 'day'
    })
  }
  return state;
}