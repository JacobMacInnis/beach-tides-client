// import React from 'react';

// export default class Login extends React.Component {
//   render() {
//     return (
//       <div>
//         <h3>Login using...</h3>
//         <a className='google-btn' href='/auth/google'>Google</a>
//       </div>
//     )
//   }
// }     
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from './../config';

class App extends Component {

    constructor() {
        super();
        this.state = { 
          isAuthenticated: false, 
          user: null, 
          token: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    facebookResponse = (response) => {
      const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
          method: 'POST',
          body: tokenBlob,
          mode: 'cors',
          cache: 'default'
        };
        // THIS FETCH HAS 3000 local host. example had 4000
        fetch('http://localhost:3000/api/v1/auth/facebook', options).then(r => {
          const token = r.headers.get('x-auth-token');
          r.json().then(user => {
            if (token) {
              this.setState({isAuthentiated: true, user, token})
            }
          });
        })
    };

    googleResponse = (response) => {
      const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
      const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
      };
      // THIS FETCH HAS 3000 local host. example had 4000
      fetch('http://localhost:3000/api/v1/auth/google', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
          if (token) {
            this.setState({isAuthenticated: true, user, token})
          }
        });
      })
    };
    
    onFailure = (error) => {
      alert(error);
    }
    render() {
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    <FacebookLogin
                        appId={FACEBOOK_APP_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse} />
                    <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default App;