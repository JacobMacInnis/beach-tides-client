import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from './nav';

describe('<Nav />', () => {
  it('Should render without crashing', () => {
    shallow(<Nav />);
  });
});