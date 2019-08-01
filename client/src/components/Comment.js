import React from "react";
import moment from 'moment'

const Comment = ({comment}) => {
  const { content, date } = comment;

  return (
    <div className="media mb-3">
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{moment(date).format('MMMM Do, YYYY')}</small>
        <h6 className="mt-0 mb-1 text-muted">Anon</h6>
        {content}
      </div>
    </div>
  );
}

export default Comment;
