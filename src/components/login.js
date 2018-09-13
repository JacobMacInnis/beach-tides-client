import React, { Component } from 'react';
import './login.css';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from './../config';
import { Redirect } from 'react-router-dom';
import { authRequest, authSuccess, authError, logout } from './../actions/auth';
import {saveAuthToken, clearAuthToken} from '../local-storage';
// import jwtDecode from 'jwt-decode';
// import { authError } from '../actions/auth';
class Login extends Component {
    state = {
      logoutRedirect: false,
      loginRedirect: false
    }
  logout = () => {
    this.props.dispatch(logout());
    clearAuthToken();
    this.setState({ logoutRedirect: true });
  };
  renderRedirect = () => {
    if (this.state.logoutRedirect) {
      this.setState({ logoutRedirect: false })
      return <Redirect to='/' />
    } else if (this.state.loginRedirect) {
      this.setState({ loginRedirect: false })
      return <Redirect to='/favorites' />
    }
  }

  googleResponse = (response) => {
    console.log(response);
    this.props.dispatch(authRequest());
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('http://localhost:8080/api/v1/auth/google', options)
    .then(response => {
      const token = response.headers.get('x-auth-token');
      response.json()
      .then(user => {
        if (token) {
          console.log(user, token, 'USER, TOKEN')
          this.props.dispatch(authSuccess(user, token));
          saveAuthToken(token);
          this.setState({ loginRedirect: true })
        }
      });
    })
    .catch(err => {
      this.props.dispatch(authError(err))
    })
  };

  onFailure = (error) => {
    alert(error);
  }

  renderConditionalAuthButtons() {
    if (this.props.isAuthenticated) {
      return (
        <div>
          <button onClick={() => this.logout()}>LOG ME OUT</button>
          {this.renderRedirect()}
        </div>
      )
    } else {
      return (<GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login with Google"
                  onSuccess={this.googleResponse}
                  onFailure={this.googleResponse}
                  className='my-google-button-class'
              />
      )
    }
  }    
  render() {
    return  (
          <div className='social-login-buttons'>
              {this.renderConditionalAuthButtons()}
          </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user 
  }
}


export default connect(mapStateToProps)(Login);