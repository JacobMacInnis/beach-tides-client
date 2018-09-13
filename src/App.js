import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect, Link } from 'react-router-dom';
import './App.css';

import Header from './components/header';
import SearchForm from './components/search-form';
import TideResults from './components/tide-results';
import Registration from './components/registration';
import Login from './components/login'
import Favorites from './components/favorites';

class App extends React.Component {
  render() {
    // console.log(this.props.tideData)
    return (
      <div className="App">
        <Header />
        <Login />
        <Link to='/favorites'>SEE MY FAVORITES</Link>
        <Route exact path="/" render={() => this.props.tideData === undefined || this.props.tideData.length < 1 ? <SearchForm />  : (<Redirect to='/results' />) }  />
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
