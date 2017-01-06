import React, { PropTypes } from 'react';
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
      categories: []
    };
  },

  componentDidMount() {
    return get(ENDPOINTS.allCategories)
      .then(({ status, data }) => {
        if (status !== 'success') {
          throw new Error('Categories could not be fetched');
        }

        return this.setState({ categories: data });
      })
      .catch(error => console.error(error)); // TODO error handling.
  },

  render() {
    return (
      <div className={s.wrapper}>
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
