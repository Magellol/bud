import React, { PropTypes } from 'react';
import classnames from 'classnames';
import RadioButton from '../RadioButton';
import { get } from '../../helpers/requests';
import ENDPOINTS from '../../constants/endpoints';
import s from './CategoriesList.css';

const CategoriesList = React.createClass({
  propTypes: {
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
    const wrapperClasses = classnames({
      [s.wrapper]: true,
      [s.show]: initiallyLoaded
    });

    return (
      <div className={wrapperClasses}>
        {
          (initiallyLoaded && categories.length === 0)
          ? <span className={s.emptyCategories}>You don’t have any categories :(</span>
          : null
        }

        {
          this.state.categories.map(category => (
            <RadioButton
              key={category.id}
              label={category.name}
              value={category.id}
              onChange={event => this.props.onSelection(category, event)}
              checked={this.props.shouldCheck(category.id)}
            />
          ))
        }
      </div>
    );
  }
});

export default CategoriesList;