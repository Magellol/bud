import React, { PropTypes } from 'react';
import s from './Category.css';

const Category = props => (
  <div className={s.wrapper}>
    <p className={s.name}>{props.name}</p>
    <p className={s.amount}>${props.totalExpenses.toFixed(2)}</p>
  </div>
);

Category.propTypes = {
  name: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired
};

export default Category;
