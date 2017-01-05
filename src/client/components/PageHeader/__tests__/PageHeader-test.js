import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import PageHeader from '../PageHeader';
import Logo from '../../Logo';

const header = shallow(<PageHeader />);

describe('PageHeader', function () {
  it('Should render properly', function () {
    expect(header.length).to.be.equal(1);
  });

  it('Should contain a logo small sized', function () {
    const logo = header.find(Logo);

    expect(logo.length).to.be.equal(1);
    expect(logo.props().size).to.be.equal('small');
  });
});
