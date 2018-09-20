import React from 'react';
import { shallow } from 'enzyme';
import { Theme } from './theme';

describe('<Theme />', () => {
  it('Should render without crashing', () => {
    shallow(<Theme />);
  });
}); 