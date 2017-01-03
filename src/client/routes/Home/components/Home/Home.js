import React from 'react';
import Logo from '../../../../components/Logo';
import User from './components/User';
import s from './Home.css';

const Home = React.createClass({
  getInitialState() {
    return {
      username: ''
    };
  },

  handleCreateUser(event) {
    event.preventDefault();
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
    return (
      <div className={s.wrapper}>
        <div className={s.logo}>
          <Logo />
        </div>

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
