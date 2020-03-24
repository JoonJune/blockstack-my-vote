import React, { Component } from 'react';

export default class Signin extends Component {

  render() {
    const {handleSignIn } = this.props;

    return (
        <div className="container-sm">
          <div className="jumbotron">
            <h1 className="display-4">Hi</h1>
            <p className="h6">这是一个匿名投票项目, 只有我知道我的选择</p>
            <hr className="my-4"/>
            <div className="d-flex justify-content-center">
              <button id="signin-button"
                      type="button"
                      className="btn btn-primary"
                      onClick={ handleSignIn.bind(this) }>Sign In With Blockstack</button>
            </div>
          </div>
        </div>
    );
  }
}
