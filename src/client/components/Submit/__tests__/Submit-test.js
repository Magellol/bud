import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Submit from '../Submit';

const button = shallow(<Submit label="bear" />);

describe('Submit', function () {
  it('Should render', function () {
    expect(button.type()).to.be.equal('button');
    expect(button.length).to.be.equal(1);
    expect(button.props().type).to.be.equal('submit');
    expect(button.text()).to.be.equal('bear');
  });
});
