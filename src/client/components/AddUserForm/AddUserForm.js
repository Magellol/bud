import React from 'react';
import classnames from 'classnames';
import s from './AddUserForm.css';
import { post } from '../../helpers/requests';
import { ucfirst } from '../../helpers/strings';

const ENDPOINTS = {
  newUser: '/api/users/new'
};

const AddUserForm = React.createClass({
  propTypes: {
    // Will receive the user object as first argument.
    afterCreate: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      username: '',
      validationError: null
    };
  },

  setError(error) {
    return this.setState({
      validationError: error
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    this.setError(null);
    const { username } = this.state;

    return post(ENDPOINTS.newUser, { username })
      .then(({ status, data }) => {
        if (status === 'success') {
          this.setState({ username: '' });
          return this.props.afterCreate(data);
        }

        const { username: errorMessages } = data;
        // TODO use helper.
        // Also this only stores the first validation error
        // It's possible that there are many of them but we only
        // show one at the time.
        const [message] = errorMessages;
        const error = new Error(message);

        throw error;
      })
      .catch(error => this.setError(error.message));
  },

  handleUpdateUsername(event) {
    const { value: username } = event.target;
    this.setState({ username });
  },

  render() {
    const { validationError } = this.state;

    const inputWapperClasses = classnames({
      [s.inputWrapper]: true,
      [s.hasError]: validationError !== null
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={inputWapperClasses}>
          <input
            className={s.input}
            placeholder="Create a new user"
            value={this.state.username}
            onChange={this.handleUpdateUsername}
          />
        </div>

        {validationError && <span className={s.errorMessage}>{ucfirst(validationError)}</span>}
      </form>
    );
  }
});

export default AddUserForm;
