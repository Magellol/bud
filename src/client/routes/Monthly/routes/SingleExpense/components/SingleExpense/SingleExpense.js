import React from 'react';
import PageHeader from '../../../../../../components/PageHeader';
import MonthlyHeader from '../../../../../Monthly/components/PageHeader';
import Expense from '../../../SingleCategory/components/Expense';
import { get } from '../../../../../../helpers/requests';
import s from './SingleExpense.css';

const SingleExpense = React.createClass({
  getInitialState() {
    return {
      expense: null,
      requestStatus: null
    };
  },

  componentDidMount() {
    // return get(ENDPOINTS.)
  },

  render() {
    return (
      <div>
        <PageHeader />
        <MonthlyHeader
          label="Single expense"
        />

        <div className={s.expenseWrapper}>
          <Expense
            name="Expense 1"
            amount={25.00}
            createdAt={new Date()}
          />
        </div>
      </div>
    );
  }
});

export default SingleExpense;
