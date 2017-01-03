import React from 'react';
import classnames from 'classnames';
// import Transition from 'react-addons-css-transition-group';
import Logo from '../../../../components/Logo';
import User from './components/User';
import s from './Home.css';
import { post, get } from '../../../../helpers/requests';
import { ucfirst } from '../../../../helpers/strings';

const ENDPOINTS = {
  users: '/api/users',
  newUser: '/api/users/new'
};

const Home = React.createClass({
  getInitialState() {
    return {
      username: '',
      users: [],
      validationErrors: {}
    };
  },

  componentDidMount() {
    return get(ENDPOINTS.users).then(({ data: users }) => this.setState({ users }));
  },

  setErrors(errors) {
    return this.setState({
      validationErrors: errors
    });
  },

  handleCreateUser(event) {
    event.preventDefault();

    const { username } = this.state;
    return post(ENDPOINTS.newUser, { username })
      .then(({ status, data }) => {
        if (status !== 'success') {
          return this.setErrors(data);
        }

        return this.setState({
          users: [...this.state.users, data],
          username: '',
          validationErrors: []
        });
      })
      // Ideally we should log this error in somewhere, so we know about what happened.
      .catch(() => {
        const errors = {
          username: ['Something super weird happened, that did not work. Please try again.']
        };

        return this.setErrors(errors);
      });
  },

  handleUpdateUsername(event) {
    const { value: username } = event.target;
    this.setState({ username });
  },

  renderUsers(users) {
    return users.map((user, index) => (
      <User username={user.username} first={index === 0} key={user.id} />
    ));
  },

  renderValidationErrors(errors) {
    const [firstError] = errors; // By choice, we only display one message at the time.
    return (
      <span className={s.errorMessage}>
        {ucfirst(firstError)}
      </span>
    );
  },

  render() {
    const { users, validationErrors } = this.state;
    const inputWapperClasses = classnames({
      [s.inputWrapper]: true,
      [s.hasError]: typeof validationErrors.username !== 'undefined'
    });

    const userWrapperClasses = classnames({
      [s.usersWrapper]: true,
      [s.show]: users.length !== 0
    });

    return (
      <div className={s.wrapper}>
        <div className={s.logo}>
          <Logo />
        </div>

        <div className={userWrapperClasses}>
          {users && this.renderUsers(users)}

          <form onSubmit={this.handleCreateUser}>
            <div className={inputWapperClasses}>
              <input
                className={s.input}
                placeholder="Create a new user"
                value={this.state.username}
                onChange={this.handleUpdateUsername}
              />
            </div>

            {validationErrors.username && this.renderValidationErrors(validationErrors.username)}
          </form>
        </div>
      </div>
    );
  }
});

export default Home;
