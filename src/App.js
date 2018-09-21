import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Header from './components/header';
import SearchForm from './components/search-form';
import TideResults from './components/tide-results';
import Favorites from './components/favorites';
import Nav from './components/nav';
import Theme from './components/theme';
import FadingMessageElement from './components/fading-message-element';
import { fetchTheme } from './actions/theme';
import BeachTidesLogo from './img/BeachTidesLogo.png';
import './App.css';


export class App extends React.Component {
  componentDidMount() {
    if(this.props.isAuthenticated) {
      this.props.dispatch(fetchTheme());
    }
  }
  render() {
    let loading;
    if ( this.props.searchLoading || this.props.protectedLoading || this.props.favoritesLoading || this.props.themeLoading ) {
      loading = true;
    }
    return (
      <div className={this.props.theme === 'night' ? 'App night' : 'App day'} >
        { this.props.isAuthenticated && <Theme /> }
        <Header />
        <Nav />
        { loading === true && <div className='water-grow'><div className='water-move'><img src={BeachTidesLogo} className="water-spin" alt="logo" /></div></div>}
        <Route exact path="/" render={() => this.props.tideData === undefined || this.props.tideData.length < 1 ? <SearchForm />  : (<Redirect to='/results' />) }  />
        <Route exact path='/results' component={TideResults} />
        <Route exact path="/favorites"  component={Favorites} />
        { <FadingMessageElement/> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    tideData: state.search.tideData,
    theme: state.theme.theme,
    isAuthenticated: state.auth.isAuthenticated,
    renderRedirect: state.protected.renderRedirect,
    authLoading: state.auth.loading,
    searchLoading: state.search.loading,
    protectedLoading: state.protected.loading,
    favoritesLoading: state.favorite.loading,
    themeLoading: state.theme.loading
  }
}

export default withRouter(connect(mapStateToProps)(App));
