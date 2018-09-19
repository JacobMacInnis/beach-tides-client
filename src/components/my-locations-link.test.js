import React from 'react';
import { shallow, mount } from 'enzyme';
import MyLocationsLink from './my-locations-link';
import { MemoryRouter } from 'react-router';
import { Link } from 'react-router-dom';

describe.only('<MyLocationsLink />', () => {
  it('Should render without crashing', () => {
    shallow(<MyLocationsLink />);
  });
  it('Should link to ./favorites path', () => {
    const wrapper = mount(<MemoryRouter><MyLocationsLink /></MemoryRouter>);
    expect(wrapper.find(Link).props().to).toBe('/favorites');
  });
}); 