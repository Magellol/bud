import React from 'react';
import PageHeader from '../PageHeader';
import s from './ErrorPage.css';

const ErrorPage = props => (
  <div>
    <PageHeader showNavigation={false} />
    <div className={s.wrapper}>
      {props.children}
    </div>
  </div>
);

ErrorPage.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default ErrorPage;
