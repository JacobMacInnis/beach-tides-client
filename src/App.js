import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect, Link } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Nav from './components/nav';
import SearchForm from './components/search-form';
import TideResults from './components/tide-results';
import Login from './components/login'
import Favorites from './components/favorites';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Login />
        <Nav />
        {/* <Link to='/favorites'>SEE MY FAVORITES</Link> */}
        {/* component, renders nother or does reder depending on state && if path doesn't equal (favorites) */}
        <Route exact path="/" render={() => this.props.tideData === undefined || this.props.tideData.length < 1 ? <SearchForm />  : (<Redirect to='/results' />) }  />
        <Route exact path='/results' component={TideResults} />
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
