import { AUTH_REQUEST, authRequest, AUTH_SUCCESS, authSuccess, AUTH_ERROR, authError, LOGOUT, logout } from './auth';

describe('authRequest', () => {
    it('Should return the action', () => {
        const action = authRequest();
        expect(action.type).toEqual(AUTH_REQUEST);
    });
});
describe('authSuccess', () => {
  it('Should return authToken and User', () => {
    const user = {};
    const token = 'testToken'
    const action = authSuccess(user, token);
    expect(action.type).toEqual(AUTH_SUCCESS);
    expect(action.user).toEqual(user);
    expect(action.token).toEqual(token);
  });
});
describe('authError', () => {
  it('Should return error', () => {
    const error = {};
    const action = authError(error);
    expect(action.type).toEqual(AUTH_ERROR);
    expect(action.error).toEqual(error);
  });
});
describe('logOut', () => {
  it('Should return the action', () => {
    const action = logout();
    expect(action.type).toEqual(LOGOUT);
  })
})