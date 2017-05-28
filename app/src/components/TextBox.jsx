import React from 'react';
import PropTypes from 'prop-types';

if (process.env.BROWSER) {
  require('../css/forms.css'); // eslint-disable-line
}

export default class TextBox extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  }
  static defaultProps = {
    onChange: () => {},
    value: '',
  }
  render = () => (
    <input
      className="form-control"
      type="text"
      value={this.props.value}
      placeholder="Insert Text Here"
      onChange={this.props.onChange}
    />
  )
}

