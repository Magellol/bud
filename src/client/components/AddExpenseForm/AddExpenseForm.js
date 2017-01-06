import React from 'react';
import CategoriesList from '../CategoriesList';
import s from './AddExpenseForm.css';
import Submit from '../Submit';

const AddExpenseForm = React.createClass({
  getInitialState() {
    return {
      amount: '',
      category: null
    };
  },

  handleAmountChange(event) {
    const { value: amount } = event.target;
    this.setState({ amount });
  },

  handleCategoryChange(event) {
    const { value } = event.target;
    this.setState({ category: parseInt(value, 10) });
  },

  handleSubmit(event) {
    event.preventDefault();
  },

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <p className={s.label}>Expense</p>
        <div className={s.inputWrapper}>
          <input
            type="number"
            min="0.01"
            className={s.input}
            placeholder="0.00"
            onChange={this.handleAmountChange}
            value={this.state.amount}
          />
        </div>

        <p className={s.label}>Goes in</p>

        <div className={s.scrollable}>
          <div className={s.categoriesWrapper}>
            <CategoriesList
              onChange={this.handleCategoryChange}
              shouldCheck={value => this.state.category === value}
            />
          </div>
        </div>

        <div className={s.submitWrapper}>
          <Submit label="Add expense" />
        </div>
      </form>
    );
  }
});

export default AddExpenseForm;
