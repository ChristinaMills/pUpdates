import React, { Component } from 'react';
import { db } from '../services/firebase';
import fire from '../services/firebase';
import './post.css';

export default class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      postText: ''
    };
  }


  render(){
    const text = this.props.postTextFromList;
    // const user = this.props.uidFromList;
    const user = this.props.currentUserName;
    // console.log('this.props.userName', this.props);

    // console.log('STATE FROM POST YO!', this.props);

    return (
      <div>
        <div className='post-container'>
          <h4 className='user-name'>User name:{user}</h4>
          <a className='post-text'>{text}</a>
        </div>

      </div>
    );
  }
}

// to get the editing function access to note, we could also make a seperate editing component and pass in note as props