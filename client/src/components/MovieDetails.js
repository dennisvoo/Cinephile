import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostInfo } from '../actions/postActions';
import PropTypes from 'prop-types';
import moment from 'moment'

class MovieDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPostInfo(id);
  }

  render() {
    const movie = this.props.movie;

    return (
      <div className="container section movie-details">
        <div className="card blue-grey z-depth=0">
          <div className="card-content white-text">
            <img src={movie.img} align="left" hspace="20" alt="poster" />
            <span className="card-title" style={{fontSize: "300%"}}>{movie.title}</span>
            <br/>
            <b style={{fontSize:"150%"}}>Description</b>
            <p >{movie.desc}</p>
          </div>
          <div className="card-action gret lighten-4 white-text">
            <div>Suggested by Dennis Vo</div>
            <div>Posted: {moment(movie.date).format('MMMM Do, YYYY')}</div>
          </div>
        </div>
      </div>
    )
  }
}

MovieDetails.propTypes = {
  getPostInfo: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  movie: state.post.movie
});

export default connect(mapStateToProps, { getPostInfo })(MovieDetails);
