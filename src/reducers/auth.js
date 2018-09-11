import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGOUT
} from '../actions/auth';

const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false, 
    user: null, 
    token: ''// authToken !== null does not mean it has been validated
};

export default function authReducer(state = initialState, action) {
    if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            isAuthenticated: true,
            user: action.user,
            token: action.token
        });
    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    } else if (action.type === LOGOUT) {
      return Object.assign({}, state, {
        isAuthenticated: null,
        user: null,
        token: ''
      })
    }
    return state;
}
