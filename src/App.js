import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import './App.css';

import Header from './components/header';
import SearchForm from './components/search-form';
import TideResults from './components/tide-results';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={SearchForm} />
        <Route exact path='/results' component={TideResults} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
  }
}

export default withRouter(connect(mapStateToProps)(App));
