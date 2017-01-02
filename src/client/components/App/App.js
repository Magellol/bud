// TODO
// This is not a real global component that can be used anywhere, hence its location
// it's not right...

import React from 'react';
import s from './App.css';

const App = props => (
  <div className={s.wrapper}>
    {props.children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
