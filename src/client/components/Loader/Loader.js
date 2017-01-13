import React, { PropTypes } from 'react';
import s from './Loader.css';

const stuffToSay = [
  'Fetching stuff',
  'Grabbing you a sandwich',
  'Hold tight, we\'re almost there',
  'It\'s coming, I swear',
  'Working hard to get your stuff'
];

const Loader = React.createClass({
  propTypes: {
    delay: PropTypes.number
  },

  getDefaultProps() {
    return {
      delay: 0
    };
  },

  getInitialState() {
    return { show: false };
  },

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ show: true }), this.props.delay);
  },

  componentWillUnmount() {
    clearTimeout(this.timeout);
  },

  renderLoadingAnimation() {
    if (this.state.show === false) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * stuffToSay.length);
    return (
      <div className={s.wrapper}>
        <div className={s.loader} />
        <span className={s.text}>{`${stuffToSay[randomIndex]}...`}</span>
      </div>
    );
  },

  render() {
    return this.renderLoadingAnimation();
  }
});

export default Loader;
