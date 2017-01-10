import React, { PropTypes } from 'react';
import { months } from 'moment';
import { ucfirst } from '../../../../helpers/strings';
import s from './PageHeader.css';

const allMonths = months().map(m => m.toLowerCase());

const PageHeader = props => (
  <div className={s.wrapper}>
    <span className={s.month}>{ucfirst(props.month)}</span>
  </div>
);

PageHeader.propTypes = {
  month: PropTypes.oneOf(allMonths)
};

export default PageHeader;
