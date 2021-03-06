import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import Dashboard from './components/Dashboard';
import MovieDetails from './components/MovieDetails';
import SearchResults from './components/SearchResults';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppNavbar/>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/post/:id' component={MovieDetails}/>
              <Route path='/results/' component={SearchResults}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
