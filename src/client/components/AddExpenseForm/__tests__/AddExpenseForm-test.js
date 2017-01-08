import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { mock, stub } from 'sinon';
import AddExpenseForm from '../AddExpenseForm';
import CategoriesList from '../../CategoriesList';
import ENDPOINTS from '../../../constants/endpoints';

const categories = [1, 2, 3];
const eventMock = {
  preventDefault() { return true; }
};

describe('AddExpenseForm', function () {
  it('Should render with its initial state', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);

    const { amount, category, name, validationError, showName, requestDone } = form.state();

    expect(form.length).to.be.equal(1);
    expect(amount).to.be.equal('');
    expect(showName).to.be.equal(false);
    expect(name).to.be.equal('');
    expect(category).to.be.equal(null);
    expect(validationError).to.be.equal(null);
    expect(requestDone).to.be.equal(false);
  });

  it('Should call renderNameInput() when the showName state is set', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);
    const instance = form.instance();
    const stubbed = stub(instance, 'renderNameInput');

    instance.forceUpdate();

    form.setState({ showName: true });

    expect(stubbed.calledOnce).to.be.equal(true);
  });

  it('Should change the amount state when the input value changes', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);
    const instance = form.instance();

    const mocked = mock(instance);
    mocked.expects('setState').once().withArgs({
      amount: 25
    });

    const event = {
      target: { name: 'amount', value: 25 }
    };

    instance.handleInputChange(event);
    mocked.verify();
  });

  it('Should change the name state when the input value changes', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);
    const instance = form.instance();

    const mocked = mock(instance);
    mocked.expects('setState').once().withArgs({
      name: 'hola'
    });

    const event = {
      target: { name: 'name', value: 'hola' }
    };

    instance.handleInputChange(event);
    mocked.verify();
  });

  it('Should call handleAmountChange() when input changes', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);
    const instance = form.instance();
    const stubbed = stub(instance, 'handleInputChange');

    form.setState({ showName: true });

    instance.forceUpdate();

    const inputs = form.find('input');
    inputs.at(0).simulate('change');
    inputs.at(1).simulate('change');

    expect(stubbed.calledTwice).to.be.equal(true);
  });

  it('Should have an instance of CategoryList', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);
    const list = form.find(CategoriesList);

    expect(list.length).to.be.equal(1);
  });

  it('Should set the category state when handleCategorySelection is invoked', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);
    const instance = form.instance();
    const mocked = mock(instance);
    const category = { id: 1, name: 'Restaurant' };

    mocked.expects('setState').once().withArgs({ category });
    instance.forceUpdate();

    instance.handleCategorySelection(category);

    mocked.verify();
  });

  it('Should set the validation error state when an error from the server is encountered', function () {
    fetchMock.post(ENDPOINTS.newExpense, {
      throws: new Error('this is an error message')
    });

    const form = shallow(<AddExpenseForm categories={categories} />);
    return form.instance().handleSubmit(eventMock).then(() => {
      expect(form.state('validationError')).to.be.equal('this is an error message');

      fetchMock.restore();
    });
  });

  it.skip('Should show an error message when the validation error state is set', function () {

  });

  it.skip('Should show a success message when the requestDone state is set without errors', function () {

  });

  it('Should reset the states when a new expense has been added', function () {
    fetchMock.post(ENDPOINTS.newExpense, {
      body: { status: 'success', data: {} }
    });

    const form = shallow(<AddExpenseForm categories={categories} />);
    form.setState({
      amount: 1.99,
      name: 'name',
      category: { id: 1 },
      validationError: 'hello',
      requestDone: true
    });

    const request = form.instance().handleSubmit(eventMock);

    expect(form.state('requestDone')).to.be.equal(false);
    expect(form.state('validationError')).to.be.equal(null);

    return request.then(() => {
      const { requestDone, amount, name, category } = form.state();

      expect(requestDone).to.be.equal(true);
      expect(amount).to.be.equal('');
      expect(name).to.be.equal('');
      expect(category).to.be.equal(null);

      fetchMock.restore();
    });
  });
});
