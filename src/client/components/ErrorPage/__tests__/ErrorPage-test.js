import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ErrorPage from '../ErrorPage';
import PageHeader from '../../PageHeader';

const error = shallow(
  <ErrorPage>
    <p>Hello error</p>
  </ErrorPage>
);

describe.only('ErrorPage', function () {
  it('Should render properly', function () {
    expect(error.length).to.be.equal(1);
  });

  it('Should include a PageHeader component', function () {
    expect(error.containsMatchingElement(PageHeader)).to.be.equal(true);
  });

  it('Should render its children', function () {
    expect(
      error.containsMatchingElement(<p>Hello error</p>)
    ).to.be.equal(true);
  });
});
