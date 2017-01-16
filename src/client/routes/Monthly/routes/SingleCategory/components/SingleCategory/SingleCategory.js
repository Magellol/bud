import React from 'react';
import PageHeader from '../../../../../../components/PageHeader';
import MonthlyHeader from '../../../../components/PageHeader';
import { ucfirst } from '../../../../../../helpers/strings';
import s from './SingleCategory.css';

const SingleCategory = React.createClass({
  render() {
    const { year, month } = this.props.router.params; // eslint-disable-line react/prop-types

    return (
      <div>
        <PageHeader />
        <MonthlyHeader
          wrapperClasses={s.pageHeader}
          label={`${ucfirst(month)} ${year}`}
          prevLinkDestination={`/monthly/${year}/${month}`}
        />
      </div>
    );
  }
});

export default SingleCategory;
