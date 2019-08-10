import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deletePost, getPostInfo, getComments, addComment, deleteComment
} from '../actions/postActions';
import PropTypes from 'prop-types';
import moment from 'moment';

import CommentBox from './comments/CommentBox';
import CommentList from './comments/CommentList';

class MovieDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPostInfo(id);
    this.props.getComments(id);
  }

  handleClick = id => {
    this.props.deletePost(id);
    this.props.history.push('/');
  };

  render() {
    const postid = this.props.match.params.id;
    const movie = this.props.movie;
    const title = movie.title;
    const release_year = movie.release_year;
    const date = moment(movie.date).format('MMMM Do, YYYY');
    const { isAuthenticated, user } = this.props.auth;

    this.addComment = this.props.addComment.bind(this);
    this.deleteComment = this.props.deleteComment.bind(this);

    return (
      <div className="container white section movie-details">
        <div className="card blue-grey z-depth=0">
          <div className="card-content white-text">
            <img src={movie.img} align="left" hspace="20" alt="poster" />
            <span className="card-title" style={{fontSize: "300%"}}>
              {title} {release_year}
            </span>
            <br/>
            <b style={{fontSize:"150%"}}>Description</b>
            <p>{movie.desc}</p>
          </div>
          <div className="card-action gret lighten-4 white-text float-left">
            <div>
              Suggested by {movie.creator} on {date}
              {isAuthenticated && user.name === movie.creator ? (
                <button
                  className="btn blue lighten-1 float-right"
                  onClick={this.handleClick.bind(this,postid)}
                >
                    Delete
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <CommentBox
          addComment={this.addComment}
          postid={postid}
        />
        <CommentList
          comments={this.props.comments}
          deleteComment={this.deleteComment}
          postid={postid}
        />

      </div>
    )
  }
}

MovieDetails.propTypes = {
  deletePost: PropTypes.func.isRequired,
  getPostInfo: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  movie: state.post.movie,
  comments: state.post.comments,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, getPostInfo, getComments, addComment, deleteComment }
)(MovieDetails);
