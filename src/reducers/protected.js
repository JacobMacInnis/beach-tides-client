import {
  FETCH_PROTECTED_DATA_REQUEST,
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
  SET_REDIRECT,
  UN_SET_REDIRECT
} from '../actions/protected-data';

const initialState = {
  loading: false,
  data: [],
  error: null,
  renderRedirect: false
};

export default function protectedReducer(state = initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } 
  else if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      loading: false,
      error: null
      });
  } 
  else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === SET_REDIRECT) {
    return Object.assign({}, state, {
      renderRedirect: true
    });
  } else if (action.type === UN_SET_REDIRECT) {
    return Object.assign({}, state, {
      renderRedirect: false
    })
  }
  return state;
}
