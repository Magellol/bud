import React, { PropTypes } from 'react';
import s from './App.css';

const App = props => (
  <div className={s.wrapper}>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default App;
