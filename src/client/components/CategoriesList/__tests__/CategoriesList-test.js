import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Link } from 'react-router';
import fetchMock from 'fetch-mock';
import CategoriesList from '../CategoriesList';
import RadioButton from '../../RadioButton';
import ENDPOINTS from '../../../constants/endpoints';

const onSelectionMock = () => null;
const shouldCheckMock = () => true;

const categorieFixtures = [
  {
    id: 1,
    name: 'Cat 1',
    value: 'bear'
  },
  {
    id: 2,
    name: 'Cat 2',
    value: 'Tom'
  }
];

describe('CategoriesList', function () {
  it('Should render', function () {
    const list = shallow(
      <CategoriesList onSelection={onSelectionMock} shouldCheck={shouldCheckMock} />
    );

    expect(list.length).to.be.equal(1);
  });

  it('Should have its initial state', function () {
    const list = shallow(
      <CategoriesList onSelection={onSelectionMock} shouldCheck={shouldCheckMock} />
    );
    expect(list.state('categories')).to.be.instanceOf(Array);
    expect(list.state('categories').length).to.be.equal(0);
    expect(list.state('initiallyLoaded')).to.be.equal(false);
  });

  it('It should say there is no categories after fetching them and the state is empty', function () {
    const list = shallow(
      <CategoriesList onSelection={onSelectionMock} shouldCheck={shouldCheckMock} />
    );

    list.setState({ categories: [], initiallyLoaded: true });

    const child = list.childAt(0);
    const link = child.find(Link);


    expect(link.length).to.be.equal(1);
    expect(link.props().children).to.be.equal('Create your first one');
    expect(link.props().to).to.be.equal(`/monthly/${moment().format('YYYY/MMMM').toLowerCase()}`);
  });

  it('It should not have any RadioButton at mounting', function () {
    const list = shallow(
      <CategoriesList onSelection={onSelectionMock} shouldCheck={shouldCheckMock} />
    );
    expect(list.find(RadioButton).exists()).to.be.equal(false);
  });

  it('It should have RadioButtons when categories state is set', function () {
    const list = shallow(
      <CategoriesList onSelection={onSelectionMock} shouldCheck={shouldCheckMock} />
    );

    list.setState({ categories: categorieFixtures });

    const radios = list.find(RadioButton);
    const firstRadio = radios.get(0);

    expect(radios.length).to.be.equal(2);
    expect(firstRadio.props.label).to.be.equal('Cat 1');
    expect(firstRadio.props.value).to.be.equal(1);
    expect(firstRadio.props.onChange).to.be.instanceOf(Function);
    expect(firstRadio.props.checked).to.be.equal(true); // shouldCheckMock() => true.
  });

  it('Should query the api and set its result in the state at mounting', function () {
    fetchMock.get(ENDPOINTS.allCategories, {
      body: { status: 'success', data: categorieFixtures }
    });

    const list = shallow(
      <CategoriesList onSelection={onSelectionMock} shouldCheck={shouldCheckMock} />
    );

    return list.instance().componentDidMount().then(() => {
      expect(list.state('categories')).to.be.deep.equal(categorieFixtures);

      fetchMock.restore();
    });
  });
});
