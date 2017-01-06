import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { mock } from 'sinon';
import fetchMock from 'fetch-mock';
import Home from '../Home';
import Logo from '../../../../../components/Logo';
import AddUserForm from '../../../../../components/AddUserForm';
import User from '../../User';

describe('Home', function () {
  it('Should render properly', function () {
    const home = shallow(<Home />);
    expect(home.length).to.be.equal(1);
  });

  it('Should have an instance of logo', function () {
    const home = shallow(<Home />);
    const logo = home.find(Logo);
    expect(logo.length).to.be.equal(1);
  });

  it('Should have an instance of AddUserForm', function () {
    const home = shallow(<Home />);
    const form = home.find(AddUserForm);

    expect(form.length).to.be.equal(1);
  });

  it('Should not have any instances of User', function () {
    const home = shallow(<Home />);
    const user = home.find(User);

    expect(user.length).to.be.equal(0);
  });

  it('Should set it\'s initial state', function () {
    const home = shallow(<Home />);

    expect(home.state('users')).to.be.instanceOf(Array);
    expect(home.state('users').length).to.be.equal(0);
    expect(home.state('initiallyLoaded')).to.be.equal(false);
  });

  it('Should query users when mounted and updated its state', function () {
    fetchMock.get('/api/users', {
      data: [1, 2, 3]
    });

    const home = shallow(<Home />);
    const instance = home.instance();
    const mocked = mock(instance);

    mocked.expects('setState').once().withArgs({
      users: [1, 2, 3],
      initiallyLoaded: true
    });

    return instance.componentDidMount()
      .then(() => mocked.verify());
  });

  it('Should render users when the state has them', function () {
    const home = shallow(<Home />);

    home.setState({
      users: [
        {
          id: 1,
          username: 'bear'
        },
        {
          id: 2,
          username: 'magellol'
        }
      ]
    });

    const users = home.find(User);
    const firstUser = users.get(0);

    expect(users.length).to.be.equal(2);
    expect(firstUser.props.username).to.be.equal('bear');
    expect(firstUser.props.first).to.be.equal(true);
  });

  it('Should set the user state after calling handleAfterCreateUser', function () {
    const home = shallow(<Home />);

    home.setState({
      users: [
        {
          id: 1,
          username: 'bear'
        },
        {
          id: 2,
          username: 'magellol'
        }
      ]
    });

    home.instance().handleAfterCreateUser({
      id: 3,
      username: 'Balou'
    });

    expect(home.state('users')).to.be.deep.equal([
      {
        id: 1,
        username: 'bear'
      },
      {
        id: 2,
        username: 'magellol'
      },
      {
        id: 3,
        username: 'Balou'
      }
    ]);
  });
});
