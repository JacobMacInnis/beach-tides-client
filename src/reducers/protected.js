import {
  FETCH_PROTECTED_DATA_REQUEST,
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

const initialState = {
  loading: false,
  data: [],
  error: null
};

export default function protectedReducer(state = initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } 
  else if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
    console.log(action.data, 'data')
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
  }
  return state;
}
