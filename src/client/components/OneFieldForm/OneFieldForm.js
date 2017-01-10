import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import ErrorMessage from '../ErrorMessage';
import s from './OneFieldForm.css';
import { post } from '../../helpers/requests';
import { ucfirst } from '../../helpers/strings';
import SVGs from '../../constants/svgs';

const OneFieldForm = React.createClass({
  propTypes: {
    // the field name to send to the server, it's value Will
    // be the input's value.
    fieldName: PropTypes.string.isRequired,
    // Will receive the created entity as first argument.
    afterCreate: PropTypes.func.isRequired,
    endpoint: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  },

  getInitialState() {
    return {
      fieldValue: '',
      requestStatus: null,
      validationError: null
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    // Avoids hammering the input.
    if (this.state.requestStatus === 'pending') {
      return false;
    }

    this.setState({
      validationError: null,
      requestStatus: 'pending'
    });

    const { fieldValue } = this.state;
    return post(this.props.endpoint, {
      [this.props.fieldName]: fieldValue
    }).then(({ status, data }) => {
      if (status === 'success') {
        this.setState({
          fieldValue: '',
          requestStatus: 'done'
        });
        return this.props.afterCreate(data);
      }

      const [message] = data[this.props.fieldName];
      throw new Error(message);
    })
    .catch(error => (
      this.setState({
        requestStatus: 'done',
        validationError: error.message
      })
    ));
  },

  handleUpdateFieldValue(event) {
    const { value: fieldValue } = event.target;
    return this.setState({ fieldValue });
  },

  render() {
    const { validationError } = this.state;
    const iconClasses = classnames({
      [s.icon]: true,
      [s.hasError]: validationError !== null
    });

    return (
      <form onSubmit={this.handleSubmit} action="#">
        <div className={s.inputWrapper}>
          <input
            className={s.input}
            placeholder={this.props.placeholder}
            value={this.state.fieldValue}
            onChange={this.handleUpdateFieldValue}
          />

          <Icon
            icon={SVGs.times}
            className={iconClasses}
            size={20}
          />
        </div>

        {validationError && <ErrorMessage message={ucfirst(validationError)} />}
      </form>
    );
  }
});

export default OneFieldForm;
