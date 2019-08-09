import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment'

class Comment extends Component {
  handleClick = (postid, commentid) => {
    this.props.deleteComment(postid, commentid);
    console.log('delete');
  };

  render() {
    const { content, date, creator, _id } = this.props.comment;
    const postid = this.props.postid;
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div className="media mb-3">
        <div className="media-body p-2 shadow-sm rounded bg-light border">
          <small className="float-right text-muted">{moment(date).format('MMMM Do, YYYY')}</small>
            <h6 className="mt-0 mb-1 text-muted">{creator}
            {isAuthenticated && user.name === creator ? (
              <Button
                className='remove-btn'
                color='danger'
                size='sm'
                onClick={this.handleClick.bind(this, postid, _id)}
              >
                &times;
              </Button>
            ) : null}
            </h6>
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Comment);
