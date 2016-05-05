import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import AboutPage from './AboutPage';
import { Link } from 'react-router';

describe('<AboutPage />', () => {
	it('should have 4 paragraphs', () => {
    const wrapper = shallow(<AboutPage />);
    const actual = wrapper.find('p').length;
    const expected = 4;
    
    expect(actual).to.equal(expected);
	});

  it('should have a header called History', () => {
    const wrapper = shallow(<AboutPage />);
    const actual = wrapper.find('h1').text();
    const expected = 'History';
    
    expect(actual).to.equal(expected);
  });
});
