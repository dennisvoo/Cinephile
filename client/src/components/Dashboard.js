import React, { Component } from 'react';
import SuggestMovie from './SuggestMovie';
import MovieList from './MovieList';

class Dashboard extends Component {
  render() {
    return(
      <div className="dashboard container">
        <div>
          <SuggestMovie history={this.props.history}/>
          <MovieList/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
