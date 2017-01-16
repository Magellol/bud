import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import Icon from '../../../../components/Icon';
import SVGs from '../../../../constants/svgs';
import s from './PageHeader.css';

function getLinkClasses(shouldDisplay) {
  return classnames({
    [s.link]: true,
    [s.hide]: shouldDisplay === false
  });
}

function getWrapperClasses(classesInProps) {
  return classnames(classesInProps, s.wrapper);
}

function renderLink(chevron, to) {
  const linkClasses = getLinkClasses(!!to);

  return (
    <Link
      to={to}
      className={linkClasses}
    >
      <Icon
        className={s.chevron}
        icon={chevron}
        size={20}
      />
    </Link>
  );
}

const PageHeader = props => (
  <div className={getWrapperClasses(props.wrapperClasses)}>
    {renderLink(SVGs.chevronLeft, props.prevLinkDestination)}

    <span className={s.label}>
      {props.label}
    </span>

    {renderLink(SVGs.chevronRight, props.nextLinkDestination)}
  </div>
);

PageHeader.propTypes = {
  label: PropTypes.string.isRequired,
  prevLinkDestination: PropTypes.string,
  nextLinkDestination: PropTypes.string,
  wrapperClasses: PropTypes.string
};

export default PageHeader;
