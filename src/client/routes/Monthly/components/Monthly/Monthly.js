import React from 'react';
import PageHeader from '../../../../components/PageHeader';
import OneFieldForm from '../../../../components/OneFieldForm';
import ENDPOINTS from '../../../../constants/endpoints';

export default () => (
  <div>
    <PageHeader />
    <OneFieldForm
      afterCreate={category => console.log(category)}
      fieldName="name"
      endpoint={ENDPOINTS.newCategory}
      placeholder="Add new category"
    />
  </div>
);
