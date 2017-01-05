import React, { PropTypes } from 'react';
import s from './RadioButton.css';

const RadioButton = props => (
  <label>
    <input
      value={props.value}
      onChange={props.onChange}
      checked={props.checked}
      type="radio"
    />
    <span>{props.label}</span>
  </label>
);

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default RadioButton;
