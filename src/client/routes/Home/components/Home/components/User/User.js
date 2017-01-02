import React from 'react';
import classnames from 'classnames';
import s from './User.css';

const User = (props) => {
  const classes = classnames({
    [s.wrapper]: true,
    [s.first]: props.first === true
  });

  return (
    <div className={classes}>
      <span className={s.username}>{props.username}</span>
    </div>
  );
};

User.propTypes = {
  username: React.PropTypes.string.isRequired,
  first: React.PropTypes.bool.isRequired
};

User.defaultProps = {
  first: false
};

export default User;
