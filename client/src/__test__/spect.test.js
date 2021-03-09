import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

import App from '.././components/App.jsx';

function setup() {
  const wrapper = mount(<App />);
  return wrapper;
}


describe('App is working', () => {
  it('should contain main page header', () => {
    const myApp = setup();
    // const header = <h1>Main Page</h1>;
    expect(myApp).toMatchSnapshot();
  });

  // it('should contain current product state', () => {
  //   let tree = renderer
  //     .create(<App />)
  //     .toJSON();
  //     expect(tree).toMatchSnapshot();
  // });
});
