import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { ucfirst } from '../../../../helpers/strings';
import Icon from '../../../../components/Icon';
import SVGs from '../../../../constants/svgs';
import s from './PageHeader.css';

function formatLink(momentObject) {
  return momentObject.format('YYYY/MMMM').toLowerCase();
}

function getNextView(momentObject) {
  const then = moment(momentObject).add(1, 'months');
  return formatLink(then);
}

function getPreviousView(momentObject) {
  const then = moment(momentObject).subtract(1, 'months');
  return formatLink(then);
}

function shouldDisplayNextLink(then) {
  return then.isBefore(moment(), 'month');
}

const PageHeader = (props) => {
  const currentMoment = moment().month(props.month).year(props.year);

  return (
    <div className={s.wrapper}>
      <Link className={s.link} to={`/monthly/${getPreviousView(currentMoment)}`}>
        <Icon
          className={s.chevron}
          icon={SVGs.chevronLeft}
          size={20}
        />
      </Link>

      <span className={s.month}>{ucfirst(props.month)}</span>

      <Link
        to={`/monthly/${getNextView(currentMoment)}`}
        className={shouldDisplayNextLink(currentMoment) === false ? s.hide : s.link}
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

const allMonths = moment.months().map(m => m.toLowerCase());
PageHeader.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.oneOf(allMonths).isRequired
};

export default PageHeader;
