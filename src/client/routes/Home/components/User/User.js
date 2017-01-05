import React from 'react';
import classnames from 'classnames';
import Icon from '../../../../components/Icon';
import SVGs from '../../../../constants/svgs';
import s from './User.css';

const User = (props) => {
  const classes = classnames({
    [s.wrapper]: true,
    [s.first]: props.first === true
  });

  return (
    <div className={classes}>
      <span className={s.username}>{props.username}</span>

      <Icon
        icon={SVGs.chevronRight}
        size={25}
        className={s.icon}
      />

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
