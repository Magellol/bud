import React from 'react';
import formatDate from 'date-fns/format';
import subMonths from 'date-fns/sub_months';
import addMonths from 'date-fns/add_months';
import isThisMonth from 'date-fns/is_this_month';
import PageHeader from '../../../../components/PageHeader';
import MonthlyHeader from '../PageHeader';
import CategoriesList from '../CategoriesList';
import { ucfirst } from '../../../../helpers/strings';

function formatLink(date) {
  return formatDate(date, 'YYYY/MMMM').toLowerCase();
}

function getNextView(nowDate) {
  const then = addMonths(nowDate, 1);
  return formatLink(then);
}

function getPreviousView(nowDate) {
  const then = subMonths(nowDate, 1);
  return formatLink(then);
}

function shouldDisplayNextLink(then) {
  return isThisMonth(then) === false;
}

const Monthly = (props) => {
  const { year, month } = props.router.params; // eslint-disable-line react/prop-types
  const viewingDate = new Date(`${month} 01, ${year}`);

  return (
    <div>
      <PageHeader />
      <MonthlyHeader
        label={`${ucfirst(month)} ${year}`}
        prevLinkDestination={`/monthly/${getPreviousView(viewingDate)}`}
        nextLinkDestination={shouldDisplayNextLink(viewingDate) ? `/monthly/${getNextView(viewingDate)}` : null}
      />
      <CategoriesList
        year={year}
        month={month}
      />
    </div>
  );
};

export default Monthly;
