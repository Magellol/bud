import React from 'react';
import fetchMock from 'fetch-mock';
import { shallow } from 'enzyme';
import { stub, mock } from 'sinon';
import { expect } from 'chai';
import OneFieldForm from '../OneFieldForm';
import ErrorMessage from '../../ErrorMessage';
import Icon from '../../Icon';
import SVGs from '../../../constants/svgs';

function afterCreateMock() {
  return 'created';
}

const basicForm = (<OneFieldForm
  afterCreate={afterCreateMock}
  fieldName="username"
  endpoint="/api/test"
/>);

describe('OneFieldForm', function () {
  it('Should render', function () {
    const form = shallow(basicForm);

    expect(form.length).to.be.equal(1);
  });

  it('Should have its initial state', function () {
    const form = shallow(basicForm);

    const { fieldValue, validationError, requestStatus } = form.state();

    expect(fieldValue).to.be.equal('');
    expect(validationError).to.be.equal(null);
    expect(requestStatus).to.be.equal(null);
  });

  it('Should call handleUpdateFieldValue() when the input changes', function () {
    const form = shallow(basicForm);
    const instance = form.instance();
    const stubbed = stub(instance, 'handleUpdateFieldValue');

    instance.forceUpdate();
    form.find('input').simulate('change');

    expect(stubbed.calledOnce).to.be.equal(true);
  });

  it('Calling handleUpdateFieldValue() should update the state', function () {
    const form = shallow(basicForm);
    const instance = form.instance();
    const mocked = mock(instance);
    mocked.expects('setState').once().withArgs({
      fieldValue: 'bear'
    });

    const eventMock = { target: { value: 'bear' } };

    instance.forceUpdate();
    instance.handleUpdateFieldValue(eventMock);

    mocked.verify();
  });

  it('Should have an instance of ErrorMessage when validation error state is set', function () {
    const form = shallow(basicForm);
    form.setState({
      validationError: 'this is an error'
    });

    const errorMessage = form.find(ErrorMessage);

    expect(errorMessage.length).to.be.equal(1);
    expect(errorMessage.props().message).to.be.equal('This is an error');
  });

  it('Should have an instance of Icon', function () {
    const form = shallow(basicForm);
    const icon = form.find(Icon);

    expect(icon.exists()).to.be.equal(true);
    expect(icon.props().icon).to.be.equal(SVGs.times);
    expect(icon.props().size).to.equal(20);
  });

  it('Should call handleSubmit() when the form is being submitted', function () {
    const form = shallow(basicForm);
    const instance = form.instance();
    const stubbed = stub(instance, 'handleSubmit');

    instance.forceUpdate();
    form.find('form').simulate('submit');

    expect(stubbed.calledOnce).to.be.equal(true);
  });

  it('Should update the validation error when the request failed', function () {
    fetchMock.post('/api/test', {
      body: {
        status: 'fail',
        data: {
          username: ['failed validation', 'another failed validation']
        }
      }
    });

    const form = shallow(basicForm);
    const instance = form.instance();
    const eventMock = {
      preventDefault() { return true; }
    };

    form.setState({
      requestStatus: null,
      fieldValue: 'hello world'
    });

    return instance.handleSubmit(eventMock).then(() => {
      expect(form.state('fieldValue')).to.be.equal('hello world');
      expect(form.state('requestStatus')).to.be.equal('done');
      expect(form.state('validationError')).to.be.equal('failed validation');

      fetchMock.restore();
    });
  });

  it('Should not call the api again when the request is still pending', function () {
    fetchMock.post('/api/test', {
      body: {
        status: 'fail',
        data: {
          username: ['failed validation', 'another failed validation']
        }
      }
    });

    const form = shallow(basicForm);
    const instance = form.instance();
    const eventMock = {
      preventDefault() { return true; }
    };

    form.setState({
      requestStatus: 'pending'
    });

    const result = instance.handleSubmit(eventMock);

    expect(result).to.be.equal(false);
    expect(fetchMock.called()).to.be.equal(false);

    fetchMock.restore();
  });

  it('Should update the state and call props.afterCreate when the request was successful', function () {
    fetchMock.post('/api/test', {
      body: { status: 'success', data: [1, 2, 3] }
    });

    const form = shallow(basicForm);
    const instance = form.instance();
    const eventMock = {
      preventDefault() { return true; }
    };

    return instance.handleSubmit(eventMock).then((result) => {
      const { validationError, fieldValue, requestStatus } = form.state();

      expect(result).to.be.equal('created');
      expect(validationError).to.be.equal(null);
      expect(fieldValue).to.be.equal('');
      expect(requestStatus).to.be.equal('done');
    });
  });
});
