import { FETCH_LOCATION_REQUEST, fetchLocationRequest, FETCH_LOCATION_SUCCESS, fetchLocationSuccess, FETCH_LOCATION_ERROR, fetchLocationError, CLEAR_TIDE_DATA, clearTideData } from "../actions";

describe('fetchLocationRequest', () => {
  it('Should return the action', () => {
      const action = fetchLocationRequest();
      expect(action.type).toEqual(FETCH_LOCATION_REQUEST);
  });
});
describe('fetchLocationSuccess', () => {
  it('Should return an array of data', () => {
    const location = {
      extremes: [],
      city: 'cityName',
      state: 'stateName',
      date: 'dateString'
    };
    const action = fetchLocationSuccess(location);
    expect(action.type).toEqual(FETCH_LOCATION_SUCCESS);
    expect(action.tideData).toEqual(location.extremes);
    expect(action.city).toEqual(location.city);
    expect(action.state).toEqual(location.state);
    expect(action.date).toEqual(location.date);
  });
});
describe('fetchLocationError', () => {
  it('Should return error from search request', () => {
    const err = {};
    const action = fetchLocationError(err);
    expect(action.type).toEqual(FETCH_LOCATION_ERROR);
    expect(action.error).toEqual(err);
  });
});
describe('clearTideData', () => {
  it('Should return action', () => {
    const action = clearTideData();
    expect(action.type).toEqual(CLEAR_TIDE_DATA);
    
  });
});
