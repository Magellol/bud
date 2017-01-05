import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Link } from 'react-router';
import NotFoundError from '../NotFoundError';
import ErrorPage from '../../ErrorPage';

const error = shallow(<NotFoundError />);

describe('NotFoundError', function () {
  it('Should render properly', function () {
    expect(error.length).to.be.equal(1);
  });

  it('Should render a <ErrorPage> component', function () {
    expect(error.containsMatchingElement(ErrorPage)).to.be.equal(true);
  });

  it('Should contain a React router link back to home page', function () {
    const link = error.find(Link);

    expect(link.length).to.be.equal(1);
    expect(link.props().to).to.be.equal('/');
    expect(link.props().children).to.be.equal('Head back to home page.');
  });
});
