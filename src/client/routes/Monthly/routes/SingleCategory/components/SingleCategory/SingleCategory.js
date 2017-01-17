/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../../../../../../components/PageHeader';
import MonthlyHeader from '../../../../components/PageHeader';
import Loader from '../../../../../../components/Loader';
import Category from '../../../../components/Category';
import Expense from '../Expense';
import Icon from '../../../../../../components/Icon';
import { ucfirst } from '../../../../../../helpers/strings';
import s from './SingleCategory.css';
import { get } from '../../../../../../helpers/requests';
import ENDPOINTS from '../../../../../../constants/endpoints';
import SVGs from '../../../../../../constants/svgs';
import STRINGS from '../../../../../../constants/strings';

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
    const { year, month, categoryId } = this.props.router.params;

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
              <span className={s.label}>
                Expenses <span className={s.expenseCount}>({category.Expenses.length})</span>
              </span>

              {category.Expenses.map(expense => (
                <Link
                  className={s.link}
                  to={`/monthly/${year}/${month}/${categoryId}/${expense.id}`}
                  key={expense.id}
                >
                  <Expense
                    amount={expense.amount}
                    name={expense.name || STRINGS.unnamedExpense}
                    createdAt={new Date(expense.createdAt)}
                  />

                  <Icon
                    className={s.chevron}
                    icon={SVGs.chevronRight}
                    size={20}
                  />
                </Link>
              ))}
            </div>
          </div>
        }
      </div>
    );
  }
});

export default SingleCategory;
