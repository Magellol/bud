import React from 'react';
import PageHeader from '../PageHeader';
import s from './ErrorPage.css';

const ErrorPage = props => (
  <div className={s.wrapper}>
    <PageHeader />
    {props.children}
  </div>
);

ErrorPage.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default ErrorPage;
