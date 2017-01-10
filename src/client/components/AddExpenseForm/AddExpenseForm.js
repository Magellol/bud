import React from 'react';
import classnames from 'classnames';
import CategoriesList from '../CategoriesList';
import s from './AddExpenseForm.css';
import Submit from '../Submit';
import ErrorMessage from '../ErrorMessage';
import { post } from '../../helpers/requests';
import ENDPOINTS from '../../constants/endpoints';

const AddExpenseForm = React.createClass({
  getInitialState() {
    return {
      amount: '',
      name: '',
      showName: false,
      category: null,
      validationError: null,
      requestStatus: null
    };
  },

  getRequestStatus() {
    const { requestStatus, validationError } = this.state;

    if (requestStatus === null) {
      return 'default';
    }

    if (requestStatus === 'pending') {
      return 'pending';
    }

    if (requestStatus === 'success' && validationError !== null) {
      return 'error';
    }

    return 'success';
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
    event.preventDefault();
    const { amount, category, name, showName } = this.state;

    this.setState({ requestStatus: 'pending', validationError: null });

    return post(ENDPOINTS.newExpense, {
      amount,
      ExpenseCategoryId: category ? category.id : null,
      name: showName === true ? name : null
    })
    .then(({ status, data }) => {
      if (status !== 'success') {
        const [messages] = Object.keys(data).map(v => data[v]);
        throw new Error(messages[0]); // Only show the first error message.
      }

      this.setState({
        amount: '',
        category: null,
        name: '',
        validationError: null,
        requestStatus: 'success'
      });

      return setTimeout(() => this.setState({ requestStatus: null }), 1500);
    })
    .catch(error => this.setState({ validationError: error.message, requestStatus: 'success' }));
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
    const { category: currentCategory, showName, validationError, requestStatus } = this.state;
    const categoryListClasses = classnames({
      [s.categoryList]: true,
      [s.slideUp]: showName
    });

    return (
      <form className={s.form} onSubmit={this.handleSubmit} noValidate={true}>

        <div className={s.addNameButtonWrapper}>
          <p className={s.label} style={{ marginBottom: 0 }}>Expense</p>
          <button
            type="button"
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
          <p className={s.label} style={{ marginBottom: '10px' }}>Goes in</p>
          <CategoriesList
            wrapperClasses={categoryListClasses}
            onSelection={this.handleCategorySelection}
            shouldCheck={id => (currentCategory ? currentCategory.id === id : false)}
          />
        </div>

        <div className={s.submitWrapper}>
          <Submit
            label="Add expense"
            status={this.getRequestStatus()}
            disabled={requestStatus === 'pending'}
          />
        </div>
        {validationError &&
          <div className={s.errorWrapper}>
            <ErrorMessage message={validationError} />
          </div>
        }

      </form>
    );
  }
});

export default AddExpenseForm;
