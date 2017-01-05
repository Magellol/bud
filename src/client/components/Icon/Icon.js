import React from 'react';

/**
 * @link https://github.com/encharm/Font-Awesome-SVG-PNG/tree/master/black/svg
 * You'll get the coordinates from there.
 */

const Icon = props => (
  <svg
    className={props.className}
    width={`${props.size}px`}
    height={`${props.size}px`}
    viewBox="0 0 1792 1792"
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
