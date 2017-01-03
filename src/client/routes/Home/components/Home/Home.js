import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import Logo from '../../../../components/Logo';
import User from './components/User';
import s from './Home.css';

const Home = React.createClass({
  propTypes: {
    users: React.PropTypes.instanceOf(PromiseState)
  },

  getInitialState() {
    return {
      username: ''
    };
  },

  handleCreateUser(event) {
    event.preventDefault();

    console.log(event);
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
    const { users } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.logo}>
          <Logo />
        </div>

        {users.fulfilled && this.renderUsers(users.value.data)}

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

export default connect(() => ({
  users: '/api/users',
  createUser(username) {
    return {
      createUserResponse: {
        url: '/api/users/new',
        method: 'POST',
        body: JSON.stringify({
          payload: { username }
        })
      }
    };
  }
}))(Home);
