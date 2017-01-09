import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ErrorMessage from '../ErrorMessage';

const message = shallow(<ErrorMessage message="error message" />);

describe('ErrorMessage', function () {
  it('Should render', function () {
    expect(message.length).to.be.equal(1);
  });
});
