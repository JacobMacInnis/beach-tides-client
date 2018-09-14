import {API_BASE_URL} from '../config';
import { loadAuthToken } from './../local-storage';


export const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST';
export const fetchProtectedDataRequest = () => ({
    type: FETCH_PROTECTED_DATA_REQUEST
});

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = () => (dispatch) => {
    const authToken = loadAuthToken();
    return fetch(`${API_BASE_URL}/favorites`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        dispatch(fetchProtectedDataSuccess(data))
    })
    .catch(err => {
        dispatch(fetchProtectedDataError(err));
    });
};