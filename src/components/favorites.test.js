import React from 'react';
import { shallow } from 'enzyme';
import { Favorites } from './favorites';
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
    expect(wrapper.contains(<h2></h2>))
  });
});