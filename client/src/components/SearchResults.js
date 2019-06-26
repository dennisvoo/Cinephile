import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';

const API_KEY = '4f2273073e5d686e8071abb32cefd08f';
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

class SearchResults extends Component {
  state = {
    results: [],
    searchComplete: false,
    indexOfClickedItem: -1,
    title: '',
    desc: '',
    img: ''
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    axios
      .get(`${API_URL}?api_key=${API_KEY}&language=en-US&query=${params.query}`)
      .then(({ data }) => {
        this.setState({
          results: data.results.slice(0,10),
          searchComplete: true
        })
      })
  }

  handleClick = index => {
    this.setState({
      indexOfClickedItem: index,
      title: this.state.results[index].title,
      desc: this.state.results[index].overview,
      img: `${IMG_URL}${this.state.results[index].poster_path}`
    })
  }

  onSubmit = e => {
    const newPost = {
      title: this.state.title,
      desc: this.state.desc,
      img: this.state.img
    };

    this.props.addPost(newPost);

    this.setState({
      indexOfClickedItem: -1
    })

    this.props.history.push('/');
  };

  render() {
    if (this.state.searchComplete) {
      if (this.state.results.length !== 0) {
        const results = this.state.results.map((movie, index) => (
            <div
              className={this.state.indexOfClickedItem ===
                index ? "collection-item active" : "collection-item"}
              key={index}
              onClick={this.handleClick.bind(this, index)}
            >
              {movie.original_title}
            </div>
        ))
        return (
          <div>
            <div className="collection">{results}</div>
            <Button
              className={this.state.indexOfClickedItem ===
                -1 ?  "btn disabled" : "btn blue lighten-1"} block
              onClick={this.onSubmit}
              style={{ marginBottom: '2rem' }}
            >
                Suggest Movie
            </Button>
          </div>
        )
      } else {
        const params = queryString.parse(this.props.location.search);
        return (
          <div className="card search-error">
            <div className="card-content">
              <span className="card-title">
                Your search of "{params.query}" did not yield any results. Try refining your search.
              </span>
              <div className="go-home-btn">
                <Link to={'/'}>
                  <button className="btn blue lighten-1 float-right">
                    Go back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="card">
          <div className="card-content">
            <span className="card-title">Searching...</span>
          </div>
        </div>
      )
    }
  }
}

SearchResults.propTypes = {
  addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(SearchResults);
