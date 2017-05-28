import React from 'react';
import PropTypes from 'prop-types';

if (process.env.BROWSER) {
  require('../css/buttons.css'); // eslint-disable-line
}

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render() {
    return (
      <button className="btn" {...this.props}>{this.props.children}</button>
    );
  }
}

