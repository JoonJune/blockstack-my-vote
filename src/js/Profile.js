import React, { Component } from 'react';

import {
  Person,
} from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	}
  	  },
      newState:"",
        status:""
  	};
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    return (
      !userSession.isSignInPending() ?
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
          <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" alt=""/>
        </div>
        <h1>Hello, <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>!</h1>
          <h1> description : <span id="">{ person.description() ? person.description() : "Nothing"}</span>!</h1>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={ handleSignOut.bind(this) }
          >
            Logout
          </button>
        </p>
        <textarea className="input-status"
                  value={this.state.newState}
                  onChange={e => this.handleNewStatusChange(e)}
                  placeholder="输入状态"/>
                  <br/>
                  <button onClick={e=>this.handleNewStatusSubmit(e)}>提交</button>
          <p> status is {this.state.status.text}</p>
      </div> : null
    );
  }

  handleNewStatusChange(e) {
      // 监听变化
      this.setState({
          newState : e.target.value
      });

  }

  handleNewStatusSubmit(e) {
      this.saveNewStatus(this.state.newState);
      this.setState({
          newState:""
      });
  }

  saveNewStatus(stateText) {
      const {userSession} = this.props
      // 定义格式
      let status = {
          text:stateText.trim()
          , create_dt: Date.now()
      }

      const options = {encrypt:false}
      userSession.putFile('status.json', JSON.stringify(status), options)
          .then(()=>{
              this.setState({
                  newStatus:status.text
              })
          });
  }

  componentDidMount() {
      this.fetchData();
  }

  fetchData() {
      const {userSession} = this.props;
      const options = {decrypt:false}
      userSession.getFile('status.json', options)
          .then((file) => {
              var status = JSON.parse(file || '[]');
              this.setState({
                  status:status
              })
          });
  }

    componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }
}
