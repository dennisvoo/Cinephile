import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostInfo, getComments, addComment } from '../actions/postActions';
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

  render() {
    const movie = this.props.movie;
    this.addComment = this.props.addComment.bind(this);

    return (
      <div className="container white section movie-details">
        <div className="card blue-grey z-depth=0">
          <div className="card-content white-text">
            <img src={movie.img} align="left" hspace="20" alt="poster" />
            <span className="card-title" style={{fontSize: "300%"}}>{movie.title}</span>
            <br/>
            <b style={{fontSize:"150%"}}>Description</b>
            <p>{movie.desc}</p>
          </div>
          <div className="card-action gret lighten-4 white-text">
            <div>Suggested by Dennis Vo on {moment(movie.date).format('MMMM Do, YYYY')}</div>
          </div>
        </div>

        <CommentBox
          addComment={this.addComment}
          id={this.props.match.params.id}
        />
        <CommentList comments={this.props.comments}/>

      </div>
    )
  }
}

MovieDetails.propTypes = {
  getPostInfo: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  movie: state.post.movie,
  comments: state.post.comments
});

export default connect(mapStateToProps, { getPostInfo, getComments, addComment })(MovieDetails);
