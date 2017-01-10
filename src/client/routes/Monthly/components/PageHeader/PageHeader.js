import React, { PropTypes } from 'react';
import { months } from 'moment';
import s from './PageHeader.css';

const PageHeader = props => (
  <div className={s.wrapper}>
    {props.month}
  </div>
);

PageHeader.propTypes = {
  month: PropTypes.oneOf(months())
};

export default PageHeader;
