import React, { PropTypes } from 'react';
import classnames from 'classnames';
import s from './Submit.css';

function getClasses(status, block) {
  return classnames({
    [s.button]: true,
    [s.pending]: status === 'pending',
    [s.success]: status === 'success',
    [s.error]: status === 'error',
    [s.block]: block === true
  });
}

const Submit = props => (
  <button
    type="submit"
    className={getClasses(props.status, props.block)}
    disabled={props.disabled}
  >
    {props.label}
  </button>
);

Submit.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['success', 'pending', 'error', 'default']),
  block: PropTypes.bool,
  disabled: PropTypes.bool
};

Submit.defaultProps = {
  status: 'default',
  disabled: false,
  block: false
};

export default Submit;
