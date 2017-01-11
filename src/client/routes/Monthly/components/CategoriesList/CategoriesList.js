import React, { PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import OneFieldForm from '../../../../components/OneFieldForm';
import Category from '../Category';
import ENDPOINTS from '../../../../constants/endpoints';
import s from './CategoriesList.css';
import { get } from '../../../../helpers/requests';

const CategoriesList = React.createClass({
  propTypes: {
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      categories: [],
      requestStatus: null
    };
  },

  componentDidMount() {
    const { month, year } = this.props;
    const endpoint = `${ENDPOINTS.monthlyExpenses}/${year}/${month}`;

    return get(endpoint)
      .then(({ status, data }) => {
        if (status === 'success') {
          return this.setState({ categories: data, requestStatus: 'done' });
        }

        throw new Error('Could not fetch the categories initially');
      })
      .catch(error => console.error(error)); // TODO, flash message maybe?
  },

  isCurrentMonth() {
    const { month, year } = this.props;
    const then = moment().year(year).month(month);

    return then.isSame(moment(), 'month');
  },

  afterCreateCategory(category) {
    return this.setState(prevState => ({
      categories: [...prevState.categories, category]
    }));
  },

  renderEmptyMessage() {
    return (
      <span className={s.emptyCategories}>You don’t have any categories :(</span>
    );
  },

  render() {
    const { categories, requestStatus } = this.state;

    const wrapperClasses = classnames({
      [s.wrapper]: true,
      [s.show]: this.state.requestStatus === 'done'
    });

    return (
      <div className={wrapperClasses}>
        {
          requestStatus === 'done' && categories.length === 0
          ? this.renderEmptyMessage()
          : null
        }

        {categories.map(category => (
          <Category
            key={category.id}
            name={category.name}
            totalExpenses={category.totalExpenses || 0}
          />
        ))}

        {this.isCurrentMonth() &&
          <OneFieldForm
            afterCreate={this.afterCreateCategory}
            endpoint={ENDPOINTS.newCategory}
            fieldName="name"
            placeholder="Add new category"
          />
        }
      </div>
    );
  }
});

export default CategoriesList;
