// import firestore from 'firestore';
import React, { Component } from 'react';
import fire, { db } from '../services/firebase';
// import  User  from './User';
// import Auth from './Auth';
import Login from './Login';
import Home from './Home';

export default class App extends Component {

  constructor() {
    super();
    
    this.state = {};

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
        console.log('user from app', user);
      }
      else {
        this.setState({ user: null });
      }
    });
  }

  getUserInfo = (userInfo) => {
    this.setState({

      userName: userInfo.userName,
      petName: userInfo.petName,
      email:  userInfo.email

    });

  };

  

  // handleRemove = (index) => {
  //   this.state.notes.splice(index, 1);
  //   this.setState({
  //     notes: [...this.state.notes]
  //   });
  // };

  // handleUpdate = (index, update) => {
  //   const newNotes = [...this.state.notes];
  //   newNotes[index] = update;
  //   this.setState({
  //     notes: newNotes
  //   });
  // };


  render() {

   
    return (
      <div className="App">
        { this.state.user ? <Home currentUserUid={this.state.user.uid}/> : <Login/> }
      </div>
      
    );

  }
}