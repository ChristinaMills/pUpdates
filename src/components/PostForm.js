import React, { Component } from 'react';
import { db } from '../services/firebase';
import fire from '../services/firebase';

export default class PostForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      postText: ''
    };
    // this.addPostToFB = this.addPostToFB.bind(this);
    // this.addPostSetup = this.addPostSetup.bind(this);
  }


  // TODO: should get sent this instead of fetching
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        let uid = user;
        this.setState({
          uid: uid.uid
        });
        console.log('USER uid', user.uid);
      }
      else {
        console.log('NO USER from note');
      }
    });
  }
  //in Note= in Review component in parkPlace, review loads current review on load
  

  addPostToFB() {
    db.collection('posts').add({
      uid: this.state.uid,
      postText: this.state.postText,
      time: new Date()
    })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id, docRef);
      })
      .then(this.setState({
        //uid also?
        postText: '',
        time: ''
      }))
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });

  }


handleSubmit = (event) => {
  // console.log('LOG ---- button was clicked');
  event.preventDefault();
  this.addPostToFB();
  //tellhomefucntion would take post data which sould be same as current state of post form, just send the state
  
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


    return (
      <div><h1>## This is the Post FORM component ##</h1>

        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input name="postText" value={this.state.postText} onChange={this.handleChange}/>
          <button onClick={() => this.props.tellHomeNewPost()}>Add post to list</button>
          <button type="submit">Submit</button>
        </form>

      </div>
    );
  }
}

// to get the editing function access to note, we could also make a seperate editing component and pass in note as props