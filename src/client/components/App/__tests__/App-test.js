import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../App';
import Logo from '../../Logo';

describe('App', function () {
  it('Should render properly', function () {
    const app = shallow(
      <App>
        <Logo />
      </App>
    );

    expect(app.length).to.be.equal(1);
  });
});
