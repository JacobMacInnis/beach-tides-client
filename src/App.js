import React from 'react';
import './App.css';
import Header from './components/header';
import SearchForm from './components/search-form';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm />
      </div>
    );
  }
}


