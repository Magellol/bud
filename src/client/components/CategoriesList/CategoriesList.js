import React, { PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { Link } from 'react-router';
import RadioButton from '../RadioButton';
import { get } from '../../helpers/requests';
import ENDPOINTS from '../../constants/endpoints';
import s from './CategoriesList.css';

const CategoriesList = React.createClass({
  propTypes: {
    wrapperClasses: PropTypes.string,
    onSelection: PropTypes.func.isRequired,
    // Function to know if the radio button must be checked. It'll get the current
    // radio button value as first argument
    shouldCheck: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      initiallyLoaded: false,
      categories: []
    };
  },

  componentDidMount() {
    return get(ENDPOINTS.allCategories)
      .then(({ status, data }) => {
        if (status !== 'success') {
          throw new Error('Categories could not be fetched');
        }

        return this.setState({ categories: data, initiallyLoaded: true });
      })
      .catch(error => console.error(error)); // TODO error handling.
  },

  render() {
    const { categories, initiallyLoaded } = this.state;
    const wrapperClasses = classnames(this.props.wrapperClasses, {
      [s.wrapper]: true,
      [s.show]: initiallyLoaded
    });

    return (
      <div className={wrapperClasses}>
        {
          (initiallyLoaded && categories.length === 0)
          ? <span className={s.emptyCategories}>
            <p>You don’t have any categories.</p>
            <Link to={`/monthly/${moment().format('YYYY/MMMM').toLowerCase()}`}>Create your first one</Link>
          </span>
          : null
        }

        {this.state.categories.map(category => (
          <RadioButton
            key={category.id}
            label={category.name}
            value={category.id}
            onChange={event => this.props.onSelection(category, event)}
            checked={this.props.shouldCheck(category.id)}
          />
        ))}
      </div>
    );
  }
});

export default CategoriesList;
