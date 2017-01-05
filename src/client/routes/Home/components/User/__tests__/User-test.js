import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import User from '../User';

const user = shallow(<User username="bear" />);

describe('Home/User', function () {
  it('Should render properly', function () {
    expect(user.length).to.be.equal(1);
    expect(user.text()).to.be.equal('bear');
    expect(user.instance().props.first).to.be.equal(false);
  });
});
