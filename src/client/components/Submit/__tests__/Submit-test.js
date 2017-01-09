import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Submit from '../Submit';

describe('Submit', function () {
  it('Should render', function () {
    const button = shallow(<Submit label="bear" />);

    expect(button.type()).to.be.equal('button');
    expect(button.length).to.be.equal(1);
    expect(button.props().type).to.be.equal('submit');
    expect(button.text()).to.be.equal('bear');
  });

  it('Should have default props', function () {
    const button = shallow(<Submit label="bear" />).instance();

    expect(button.props.status).to.be.equal('default');
    expect(button.props.disabled).to.be.equal(false);
  });
});
