import React from 'react';
import classnames from 'classnames';
import CategoriesList from '../CategoriesList';
import s from './AddExpenseForm.css';
import Submit from '../Submit';

const AddExpenseForm = React.createClass({
  getInitialState() {
    return {
      amount: '',
      name: '',
      category: null,
      validationErrors: []
    };
  },

  handleInputChange(event) {
    const { name, value } = event.target;
    return this.setState({
      [name]: value
    });
  },

  handleCategorySelection(category) {
    return this.setState({ category });
  },

  handleSubmit(event) {
    event.preventDefault();
  },

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit} noValidate={true}>
        <p className={s.label}>Expense</p>
        <div className={classnames({ [s.inputWrapper]: true, [s.amount]: true })}>
          <input
            name="amount"
            type="number"
            min="0.01"
            className={s.input}
            placeholder="0.00"
            onChange={this.handleInputChange}
            value={this.state.amount}
          />
        </div>

        <div className={s.inputWrapper}>
          <input
            name="name"
            type="text"
            className={s.input}
            placeholder="Name your expense"
            onChange={this.handleInputChange}
            value={this.state.name}
          />
        </div>


        <div className={s.categoriesWrapper}>
          <p className={s.label}>Goes in</p>
          <CategoriesList
            onSelection={this.handleCategorySelection}
            shouldCheck={value => this.state.category === value}
          />
        </div>

        <div className={s.submitWrapper}>
          <Submit label="Add expense" />
        </div>
      </form>
    );
  }
});

export default AddExpenseForm;
