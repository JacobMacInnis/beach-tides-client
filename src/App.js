import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/header';
import Nav from './components/nav';
import SearchForm from './components/search-form';
import TideResults from './components/tide-results';
import Registration from './components/registration';
import Login from './components/login'
import Favorites from './components/favorites';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Login />
        <Nav />
        <Route exact path="/" render={() => this.props.tideData.length > 0 ? (<Redirect to='/results' />) : <SearchForm /> }  />
        <Route exact path='/results' component={TideResults} />
        <Route exact path='/Registration' component={Registration} />
        <Route exact path="/favorites"  component={Favorites} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    tideData: state.search.tideData
  }
}

export default withRouter(connect(mapStateToProps)(App));
