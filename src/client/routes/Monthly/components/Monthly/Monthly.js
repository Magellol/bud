import React, { PropTypes } from 'react';
import PageHeader from '../../../../components/PageHeader';
import MonthlyHeader from '../PageHeader';
import CategoriesList from '../CategoriesList';

const Monthly = (props) => {
  const { year, month } = props.router.params;
  return (
    <div>
      <PageHeader />
      <MonthlyHeader month={month} year={year} />
      <CategoriesList
        year={year}
        month={month}
      />
    </div>
  );
};

Monthly.propTypes = {
  router: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Monthly;
