import React, { Component } from 'react';

export default class TopNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    return (
        !userSession.isSignInPending() ?
            <div className="container">
              <div className="d-flex flex-row-reverse bd-highlight">
                <div className="p-2 bd-highlight">Logout</div>
                <div className="p-2 bd-highlight">Home</div>
              </div>
            </div> :
            <div className="container">
              <div className="d-flex flex-row-reverse bd-highlight">
                <div className="p-2 bd-highlight">Logout</div>
                <div className="p-2 bd-highlight">发起投票</div>
                <div className="p-2 bd-highlight">Home</div>
              </div>
            </div>
    );
  }

  componentWillMount() {
    const { userSession } = this.props;
  }
}
