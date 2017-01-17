import React, { PropTypes } from 'react';
import formatDate from 'date-fns/format';
import { ucfirst } from '../../../../../../helpers/strings';
import s from './Expense.css';

const Expense = props => (
  <div className={s.wrapper}>
    <div className={s.nameAndDate}>
      <span className={s.name}>{ucfirst(props.name)}</span>
      <span className={s.date}>{formatDate(props.createdAt, 'MMM Qo, YYYY')}</span>
    </div>
    <div className={s.amount}>${props.amount.toFixed(2)}</div>
  </div>
);

Expense.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired
};

export default Expense;
