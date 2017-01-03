import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Home from '../Home';
import Logo from '../../../../../components/Logo';

const home = shallow(<Home />);

describe('Home', function () {
  it('Should render properly', function () {
    expect(home.length).to.be.equal(1);
  });

  it('Should have an instance of logo', function () {
    const logo = home.find(Logo);

    expect(logo.length).to.be.equal(1);
  });

  it.skip('Should display users', function () {
    // It should display all users.
  });
});