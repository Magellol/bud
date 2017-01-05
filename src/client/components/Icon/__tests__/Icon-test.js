import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Icon from '../Icon';

describe('Icon', function () {
  it('Should render with default props', function () {
    const icon = shallow(<Icon icon="chevronRight" />);

    expect(icon.length).to.be.equal(1);
    expect(icon.instance().props.size).to.be.equal(16);
  });

  it('Should render a full SVG with the passed in icon and size', function () {
    const icon = shallow(
      <Icon
        icon="chevronRight"
        size={10}
        className="myCustomClass"
      />
    );

    const { width, height, viewBox, className } = icon.props();

    expect(icon.type()).to.be.equal('svg');
    expect(width).to.be.equal('10px');
    expect(height).to.be.equal('10px');
    expect(viewBox).to.be.equal('0 0 1792 1792');
    expect(className).to.be.equal('myCustomClass');

    const path = icon.childAt(0);
    expect(path.props().d).to.be.equal('chevronRight');
    expect(path.type()).to.be.equal('path');
  });
});
