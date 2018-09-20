import {  CHANGE_THEME_REQUEST, changeThemeRequest, CHANGE_THEME_SUCCESS, changeThemeSuccess, CHANGE_THEME_ERROR, changeThemeError, GET_THEME_REQUEST, getThemeRequest, GET_THEME_SUCCESS, getThemeSuccess, GET_THEME_ERROR, getThemeError, SET_THEME_ON_LOGOUT, setThemeOnLogout } from './../actions/theme';

describe('changeThemeRequest', () => {
    it('Should return the action', () => {
        const action = changeThemeRequest();
        expect(action.type).toEqual(CHANGE_THEME_REQUEST);
    });
});
describe('changeThemeSuccess', () => {
  it('Should return users theme', () => {
    const theme = 'day or night';
    const action = changeThemeSuccess(theme);
    expect(action.type).toEqual(CHANGE_THEME_SUCCESS);
    expect(action.theme).toEqual(theme);
  });
});
describe('changeThemeError', () => {
  it('Should return error from theme change request', () => {
    const err = {};
    const action = changeThemeError(err);
    expect(action.type).toEqual(CHANGE_THEME_ERROR);
    expect(action.err).toEqual(err);
  });
});
describe('getThemeRequest', () => {
  it('Should return the action', () => {
      const action = getThemeRequest();
      expect(action.type).toEqual(GET_THEME_REQUEST);
  });
});
describe('getThemeSuccess', () => {
  it('Should return users theme', () => {
    const theme = 'day or night';
    const action = getThemeSuccess(theme);
    expect(action.type).toEqual(GET_THEME_SUCCESS);
    expect(action.theme).toEqual(theme);
  });
});
describe('getThemeError', () => {
  it('Should return error from theme change request', () => {
    const err = {};
    const action = getThemeError(err);
    expect(action.type).toEqual(GET_THEME_ERROR);
    expect(action.err).toEqual(err);
  });
});
describe('setThemeOnLogout', () => {
  it('Should return the action', () => {
    const action = setThemeOnLogout();
    expect(action.type).toEqual(SET_THEME_ON_LOGOUT);
  });
});