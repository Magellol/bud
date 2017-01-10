import React from 'react';
import classnames from 'classnames';
// import Transition from 'react-addons-css-transition-group';
import Logo from '../../../../components/Logo';
import User from '../User';
import OneFieldForm from '../../../../components/OneFieldForm';
import s from './Home.css';
import { post, get } from '../../../../helpers/requests';
import ENDPOINTS from '../../../../constants/endpoints';

/**
 * TODO
 * Could reduce the complexity of this components
 * by extracting the login behaviour onto another component.
 */
const Home = React.createClass({
  getInitialState() {
    return {
      users: [],
      initiallyLoaded: false
    };
  },

  componentDidMount() {
    return get(ENDPOINTS.allUsers).then(({ data: users }) => (
      this.setState({ users, initiallyLoaded: true })
    ));
  },

  getClasses(el) {
    const { initiallyLoaded } = this.state;

    const classes = {
      logo: {
        [s.logo]: true,
        [s.loaded]: initiallyLoaded
      },
      usersWrapper: {
        [s.usersWrapper]: true,
        [s.display]: initiallyLoaded
      },
      formWrapper: {
        [s.formWrapper]: true,
        [s.show]: initiallyLoaded === true
      }
    };

    if (typeof classes[el] === 'undefined') {
      throw new Error(
        `Classes are not defined for element "${el}". ` +
        `Accepted values are ${Object.keys(classes)}. ` +
        'Check render method of Home.'
      );
    }

    return classnames(classes[el]);
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

    return (
      <div className={s.wrapper}>
        <div className={this.getClasses('logo')}>
          <Logo />
        </div>

        <div className={this.getClasses('usersWrapper')}>
          {users && this.renderUsers(users)}
        </div>

        <div className={this.getClasses('formWrapper')}>
          <OneFieldForm
            placeholder="Add new user"
            fieldName="username"
            endpoint={ENDPOINTS.newUser}
            afterCreate={this.handleAfterCreateUser}
          />
        </div>
      </div>
    );
  }
});

export default Home;
