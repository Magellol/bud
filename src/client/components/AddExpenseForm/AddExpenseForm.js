import React from 'react';
import s from './AddExpenseForm.css';

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

  handleChange(event) {
    const { value: amount } = event.target;
    this.setState({ amount });
  },

  handleSubmit(event) {
    event.preventDefault();
  },

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>

        <div className={s.inputWrapper}>
          <input
            className={s.input}
            placeholder="0.00"
            onChange={this.handleChange}
            value={this.state.amount}
          />
        </div>

        <div className={s.categoriesWrapper}>
          {
            this.props.categories.map(category => console.log(category))
          }
        </div>

      </form>
    );
  }
});

export default AddExpenseForm;
