import React, { PropTypes } from 'react';
import s from './RadioButton.css';

const RadioButton = props => (
  <label className={s.wrapper}>
    <input
      className={s.radio}
      value={props.value}
      onChange={props.onChange}
      checked={props.checked}
      type="radio"
    />

    <span className={s.label}>{props.label}</span>
  </label>
);

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default RadioButton;
