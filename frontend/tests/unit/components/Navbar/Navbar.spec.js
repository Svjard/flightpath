import React from 'react'
import Navbar from 'components/Navbar'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

describe('(Component) Navbar', () => {
  let _wrapper;

  beforeEach(() => {
    _wrapper = shallow(<Navbar/>);
  });

  it('Renders a welcome message', () => {
    const welcome = _wrapper.find('.navbar-header');
    expect(welcome).to.exist;
    expect(welcome.text()).to.match(/Flight Path/);
  });
});
