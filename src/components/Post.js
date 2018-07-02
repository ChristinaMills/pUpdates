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
    // this.addNoteToFB = this.addNoteToFB.bind(this);
    // this.addNoteSetup = this.addNoteSetup.bind(this);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        let uid = user;
        this.setState({
          uid: uid.uid
        });
        // console.log('USER uid', user.uid);
      }
      else {
        console.log('NO USER from note');
      }
    });
  }
  //in Note= in Review component in parkPlace, review loads current review on load
  

  addNoteToFB() {
    db.collection('posts').add({
      uid: this.state.uid,
      postText: this.state.postText,
      time: new Date()
    })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id, docRef);
      })
      .then(this.setState({
        userID: this.state.uid,
        postText: this.state.postText,
        time: new Date()
      }),
      console.log('note added', this.state)
      )
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });

  }


handleSubmit = (event) => {
  // console.log('LOG ---- button was clicked');
  event.preventDefault();
  this.addNoteToFB();
  // this.props.updatePostsFromNoteToHome(this.state);
  //   .then(() => {
  //     this.props.updatePostsFromNoteToHome(this.state.note);
  //   })
  //   .catch((error) => { console.log('Error at handleSubmit', error); });
  // console.log('handlesubmit ran- this is state of note', this.state);
 
};


  handleChange = ({ target }) => {
    this.setState({ [target.name] : target.value });
  };


  render(){
    const text = this.props.postTextFromList;
    // const user = this.props.uidFromList;
    const user = this.props.currentUserName;
    

    // console.log('STATE FROM POST YO!', this.props);

    return (
      <div>
        <div className='post-container'>
          <h4 className='user-name'>User:{user}</h4>
          <a className='post-text'>{text}</a>
        </div>

      </div>
    );
  }
}

// to get the editing function access to note, we could also make a seperate editing component and pass in note as props