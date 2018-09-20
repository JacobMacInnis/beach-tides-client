import React from 'react';
import { shallow } from 'enzyme';
import { TideResults } from './tide-results';

describe('<TideResults />', () => {
  it('Should render without crashing', () => {
    shallow(<TideResults />);
  });
}); 