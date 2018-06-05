import React, { Component } from 'react';
import fire from '../services/firebase';
import User from './User';
import Note from './Note';
import Notes from './Notes';


class Home extends Component {
  constructor(props) {
    super(props);

  }

  logout = () => {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className="col-md-6">
        <h1>You are home</h1>
        <User/>
        <Note/>
        <Notes/>
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}

export default Home;