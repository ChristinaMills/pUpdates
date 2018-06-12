import React, { Component } from 'react';
// import User from './User';
// import Note from './Note';
import Notes from './Notes';
import fire, { db } from '../services/firebase';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      posts: []
    };
  }


  componentWillMount() {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({
          uid: user.uid
        });

        console.log('user uid after SS in if', this.state.uid);

      }
      else {
        console.log('NO USER');
      }
    });
  }




  
  loadAllPostsFromFB = () => {
    db.collection('posts').get().then(function(querySnapshot) {
      console.log('WORKING QUERY SNAP', querySnapshot);
      querySnapshot.forEach(function(doc) {
        // console.log('**************', querySnapshot);
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    });
  };



  loadUserPostsFromFB = () => {
    let postsRef = db.collection('posts');
    let userDoc = postsRef.where('uid', '==', this.state.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          console.log('######', doc.id);
          console.log('this is the data     ', data.postText);

          this.setState({
            posts: [
              ...this.state.posts,
              {
                postText: data.postText,
                time: data.time,
                uid: data.uid
              }
            ]
          
          });
        });
      // console.log(querySnapshot.docs);
      });
    // console.log('*********** This is the STATE', this.state);
  };

  // TODO: write function to update the state of home, send that as a prop through Notes, and then Note. This should "pass up the data"


  // updatePostsFromNoteToHome  = (addedNote) => {
  //   this.setState({
  //     ...this.state.posts,
  //     addedNote
  //   });
  // };

  logout = () => {
    fire.auth().signOut();
  };

  render() {
    const theState = this.state;
    console.log('FULL STATE***********', theState);

    return (
      <div className="col-md-6">
        <h1>You are home</h1>
        {/* <User/> */}
        {/* note form maybe? */}
        {/* <Note updatePostsFromNoteToHome = {this.updatePostsFromNoteToHome}/> */}
        {/* <Notes postsSentFromParentHome = {this.state.posts}/> */}
        <button onClick={() => { this.loadUserPostsFromFB(); }}>LOAD USER posts</button>
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}

export default Home;


// todo 
// useReactloadAllPostsFromFB();
// console.log(documentSnapshot.id, '=>', documentSnapshot.data());
// console.log('this is the data     ', data);