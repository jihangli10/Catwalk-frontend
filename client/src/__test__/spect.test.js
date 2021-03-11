import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import App from '.././components/App.jsx';


describe('App', () => {
  it('should show text', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('div h1');
    expect(text.text()).toBe('Main Page');
  });
})


  // it('should contain current product state', () => {
  //   let tree = renderer
  //     .create(<App />)
  //     .toJSON();
  //     expect(tree).toMatchSnapshot();
  // });

