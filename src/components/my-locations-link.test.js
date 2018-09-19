import React from 'react';
import { shallow, mount } from 'enzyme';
import MyLocationsLink from './my-locations-link';
import { MemoryRouter } from 'react-router';
import { Link } from 'react-router-dom';

describe('<MyLocationsLink />', () => {
  it('Should render without crashing', () => {
    shallow(<MyLocationsLink />);
  });
  it('Should link to ./favorites path', () => {
    const wrapper = shallow(<MemoryRouter><MyLocationsLink /></MemoryRouter>);
    expect(wrapper.find(Link).props().to).toBe('/favorites');
  });
});
  //   const items = ['Item 1', 'Item 2', 'Item 3'];
  //   const wrapper = shallow(<Favorites />);
  //   wrapper.setState({
  //     items
  //   });
  //   const lis = wrapper.find('.todo-item');
  //   expect(lis.length).toEqual(items.length);
  //   lis.forEach(li => {
  //     expect(li.text()).toEqual(items[index]);
  //   });
  // });
  // it('Should add an item when the form is submitted', () => {
  //   const items = ['Item 1', 'Item 2', 'Item 3'];
  //   const wrapper = mount(<Favorites />);
  //   wrapper.setState({
  //     items
  //   });
  //   const input = wrapper.find('#textInput');
  //   input.instance().value = 'Item 4';
  //   console.log(input.debug());

  //   const form = wrapper.find('form');
  //   form.simulate('submit');
  //   expect(wrapper.state('items')).toEqual([...items, toAdd]);
  // });
// });