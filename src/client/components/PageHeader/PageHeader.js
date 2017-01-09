import React from 'react';
import { Link } from 'react-router';
import Logo from '../Logo';
import s from './PageHeader.css';

const PageHeader = () => (
  <div className={s.wrapper}>
    <Logo size="small" />
    <div className={s.links}>
      <Link to="/" className={s.link}>
        Logout
      </Link>
      <Link to="/dashboard" className={s.link} activeClassName={s.active}>
        Add Expense
      </Link>
      <Link to="/month" className={s.link} activeClassName={s.active}>
        Monthly
      </Link>
    </div>
  </div>
);

export default PageHeader;
