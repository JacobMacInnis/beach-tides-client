import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from './logout';

describe('<Logout />', () => {
  it('Should render without crashing', () => {
    shallow(<Logout />);
  });
});