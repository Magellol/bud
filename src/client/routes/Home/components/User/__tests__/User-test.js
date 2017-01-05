import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import User from '../User';
import Icon from '../../../../../components/Icon';
import SVGs from '../../../../../constants/svgs';

const user = shallow(<User username="bear" />);

describe('Home/User', function () {
  it('Should render properly', function () {
    expect(user.length).to.be.equal(1);
  });

  it('Should contain an instance of Icon chevronRight', function () {
    const icon = user.find(Icon);

    const { icon: iconValue, size } = icon.props();

    expect(icon.length).to.be.equal(1);
    expect(iconValue).to.be.equal(SVGs.chevronRight);
    expect(size).to.be.equal(20);
  });
});
