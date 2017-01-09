import React from 'react';
import { Link } from 'react-router';
import ErrorPage from '../ErrorPage';
import s from './NotFoundError.css';

export default () => (
  <ErrorPage>
    <h1 className={s.title}>
      It looks like the page you&rsquo;re looking for does not exist
      <span className={s.dot}></span>
    </h1>
    <Link to="/" className={s.goBackHome}>Head back to home page.</Link>
  </ErrorPage>
);
