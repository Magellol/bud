import React, { PropTypes } from 'react';
import formatDate from 'date-fns/format';
import subMonths from 'date-fns/sub_months';
import addMonths from 'date-fns/add_months';
import isThisMonth from 'date-fns/is_this_month';
import { Link } from 'react-router';
import { ucfirst } from '../../../../helpers/strings';
import Icon from '../../../../components/Icon';
import SVGs from '../../../../constants/svgs';
import s from './PageHeader.css';

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

const PageHeader = (props) => {
  const viewingDate = new Date(`${props.month} 01, ${props.year}`);

  return (
    <div className={s.wrapper}>
      <Link className={s.link} to={`/monthly/${getPreviousView(viewingDate)}`}>
        <Icon
          className={s.chevron}
          icon={SVGs.chevronLeft}
          size={20}
        />
      </Link>

      <span className={s.month}>
        {`${ucfirst(props.month)} ${props.year}`}
      </span>

      <Link
        to={`/monthly/${getNextView(viewingDate)}`}
        className={shouldDisplayNextLink(viewingDate) === false ? s.hide : s.link}
      >
        <Icon
          className={s.chevron}
          icon={SVGs.chevronRight}
          size={20}
        />
      </Link>
    </div>
  );
};

PageHeader.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired
};

export default PageHeader;
