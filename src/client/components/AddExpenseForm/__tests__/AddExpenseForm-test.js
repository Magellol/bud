import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { mock, stub } from 'sinon';
import AddExpenseForm from '../AddExpenseForm';
import CategoriesList from '../../CategoriesList';
import Submit from '../../Submit';
import ENDPOINTS from '../../../constants/endpoints';

const categories = [1, 2, 3];
const eventMock = {
  preventDefault() { return true; }
};

describe('AddExpenseForm', function () {
  it('Should render with its initial state', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);

    const { amount, category, name, validationError, showName, requestStatus } = form.state();

    expect(form.length).to.be.equal(1);
    expect(amount).to.be.equal('');
    expect(showName).to.be.equal(false);
    expect(name).to.be.equal('');
    expect(category).to.be.equal(null);
    expect(validationError).to.be.equal(null);
    expect(requestStatus).to.be.equal(null);
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

  it('Should set the submit component to error when the request failed (validation)', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);

    form.setState({
      requestStatus: 'success',
      validationError: 'one error here'
    });

    const submitButton = form.find(Submit);

    expect(submitButton.props().status).to.be.equal('error');
    expect(submitButton.props().disabled).to.be.equal(false);
  });

  it('Should set the Submit component to success when the request is done and no error is found', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);

    form.setState({
      requestStatus: 'success',
      validationError: null
    });

    const submitButton = form.find(Submit);

    expect(submitButton.props().status).to.be.equal('success');
    expect(submitButton.props().disabled).to.be.equal(false);
  });

  it('Should pass pending and disable the submit button when the request is pending', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);

    form.setState({
      requestStatus: 'pending'
    });

    const submitButton = form.find(Submit);

    expect(submitButton.props().disabled).to.be.equal(true);
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
      requestStatus: null
    });

    const request = form.instance().handleSubmit(eventMock);

    expect(form.state('requestStatus')).to.be.equal('pending');
    expect(form.state('validationError')).to.be.equal(null);

    return request.then(() => {
      const { requestStatus, amount, name, category } = form.state();

      expect(requestStatus).to.be.equal('success');
      expect(amount).to.be.equal('');
      expect(name).to.be.equal('');
      expect(category).to.be.equal(null);

      fetchMock.restore();
    });
  });
});
