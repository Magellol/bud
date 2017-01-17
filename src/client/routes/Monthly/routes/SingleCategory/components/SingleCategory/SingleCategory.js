/* eslint-disable react/prop-types */
import React from 'react';
import PageHeader from '../../../../../../components/PageHeader';
import MonthlyHeader from '../../../../components/PageHeader';
import Loader from '../../../../../../components/Loader';
import Category from '../../../../components/Category';
import Expense from '../Expense';
import { ucfirst } from '../../../../../../helpers/strings';
import s from './SingleCategory.css';
import { get } from '../../../../../../helpers/requests';
import ENDPOINTS from '../../../../../../constants/endpoints';

const SingleCategory = React.createClass({
  getInitialState() {
    return {
      category: null,
      requestStatus: null
    };
  },

  componentDidMount() {
    const { year, month, categoryId } = this.props.router.params;

    return get(`${ENDPOINTS.monthlyCategory}/${year}/${month}/${categoryId}`)
      .then(({ status, data }) => {
        if (status !== 'success') {
          throw new Error('Could not initially fetch the category with its expenses');
        }

        this.setState({ category: data, requestStatus: 'done' });
      })
      .catch(error => console.error(error)); // TODO, error handling.
  },

  getTotalAmount(category) {
    if (typeof category.Expenses === 'undefined') {
      return 0;
    }

    return category.Expenses.reduce((acc, current) => acc + current.amount, 0);
  },

  render() {
    const { requestStatus, category } = this.state;
    const { year, month } = this.props.router.params;

    return (
      <div>
        <PageHeader />
        <MonthlyHeader
          wrapperClasses={s.pageHeader}
          label={`${ucfirst(month)} ${year}`}
          prevLinkDestination={`/monthly/${year}/${month}`}
        />

        {requestStatus === null &&
          <div className={s.loaderWrapper}>
            <Loader delay={500} />
          </div>
        }

        {category &&
          <div className={s.categoryWrapper}>
            <div className={s.categoryName}>
              <Category
                name={category.name}
                totalExpenses={this.getTotalAmount(category)}
              />
            </div>

            <div className={s.expensesWrapper}>
              {category.Expenses.map(expense => (
                <Expense
                  key={expense.id}
                  amount={expense.amount}
                  name={expense.name || category.name}
                  createdAt={new Date(expense.createdAt)}
                />
              ))}
            </div>
          </div>
        }
      </div>
    );
  }
});

export default SingleCategory;
