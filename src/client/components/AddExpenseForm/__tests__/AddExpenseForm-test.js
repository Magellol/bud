import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { mock, stub } from 'sinon';
import AddExpenseForm from '../AddExpenseForm';
import CategoriesList from '../../CategoriesList';

const categories = [1, 2, 3];

describe('AddExpenseForm', function () {
  it('Should render with its initial state', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);

    const { amount, category, name, validationErrors } = form.state();

    expect(form.length).to.be.equal(1);
    expect(amount).to.be.equal('');
    expect(name).to.be.equal('');
    expect(category).to.be.equal(null);
    expect(validationErrors).to.be.instanceOf(Array);
    expect(validationErrors.length).to.be.equal(0);
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
});
