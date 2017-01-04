import React from 'react';
import PageHeader from '../PageHeader';

const ErrorPage = props => (
  <div>
    <PageHeader />
    {props.children}
  </div>
);

ErrorPage.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default ErrorPage;
