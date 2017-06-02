import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Route, withRouter } from 'react-router-dom';
import TextBox from './TextBox';
import Button from './Button';

const getKey = i => i + 1;

const Thing = ({ match }) => (
  <h1>Thing {match.params.id}</h1>
);

Thing.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

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
      <Link to="/something">Click Here</Link>
      <Link to="/things/1">Click Here</Link>
      <Route
        path="/something"
        render={() =>
          <h1>Something</h1>
        }
      />
      <Route path="/things/:id" component={Thing} />
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Application));
