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


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Route exact path="/" render={() => this.props.tideData.length > 0 ? (<Redirect to='/results' />) : <SearchForm /> }  />
        <Route exact path='/results' component={TideResults} />
        <Route exact path='/Registration' component={Registration} />
        <Route exact path='/auth/login' component={Login} />
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
