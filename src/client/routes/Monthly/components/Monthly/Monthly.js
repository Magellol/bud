import React, { PropTypes } from 'react';
import PageHeader from '../../../../components/PageHeader';
import MonthlyHeader from '../PageHeader';
import CategoriesList from '../CategoriesList';

const Monthly = props => (
  <div>
    <PageHeader />
    <MonthlyHeader month={props.router.params.month} />
    <CategoriesList
      year={props.router.params.year}
      month={props.router.params.month}
    />
  </div>
);

Monthly.propTypes = {
  router: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Monthly;
