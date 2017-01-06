import React, { PropTypes } from 'react';
import s from './Submit.css';

const Submit = props => (
  <button type="submit" className={s.button}>{props.label}</button>
);

Submit.propTypes = {
  label: PropTypes.string.isRequired
};

export default Submit;
