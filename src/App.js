import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Header from './components/header';
import SearchForm from './components/search-form';
import TideResults from './components/tide-results';
import Favorites from './components/favorites';
import Nav from './components/nav';
import { fetchTheme } from './actions/favorite';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    if(this.props.isAuthenticated) {
      this.props.dispatch(fetchTheme());
    }
  }
  render() {
    return (
      <div className={this.props.theme === 'night' ? 'App night' : 'App day'} >
        <Header />
        <Nav />
        <Route exact path="/" render={() => this.props.tideData === undefined || this.props.tideData.length < 1 ? <SearchForm />  : (<Redirect to='/results' />) }  />
        <Route exact path='/results' component={TideResults} />
        <Route exact path="/favorites"  component={Favorites} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    tideData: state.search.tideData,
    theme: state.favorite.theme,
    isAuthenticated: state.auth.isAuthenticated,
    renderRedirect: state.protected.renderRedirect
  }
}

export default withRouter(connect(mapStateToProps)(App));
