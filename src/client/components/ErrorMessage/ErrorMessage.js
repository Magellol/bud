import React, { PropTypes } from 'react';
import s from './ErrorMessage.css';

const ErrorMessage = props => (
  <p className={s.message}>
    {props.message}
  </p>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
