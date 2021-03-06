import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import PageHeader from '../PageHeader';

describe('Monthly/PageHeader', function () {
  it('Should render', function () {
    const header = shallow(<PageHeader label="hello" />);

    expect(header.length).to.be.equal(1);
  });
});
