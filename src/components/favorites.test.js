import React from 'react';
import { shallow, mount } from 'enzyme';
import Favorites from './favorites';

describe('<Favorites />', () => {
  it('Should render without crashing', () => {
    shallow(<Favorites />);
  });
  it('Should render the items in the todo list', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const wrapper = shallow(<Favorites />);
    wrapper.setState({
      items
    });
    const lis = wrapper.find('.todo-item');
    expect(lis.length).toEqual(items.length);
    lis.forEach(li => {
      expect(li.text()).toEqual(items[index]);
    });
  });
  it('Should add an item when the form is submitted', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const wrapper = mount(<Favorites />);
    wrapper.setState({
      items
    });
    const input = wrapper.find('#textInput');
    input.instance().value = 'Item 4';
    console.log(input.debug());

    const form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.state('items')).toEqual([...items, toAdd]);
  });
})