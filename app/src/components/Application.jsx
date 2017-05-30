import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextBox from './TextBox';
import Button from './Button';

const getKey = i => i + 1;

class Application extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPostAdd: PropTypes.func.isRequired,
  }
  state = {
    textValue: '',
  }
  onButtonClick = () => {
    this.props.onPostAdd(this.state.textValue);
    this.setState({
      textValue: '',
    });
  }
  onTextChange = (e) => {
    this.setState({
      textValue: e.target.value,
    });
  }
  render = () => (
    <div>
      <h1>Title</h1>
      <ul>
        {
          this.props.posts.map((post, i) => (
            <li key={getKey(i)}>{post}</li>
          ))
        }
      </ul>
      <TextBox onChange={this.onTextChange} value={this.state.textValue} />
      <Button onClick={this.onButtonClick}>Click Me</Button>
    </div>
  )
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  onPostAdd: (name) => {
    dispatch({
      type: 'ADD_POST',
      payload: name,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Application);
