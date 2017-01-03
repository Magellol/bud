import React from 'react';
import Logo from '../../../../components/Logo';
import User from './components/User';
import s from './Home.css';
import { post, get } from '../../../../helpers/requests';

const ENDPOINTS = {
  users: '/api/users',
  newUser: '/api/users/new'
};

const Home = React.createClass({
  getInitialState() {
    return {
      username: '',
      users: []
    };
  },

  componentDidMount() {
    return get(ENDPOINTS.users).then(response => this.setState({ users: response.data }));
  },

  handleCreateUser(event) {
    event.preventDefault();

    const { username } = this.state;
    return post(ENDPOINTS.newUser, { username })
      .then((response) => {
        if (response.status === 'success') {
          return this.setState({
            users: [...this.state.users, response.data]
          });
        }

        // TODO Handle validation errors.
      })
      .catch(error => console.error(error)); // TODO proper handling.
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

  render() {
    const { users } = this.state;

    return (
      <div className={s.wrapper}>
        <div className={s.logo}>
          <Logo />
        </div>

        {users && this.renderUsers(users)}

        <form onSubmit={this.handleCreateUser}>
          <input
            className={s.input}
            placeholder="Add"
            value={this.state.username}
            onChange={this.handleUpdateUsername}
          />
        </form>
      </div>
    );
  }
});

export default Home;
