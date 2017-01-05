import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { stub, mock } from 'sinon';
import fetchMock from 'fetch-mock';
import AddUserForm from '../AddUserForm';

function afterCreateMock(data) {
  return data;
}

const eventMock = {
  target: {
    value: 'allTheBears'
  },
  preventDefault() {
    return true;
  }
};

describe('AddUserForm', function () {
  it('Should render properly and have it\'s initial state implemented', function () {
    const form = mount(<AddUserForm afterCreate={afterCreateMock} />);

    expect(form.state('username')).to.be.equal('');
    expect(form.state('validationError')).to.be.equal(null);
    expect(form.childAt(1).length).to.be.equal(0);
  });

  it('Should render error message when we change the validation state', function () {
    const form = mount(<AddUserForm afterCreate={afterCreateMock} />);

    form.setState({
      validationError: 'this is an error'
    });

    expect(form.childAt(1).html()).to.be.equal('<span>This is an error</span>');
  });

  it('Should create the user and update the states when handleSubmit() is successful', function () {
    fetchMock.post('/api/users/new', {
      body: {
        status: 'success',
        data: {
          username: 'hello'
        }
      }
    });

    const form = mount(<AddUserForm afterCreate={afterCreateMock} />);

    form.setState({
      username: 'bear',
      validationError: 'Hell yeah'
    });

    return form.instance().handleSubmit(eventMock)
      .then((result) => {
        // This actually tests if the afterCreate prop function is being called and returned.
        expect(result).to.be.deep.equal({
          username: 'hello'
        });

        expect(form.state('username')).to.be.equal('');
        expect(form.state('validationError')).to.be.equal(null);

        fetchMock.restore();
      });
  });

  it('Should fail and set the validation error state when we handleSubmit() failed', function () {
    fetchMock.post('/api/users/new', {
      body: {
        status: 'fail',
        data: {
          username: ['This is a validation error']
        }
      }
    });

    const form = mount(<AddUserForm afterCreate={afterCreateMock} />);

    form.setState({
      username: 'bear'
    });

    return form.instance().handleSubmit(eventMock)
      .then((result) => {
        expect(result).to.be.equal(undefined);
        expect(form.state('username')).to.be.equal('bear');
        expect(form.state('validationError')).to.be.equal('This is a validation error');

        fetchMock.restore();
      });
  });

  it('Should call handleSubmit() when the form is being submitted', function () {
    const form = shallow(<AddUserForm afterCreate={afterCreateMock} />);
    const instance = form.instance();

    const stubbedHandleSubmit = stub(instance, 'handleSubmit');
    instance.forceUpdate(); // force the instance to use the stubbed method.

    form.find('form').simulate('submit');

    expect(stubbedHandleSubmit.calledOnce).to.be.equal(true);
  });

  it('Should call handleUpdateUsername when the input changes', function () {
    const form = shallow(<AddUserForm afterCreate={afterCreateMock} />);
    const instance = form.instance();

    const stubbedHandleUpdateUsername = stub(instance, 'handleUpdateUsername');
    instance.forceUpdate();

    const input = form.find('input');
    input.simulate('change');

    expect(input.length).to.be.equal(1);
    expect(stubbedHandleUpdateUsername.calledOnce).to.be.equal(true);
  });

  it('Should update the state after calling handleUpdateUsername', function () {
    const form = shallow(<AddUserForm afterCreate={afterCreateMock} />);
    const instance = form.instance();

    const mocked = mock(instance);
    mocked.expects('setState').once().withArgs({
      username: 'allTheBears'
    });

    instance.handleUpdateUsername(eventMock);

    mocked.verify();
  });
});
