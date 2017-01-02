import React from 'react';
import classnames from 'classnames';
import s from './Logo.css';

const Logo = (props) => {
  const classes = classnames({
    [s.logo]: true,
    [s[props.size]]: true
  });

  return (
    <div className={classes}>
      Bud<span className={s.dot}>.</span>
    </div>
  );
};

Logo.propTypes = {
  size: React.PropTypes.oneOf(['small', 'medium']).isRequired
};

Logo.defaultProps = {
  size: 'medium'
};

export default Logo;
