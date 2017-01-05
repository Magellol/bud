import React from 'react';

const Icon = props => (
  <svg
    className={props.className}
    width={`${props.size}px`}
    height={`${props.size}px`}
    viewBox="0 0 20 20"
  >
    <path d={props.icon} />
  </svg>
);

Icon.propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.number,
  icon: React.PropTypes.string.isRequired
};

Icon.defaultProps = {
  size: 16
};

export default Icon;
