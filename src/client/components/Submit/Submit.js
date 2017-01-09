import React, { PropTypes } from 'react';
import classnames from 'classnames';
import s from './Submit.css';

function getClasses(status) {
  return classnames({
    [s.button]: true,
    [s.pending]: status === 'pending',
    [s.success]: status === 'success',
    [s.error]: status === 'error'
  });
}

const Submit = props => (
  <button
    type="submit"
    className={getClasses(props.status)}
    disabled={props.disabled}
  >
    {props.label}
  </button>
);

Submit.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['success', 'pending', 'error', 'default']),
  disabled: PropTypes.bool
};

Submit.defaultProps = {
  status: 'default',
  disabled: false
};

export default Submit;
