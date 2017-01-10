import React from 'react';
import fetchMock from 'fetch-mock';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import { expect } from 'chai';
import CategoriesList from '../CategoriesList';

describe('Monthly/CategoriesList', function () {
  it('Should render', function () {
    const list = shallow(<CategoriesList year="2017" month="january" />);

    expect(list.length).to.be.equal(1);
  });

  it('Should have its initial state', function () {
    const list = shallow(<CategoriesList year="2017" month="january" />);
    const { categories, requestStatus } = list.state();

    expect(categories).to.be.instanceOf(Array);
    expect(categories.length).to.be.equal(0);
    expect(requestStatus).to.be.equal(null);
  });

  it.skip('Should fetch categories and display them', function () {

  });
});
