import React, { Component } from 'react';
// import User from './User';
// import Note from './Note';
import Notes from './Posts';
import fire, { db } from '../services/firebase';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      posts: []
    };
  }


  componentWillMount = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({
          uid: user.uid
        });
        this.loadAllPostsFromFB();
        // this.awaitloadUserPostsFromFB();
        // console.log('User logged in from HOME', this.state.uid);
        this.loadUserPostsFromFB();

        console.log('$$$$$$$$$$$$       User logged in from HOME', this.state.uid);

      }
      else {
        console.log('NO USER');
      }
    });

    console.log(this.state, 'state after component did mount ran in HOME component');

  };