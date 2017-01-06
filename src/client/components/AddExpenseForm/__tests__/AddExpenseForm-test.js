import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { mock, stub } from 'sinon';
import AddExpenseForm from '../AddExpenseForm';
import CategoriesList from '../../CategoriesList';

const eventMock = {
  target: { value: 25 }
};

const categories = [1, 2, 3];

describe('AddExpenseForm', function () {
  it('Should render with its initial state', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);

    const { amount, category } = form.state();

    expect(form.length).to.be.equal(1);
    expect(amount).to.be.equal('');
    expect(category).to.be.equal(null);
  });

  it('Should change the amount state when the input value changes', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);
    const instance = form.instance();

    const mocked = mock(instance);
    mocked.expects('setState').once().withArgs({
      amount: 25
    });

    instance.handleAmountChange(eventMock);
    mocked.verify();
  });

  it('Should call handleAmountChange() when input changes', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);
    const instance = form.instance();
    const stubbed = stub(instance, 'handleAmountChange');

    instance.forceUpdate();
    form.find('input').simulate('change');

    expect(stubbed.calledOnce).to.be.equal(true);
  });

  it('Should have an instance of CategoryList', function () {
    const form = shallow(<AddExpenseForm categories={categories} />);
    const list = form.find(CategoriesList);

    expect(list.length).to.be.equal(1);
  });
});
