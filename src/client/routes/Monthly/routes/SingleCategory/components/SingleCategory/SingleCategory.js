import React from 'react';
import PageHeader from '../../../../../../components/PageHeader';
import MonthlyHeader from '../../../../components/PageHeader';

const SingleCategory = React.createClass({
  render() {
    const { year, month } = this.props.router.params; // eslint-disable-line react/prop-types

    return (
      <div>
        <PageHeader />
        <MonthlyHeader
          label="Single cat"
          prevLinkDestination={`/monthly/${year}/${month}`}
        />
      </div>
    );
  }
});

export default SingleCategory;
