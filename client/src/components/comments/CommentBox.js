import React, { Component, Fragment } from "react";

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      comment: {
        content: ""
      }
    };
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      comment: {
        [e.target.name] : e.target.value
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "Comment cannot be empty." });
      return;
    }

    this.setState({ error: "" });

    this.props.addComment(this.state.comment, this.props.id);

    this.setState({
      comment: { content: "" }
    });
  }

  isFormValid() {
    return this.state.comment.content !== "" ;
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
              placeholder="Your Comment"
              name="content"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button className="btn btn-primary">
              Comment &#10148;
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default CommentBox;
