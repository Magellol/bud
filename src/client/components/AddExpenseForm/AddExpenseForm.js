import React from 'react';
import RadioButton from '../RadioButton';
import s from './AddExpenseForm.css';
import Submit from '../Submit';

const AddExpenseForm = React.createClass({
  propTypes: {
    categories: React.PropTypes.node.isRequired
  },

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
    const { value: category } = event.target;
    this.setState({ category });
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
            <RadioButton label="Groceries" checked={this.state.category === "1"} onChange={this.handleCategoryChange} value="1" />
            <RadioButton label="Video Games" checked={this.state.category === "2"} onChange={this.handleCategoryChange} value="2" />
            <RadioButton label="Restaurants" checked={this.state.category === "3"} onChange={this.handleCategoryChange} value="3" />
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
