import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Loader from '../Loader';

describe('Loader', function () {
  it('Should render', function () {
    const loader = shallow(<Loader />);

    expect(loader.length).to.be.equal(1);
  });
});
