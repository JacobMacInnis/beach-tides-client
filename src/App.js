import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Header from './components/header';
import SearchForm from './components/search-form';
import TideResults from './components/tide-results';
import Login from './components/login'
import Favorites from './components/favorites';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Login />
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
