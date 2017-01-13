import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import isSameMonth from 'date-fns/is_same_month';
import classnames from 'classnames';
import OneFieldForm from '../../../../components/OneFieldForm';
import Category from '../Category';
import Loader from '../../../../components/Loader';
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
    return this.getAndSetCategories(this.props.year, this.props.month);
  },

  componentWillReceiveProps(nextProps) {
    const { year: currentYear, month: currentMonth } = this.props;
    if (currentYear === nextProps.year && currentMonth === nextProps.month) {
      return false;
    }

    return this.getAndSetCategories(nextProps.year, nextProps.month);
  },

  getAndSetCategories(year, month) {
    const endpoint = `${ENDPOINTS.monthlyExpenses}/${year}/${month}`;

    this.setState({ requestStatus: null });
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
    const then = new Date(`${month} 01, ${year}`);

    return isSameMonth(then, new Date());
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
      <div>
        {requestStatus === null &&
          <div className={s.loader}>
            <Loader delay={400} />
          </div>
        }

        <div className={wrapperClasses}>
          {
            requestStatus === 'done' && categories.length === 0
            ? this.renderEmptyMessage()
            : null
          }

          {categories.map(category => (
            <Link
              className={s.link}
              to={`/monthly/${this.props.year}/${this.props.month}/${category.id}`}
            >
              <Category
                key={category.id}
                name={category.name}
                totalExpenses={category.totalExpenses || 0}
              />
            </Link>
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
      </div>
    );
  }
});

export default CategoriesList;
