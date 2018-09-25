import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_API_V1_AUTH_GOOGLE} from './../config';
import { Redirect } from 'react-router-dom';
import { authRequest, authSuccess, authError } from './../actions/auth';
import { saveAuthToken } from '../local-storage';

export class Login extends Component {
  renderRedirect = () => {
    console.log('tried');
      return <Redirect to='/favorites' />
  }
  googleResponse = (response) => {
    this.props.dispatch(authRequest());
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch(REACT_APP_API_V1_AUTH_GOOGLE, options)
    .then(response => {
      const token = response.headers.get('x-auth-token');
      response.json()
      .then(user => {
        if (token) {
          this.props.dispatch(authSuccess(user, token));
          saveAuthToken(token);
          this.props.history.push('/favorites')
        }
      });
    })
    .catch(err => {
      this.props.dispatch(authError(err))
    });
  };
  render() {
    return  (
        <div className='google-login'>
          <GoogleLogin
            clientId={REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse}
            className='my-google-button-class'
          />
          <span className='google-login-label'>To Save Locations! and More!</span>
        </div>
      );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    onFavorites: state.favorite.onFavorites
  }
}
export default connect(mapStateToProps)(Login);