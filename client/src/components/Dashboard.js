import React, { Component } from 'react';
import SuggestMovie from './SuggestMovie';
import MovieList from './MovieList';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  render() {
    return(
      <div className="dashboard container">
        <div>
          {this.props.isAuthenticated ?
            <SuggestMovie history={this.props.history}/> :
              <h5 className="guest-welcome">
              Welcome to Cinephile! Log in/Sign up to suggest movies.</h5> }
          <MovieList/>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Dashboard);
