import React from 'react';
import classnames from 'classnames';
// import Transition from 'react-addons-css-transition-group';
import Logo from '../../../../components/Logo';
import User from '../User';
import AddUserForm from '../../../../components/AddUserForm';
import s from './Home.css';
import { post, get } from '../../../../helpers/requests';

const ENDPOINTS = {
  users: '/api/users',
  loginUser: '/api/users/login'
};

// TODO
// Also, the input style could also live in its own component, we're going to need it.
const Home = React.createClass({
  getInitialState() {
    return {
      users: []
    };
  },

  componentDidMount() {
    return get(ENDPOINTS.users).then(({ data: users }) => this.setState({ users }));
  },

  handleLogin(username) {
    return post(ENDPOINTS.loginUser, { username })
      .then(({ status }) => {
        if (status !== 'success') {
          throw new Error('The user could not be logged in. Server said nope.');
        }

        return this.props.router.push('/dashboard'); // eslint-disable-line react/prop-types
      })
      .catch(error => console.error(error)); // TODO Do something better, perhaps a flash message?
  },

  handleAfterCreateUser(user) {
    return this.setState(prevState => ({
      users: [...prevState.users, user]
    }));
  },

  renderUsers(users) {
    return users.map((user, index) => (
      <button
        key={user.id}
        className={s.userButton}
        onClick={() => this.handleLogin(user.username)}
      >
        <User
          username={user.username}
          first={index === 0}
        />
      </button>
    ));
  },

  render() {
    const { users } = this.state;

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
        </div>

        <AddUserForm afterCreate={this.handleAfterCreateUser} />
      </div>
    );
  }
});

export default Home;
