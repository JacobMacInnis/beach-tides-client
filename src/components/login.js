import React, { Component } from 'react';
import './login.css';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from './../config';
import { authRequest, authSuccess, authError, logout } from './../actions/auth';
import {saveAuthToken, clearAuthToke} from '../local-storage';
// import jwtDecode from 'jwt-decode';
// import { authError } from '../actions/auth';
class Login extends Component {
  logout = () => {
        this.props.dispatch(logout())
  };

  facebookResponse = (response) => {
    this.props.dispatch(authRequest())
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    // THIS FETCH HAS 3000 local host. example had 4000
    fetch('http://localhost:8080/api/v1/auth/facebook', options).then(r => {
      const token = r.headers.get('x-auth-token');
      console.log(token)
      r.json().then(user => {
        if (token) {
          console.log(token)
          this.props.dispatch(authSuccess(user, token));
          this.props.saveAuthToken(token);
        }
      });
    })
    .catch(err => {
      this.props.dispatch(authError(err))
    })
  };
  

  googleResponse = (response) => {
    this.props.dispatch(authRequest());
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('http://localhost:8080/api/v1/auth/google', options)
    .then(r => {
      const token = r.headers.get('x-auth-token');
      r.json()
      .then(user => {
        if (token) {
          console.log(token, 'TOKEN')
          // this.setState({isAuthenticated: true, user, token})
        this.props.dispatch(authSuccess(user, token))
        saveAuthToken(token);
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
  render() {
    let content = !!this.props.isAuthenticated ? 
      (
          <div>
              <p>Authenticated</p>
              <div>
                  {/* {this.state.user.email} */}
              </div>
              <div>
                  <button onClick={this.logout} className="button">
                      Log out
                  </button>
              </div>
          </div>
      ) :
      (
          <div className='social-login-buttons'>
              <FacebookLogin
                  appId={FACEBOOK_APP_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={this.facebookResponse}
                  cssClass='my-facebook-button-class' />
              <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login with Google"
                  onSuccess={this.googleResponse}
                  onFailure={this.googleResponse}
                  className='my-google-button-class'
              />
          </div>
      );
    return (
      <div className="Login">
        {content}
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