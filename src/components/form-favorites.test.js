import React from 'react';
import { shallow } from 'enzyme';
import { FormFavorites } from './form-favorites';

describe('<FormFavorites />', () => {
  it('Should render without crashing', () => {
    shallow(<FormFavorites />);
  });
});