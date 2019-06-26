import React from 'react';
import moment from 'moment'

const PostSummary = ({post}) => {
  return (
    <div className="card post-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{post.title}</span>
        <p>Suggested by Dennis Vo</p>
        <p className="grey-text text-darken-3">
          Posted on: {moment(post.date).format('MMMM Do, YYYY')}
        </p>
      </div>
    </div>
  )
}

export default PostSummary;
