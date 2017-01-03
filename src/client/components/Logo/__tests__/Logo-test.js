import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Logo from '../Logo';

describe('Logo', function () {
  it('Should render properly', function () {
    const logo = shallow(<Logo />);

    expect(logo.length).to.be.equal(1);
    expect(logo.instance().props.size).to.be.equal('medium');
    expect(logo.text()).to.be.equal('Bud.');
  });
});
