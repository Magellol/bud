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
      showName: false,
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

  handleToggleName() {
    return this.setState(prevState => ({
      showName: prevState.showName === false
    }));
  },

  handleSubmit(event) {
    // When submitting the name (null or string),
    // check if the user decided to hide the name first, if he did, set the name to be null
    // we keep it in the state in case the user don't actually want to delete it.
    event.preventDefault();
  },

  renderNameInput() {
    return (
      <div className={s.name}>
        <input
          name="name"
          type="text"
          className={s.input}
          placeholder="Luke's birthday"
          onChange={this.handleInputChange}
          value={this.state.name}
        />
      </div>
    );
  },

  render() {
    const { category: currentCategory, showName } = this.state;

    return (
      <form className={s.form} onSubmit={this.handleSubmit} noValidate={true}>

        <div className={s.addNameButtonWrapper}>
          <p className={s.label}>Expense</p>
          <button
            className={s.addName}
            onClick={this.handleToggleName}
          >
            {showName ? 'Remove description' : 'Add description'}
          </button>
        </div>

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

        { showName && this.renderNameInput() }

        <div className={s.categoriesWrapper}>
          <p className={s.label}>
            Goes in {
              currentCategory && <span className={s.categoryName}>{currentCategory.name}</span>
            }
          </p>

          <CategoriesList
            onSelection={this.handleCategorySelection}
            shouldCheck={id => (currentCategory ? currentCategory.id === id : false)}
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
