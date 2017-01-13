import React, { PropTypes } from 'react';
import formatDate from 'date-fns/format';
import { Link } from 'react-router';
import Logo from '../Logo';
import s from './PageHeader.css';

const PageHeader = props => (
  <div className={s.wrapper}>
    <Logo size="small" />

    {props.showNavigation &&
      <div className={s.links}>
        <Link to="/" className={s.link}>
          Logout
        </Link>
        <Link to="/dashboard" className={s.link} activeClassName={s.active}>
          New
        </Link>
        <Link to={`/monthly/${formatDate(Date.now(), 'YYYY/MMMM').toLowerCase()}`} className={s.link} activeClassName={s.active}>
          Monthly
        </Link>
      </div>
    }
  </div>
);

PageHeader.propTypes = {
  showNavigation: PropTypes.bool.isRequired
};

PageHeader.defaultProps = {
  showNavigation: true
};

export default PageHeader;
