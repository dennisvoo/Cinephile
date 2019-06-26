import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postActions';
import PropTypes from 'prop-types';

import PostSummary from './PostSummary';

class MovieList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const posts = this.props.posts;
    return (
      <div className="project-list section">
        {posts && posts.map(post => {
          return(
            <Link style={{ textDecoration: 'none' }} to={'/post/' + post._id} key={post._id}>
              <PostSummary post={post} />
            </Link>
          )
        })}
      </div>
    );
  }
}

MovieList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  posts: state.post.posts
});

export default connect(mapStateToProps, { getPosts })(MovieList);
