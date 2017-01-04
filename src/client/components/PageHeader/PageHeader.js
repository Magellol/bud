import React from 'react';
import Logo from '../Logo';
import s from './PageHeader.css';

const PageHeader = () => (
  <div className={s.wrapper}>
    <Logo size="small" />
  </div>
);

export default PageHeader;
