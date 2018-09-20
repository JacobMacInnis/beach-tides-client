import React from 'react';
import { shallow } from 'enzyme';
import { Favorites } from './favorites';
import { fetchTheme } from './../actions/theme';
import './../mock-local-storage';

describe('<Favorites />', () => {
  const favoritesData = [{city: 'Marblehead', state: 'MA', _id: '5ba3c24973174e2131bfcee7', extremes: [{
    dt: 1537447629,
    type: 'High'
  }, {
    dt: 1537470109,
    type: 'Low'
  }, {
    dt: 1537491492,
    type: 'High'
  }, {
    dt: 1537515408,
    type: 'Low'
  }, {
    dt: 1537536954,
    type: 'High'
  }, {
    dt: 1537559363,
    type: 'Low'
  }, {
    dt: 1537580788,
    type: 'High'
  }, {
    dt: 1537604271,
    type: 'Low'
  } 
  ]}];
  it('Should render without crashing', () => {
    const dispatch = jest.fn();
    shallow(<Favorites favoritesData={[]} isAuthenticated={true} loading={false} theme={'night'} dispatch={dispatch}/>);
  }); 
  it('Should render the favoritesData', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Favorites favoritesData={favoritesData} isAuthenticated={true} loading={false} theme={'night'} dispatch={dispatch}/>
    ); 
    expect(wrapper.contains(<h2>Marblehead</h2>));
    expect(wrapper.contains(<h4>UPCOMING TIDES</h4>));
    expect(wrapper.contains(<h3>Thursday, September 20th</h3>));
    expect(wrapper.contains(<p>High Tide at 8:47 am</p>));
    expect(wrapper.contains(<h2>FAVORITE LOCATIONS</h2>));
  });
  it('Should render message when no locations have been saved', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Favorites favoritesData={[]} isAuthenticated={true} loading={false} theme={'night'} dispatch={dispatch}/>);
    expect(wrapper.contains(<h2>YOU CURRENTLY DO NOT HAVE ANY FAVORITE LOCATIONS SAVED</h2>));
    expect(wrapper.contains(<h2>FAVORITE LOCATIONS</h2>));
  });
  it('Dispatches multiple did mount functions', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Favorites favoritesData={[]} isAuthenticated={true} loading={false} theme={'night'} dispatch={dispatch}/>);
    dispatch.mockClear();
    const instance = wrapper.instance();
    instance.fetchTheme();
    expect(dispatch).toHaveBeenCalledWith(fetchTheme());
  });
  it('Redirects when isAuthenticated is false', () =>  {
    const dispatch = jest.fn();
    const wrapper = shallow(<Favorites favoritesData={favoritesData} isAuthenticated={false} loading={false} theme={'night'} dispatch={dispatch}/>);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  ; 
  })
});