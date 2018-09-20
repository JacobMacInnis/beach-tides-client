import {
  FETCH_PROTECTED_DATA_REQUEST, fetchProtectedDataRequest,
  FETCH_PROTECTED_DATA_SUCCESS, fetchProtectedDataSuccess, 
  FETCH_PROTECTED_DATA_ERROR, fetchProtectedDataError 
} from '../actions/protected-data';

describe('fetchProtectedDataRequest', () => {
    it('Should return the action', () => {
        const action = fetchProtectedDataRequest();
        expect(action.type).toEqual(FETCH_PROTECTED_DATA_REQUEST);
    });
});
describe('fetchProtectedDataSuccess', () => {
  it('Should return an array of data', () => {
    const data = [];
    const action = fetchProtectedDataSuccess(data);
    expect(action.type).toEqual(FETCH_PROTECTED_DATA_SUCCESS);
    expect(action.data).toEqual(data);
  });
});
describe('fetchProtectedDataError', () => {
  it('Should return error from theme change request', () => {
    const error = {};
    const action = fetchProtectedDataError(error);
    expect(action.type).toEqual(FETCH_PROTECTED_DATA_ERROR);
    expect(action.error).toEqual(error);
  });
});
