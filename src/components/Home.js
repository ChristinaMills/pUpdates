import React, { Component } from 'react';
import fire from '../services/firebase';

class Home extends Component {
  constructor(props) {
    super(props);

  }

  logout = (e) => {
    fire.auth().signOut()
  }

  render() {
    return (
      <div className="col-md-6">
        <h1>You are home</h1>
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}

export default Home;