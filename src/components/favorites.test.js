import React from 'react';
import { shallow } from 'enzyme';
import { Favorites } from './favorites';
import './../mock-local-storage';

describe('<Favorites />', () => {
  it('Should render without crashing', () => {
    const dispatch = jest.fn();
    shallow(<Favorites favoritesData={[]} isAuthenticated={true} loading={false} theme={'night'} dispatch={dispatch}/>);
  });
}); 