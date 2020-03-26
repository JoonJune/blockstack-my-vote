import React, { Component } from 'react';
import Profile from './js/Profile.js';
import Signin from './js/Signin.js';
import Vote from './js/Vote.js';

import {
  UserSession,
  AppConfig
} from 'blockstack';

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

export default class App extends Component {


  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
        <div className="container">
          <div className="d-flex flex-row-reverse bd-highlight">
            <div className="p-2 bd-highlight" onClick={e => this.handleSignOut(e)}>Logout</div>
            <div className="p-2 bd-highlight">Home</div>
          </div>
          <div className="d-flex justify-content-center">
          {!userSession.isUserSignedIn() ? <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
          : <Vote userSession={userSession} handleSignOut={ this.handleSignOut } />
          }
          </div>
        </div>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    }
  }
}