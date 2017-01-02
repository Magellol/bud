import React from 'react';
import Logo from '../../../../components/Logo';
import User from './components/User';
import s from './Home.css';

export default function Home() {
  return (
    <div className={s.wrapper}>
      <div className={s.logo}>
        <Logo />
      </div>

      <User username="Bear" first={true} />
      <User username="Real" />
    </div>
  );
}
