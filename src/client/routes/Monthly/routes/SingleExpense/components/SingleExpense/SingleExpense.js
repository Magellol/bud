/* eslint-disable react/prop-types */
import React from 'react';
import isSameMonth from 'date-fns/is_same_month';
import PageHeader from '../../../../../../components/PageHeader';
import MonthlyHeader from '../../../../../Monthly/components/PageHeader';
import Expense from '../../../SingleCategory/components/Expense';
import CategoriesList from '../../../../../../components/CategoriesList';
import Submit from '../../../../../../components/Submit';
import { get } from '../../../../../../helpers/requests';
import ENDPOINTS from '../../../../../../constants/endpoints';
import STRINGS from '../../../../../../constants/strings';
import s from './SingleExpense.css';

const SingleExpense = React.createClass({
  getInitialState() {
    return {
      expense: null,
      selectedCategory: null
    };
  },

  componentDidMount() {
    return get(`${ENDPOINTS.singleExpense}/${this.props.router.params.expenseId}`)
      .then(({ status, data }) => {
        if (status !== 'success') {
          throw new Error('Could not fetch the expense initially');
        }

        return this.setState({ expense: data });
      })
      .catch(error => console.error(error)); // TODO error handling.
  },

  shouldCheckRadioButton(categoryId) {
    const { expense, selectedCategory } = this.state;

    if (expense === null) {
      return false;
    }

    if (selectedCategory === null) {
      return categoryId === expense.ExpenseCategory.id;
    }

    return categoryId === selectedCategory.id;
  },

  isCurrentMonth(month, year) {
    const then = new Date(`${month} 01, ${year}`);

    return isSameMonth(then, new Date());
  },

  render() {
    const { expense, selectedCategory } = this.state;
    const { year, month } = this.props.router.params;
    return (
      <div>
        <PageHeader />
        <MonthlyHeader
          wrapperClasses={s.headerLabel}
          label={expense ? `${expense.ExpenseCategory.name}` : ''}
          prevLinkDestination={expense && `/monthly/${year}/${month}/${expense.ExpenseCategory.id}`}
        />

        {expense &&
          <div className={s.formWrapper}>
            <p className={s.label}>Expense</p>
            <div className={s.expenseWrapper}>
              <Expense
                name={expense.name || STRINGS.unnamedExpense}
                amount={expense.amount}
                createdAt={new Date(expense.createdAt)}
              />
            </div>

            {this.isCurrentMonth(month, year) &&
              <div>
                <p className={s.label}>
                  Is in
                  <span className={s.categoryName}>
                    {selectedCategory
                      ? selectedCategory.name
                      : expense.ExpenseCategory.name || null
                    }
                  </span>
                </p>

                <form className={s.form}>
                  <CategoriesList
                    wrapperClasses={s.categoriesWrapper}
                    onSelection={category => this.setState({ selectedCategory: category })}
                    shouldCheck={this.shouldCheckRadioButton}
                  />
                </form>
              </div>
            }
          </div>
        }
      </div>
    );
  }
});

export default SingleExpense;
