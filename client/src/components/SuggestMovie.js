import React, { Component } from 'react';

class SuggestMovie extends Component {
  state = {
    query: '',
    invalidSearch: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      query: this.search.value.trim()
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        this.props.history.push(`/results?query=${this.search.value}`);
      } else {
        this.setState({
          invalidSearch: true
        })
      }
    })
  }

  render () {
    return (
      <div className="container">
        <form className="suggest-form white z-depth-5" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Search for a Movie to Suggest</h5>
          <input
            placeholder="Search for a movie..."
            ref={input => this.search = input}
          />

          <div className="input-field">
            <button className="btn blue lighten-1">Search</button>
          </div>
          <div style={this.state.invalidSearch ? {} : { display: 'none' }}>
            <h4>Your search is invalid. It must include at least 2 non-whitespace characters.</h4>
          </div>
        </form>
      </div>
    )
  }
}

export default SuggestMovie;
