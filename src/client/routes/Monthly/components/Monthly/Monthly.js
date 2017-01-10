import React, { PropTypes } from 'react';
import PageHeader from '../../../../components/PageHeader';
import MonthlyHeader from '../PageHeader';
import OneFieldForm from '../../../../components/OneFieldForm';
import ENDPOINTS from '../../../../constants/endpoints';

const Monthly = props => (
  <div>
    <PageHeader />
    <MonthlyHeader month={props.router.params.month} />
    <OneFieldForm
      afterCreate={category => console.log(category)}
      fieldName="name"
      endpoint={ENDPOINTS.newCategory}
      placeholder="Add new category"
    />
  </div>
);

Monthly.propTypes = {
  router: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Monthly;
