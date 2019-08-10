import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      comment: {
        content: '',
        creator: ''
      }
    };
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      comment: {
        [e.target.name] : e.target.value,
        creator: this.props.auth.user.name
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: 'Comment cannot be empty.' });
      return;
    }

    if (!this.isLoggedIn()) {
      this.setState({ error: 'User must be logged in to comment.' });
      return;
    }

    this.setState({ error: "" });

    this.props.addComment(this.state.comment, this.props.postid);

    this.setState({
      comment: { content: '', creator: '' }
    });
  }

  isFormValid() {
    return this.state.comment.content.trim() !== '';
  }

  isLoggedIn() {
    return this.props.auth.isAuthenticated;
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <Fragment>
        <form method="post" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <textarea
              onChange={this.handleChange}
              value={this.state.comment.content}
              placeholder='Your Comment'
              name='content'
              rows='5'
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button className="btn blue lighten-1">
              Comment &#10148;
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

CommentBox.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(CommentBox);
