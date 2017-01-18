/* eslint-disable react/prop-types */
import React from 'react';
import isSameMonth from 'date-fns/is_same_month';
import PageHeader from '../../../../../../components/PageHeader';
import MonthlyHeader from '../../../../../Monthly/components/PageHeader';
import Expense from '../../../SingleCategory/components/Expense';
import CategoriesList from '../../../../../../components/CategoriesList';
import Submit from '../../../../../../components/Submit';
import { get, post } from '../../../../../../helpers/requests';
import ENDPOINTS from '../../../../../../constants/endpoints';
import STRINGS from '../../../../../../constants/strings';
import s from './SingleExpense.css';

const SingleExpense = React.createClass({
  getInitialState() {
    return {
      expense: null,
      selectedCategory: null,
      requestStatus: null
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

  getSubmitButtonStatus() {
    const { requestStatus } = this.state;

    if (requestStatus === null) {
      return 'default';
    }

    if (requestStatus === 'pending') {
      return 'pending';
    }

    return 'success';
  },

  handleSubmit(event) {
    event.preventDefault();

    const selectedCategory = this.state.selectedCategory !== null
      ? this.state.selectedCategory.id
      : this.state.expense.ExpenseCategory.id;

    this.setState({ requestStatus: 'pending' });

    return post(ENDPOINTS.updateExpense, {
      id: this.state.expense.id,
      ExpenseCategoryId: selectedCategory
    })
    .then(({ status }) => {
      if (status !== 'success') {
        throw new Error('Could not update the expense\'s category.');
      }

      this.setState({ requestStatus: 'success' });
      return setTimeout(() => this.setState({ requestStatus: null }), 1500);
    })
    .catch(error => console.error(error)); // TODO error handling.
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

                <form className={s.form} onSubmit={this.handleSubmit}>
                  <CategoriesList
                    wrapperClasses={s.categoriesWrapper}
                    onSelection={category => this.setState({ selectedCategory: category })}
                    shouldCheck={this.shouldCheckRadioButton}
                  />

                  <div className={s.submitWrapper}>
                    <Submit
                      label="Update"
                      status={this.getSubmitButtonStatus()}
                      disabled={this.state.requestStatus === 'pending'}
                    />
                  </div>
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
