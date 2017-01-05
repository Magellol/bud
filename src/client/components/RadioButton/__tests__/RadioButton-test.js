import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import RadioButton from '../RadioButton';

function onChangeMock() {
  return null;
}

const radio = shallow(
  <RadioButton checked={false} label="Bear" onChange={onChangeMock} value="iceCream" />
);

describe('RadioButton', function () {
  it('Should render', function () {
    expect(radio.length).to.be.equal(1);
  });

  it('Should have an radio buttom with the passed in props', function () {
    const input = radio.find('input[type="radio"]');
    const span = radio.find('span');

    const { label } = radio.instance().props;
    const { checked, onChange, value, type } = input.props();

    expect(checked).to.be.equal(false);
    expect(onChange).to.be.equal(onChangeMock);
    expect(value).to.be.equal('iceCream');
    expect(type).to.be.equal('radio');

    expect(span.text()).to.be.equal(label);
  });
});
