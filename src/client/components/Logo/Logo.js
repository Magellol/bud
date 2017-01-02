import React from 'react';
import s from './Logo.css';

export default function Logo() {
  return (
    <div className={s.logo}>
      Bud<span className={s.dot}>.</span>
    </div>
  );
}
