import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from './Category.css';

const Category = props => (
  <Link className={s.wrapper} to={`/expense-categories/${props.id}`}>
    <p className={s.name}>{props.name}</p>
    <p className={s.amount}>${props.totalExpenses.toFixed(2)}</p>
  </Link>
);

Category.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired
};

export default Category;
