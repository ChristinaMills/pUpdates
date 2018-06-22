import React, { Component } from 'react';
import User from './User';
// import Note from './Note';
import PostForm from './PostForm';
import Posts from './Posts';
import fire, { db } from '../services/firebase';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      posts: [],
      name: ''
    };
  }


  // componentDidMount() {
  //   fire.auth().onAuthStateChanged(user => {
  //     console.log('THIS IS A USER   ', user);
  //     if(user) {
  //       this.setState({
  //         uid: user.uid
  //       })
  //         .then(() => {
  //           this.loadUserInfoFromFB();

  //         })
  //         .then(() => {
  //           this.loadUserPostsFromFB();

  //         });
  //       console.log('user uid after SS in if', this.state.uid);

  //     }
  //     else {
  //       console.log('NO USER');
  //     }
  //   });
  // }

  componentDidMount() {
    this.setState({
      uid: this.props.currentUserUid
    });
    console.log(',.,.,.,.,.,.,', this.props.currentUserUid);

    console.log(',.,.,.,.,.,., state', this.state);

    this.loadUserInfoFromFB();
    this.loadUserPostsFromFB();
     
  }


  loadUserInfoFromFB = () => {

    let userColRef = db.collection('users');
    let userRef = userColRef.where('uid', '==', this.props.currentUserUid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          this.setState({
            name: data.name,
            petName: data.petName
          });
        });
      });
    // let usersDocRef = await db.collection('users').doc(this.state.uid);
    // const test = await usersDocRef.get();
    // console.log('%%%%%%%%%   ', test);
  };


  
  loadAllPostsFromFB = () => {
    db.collection('posts').get().then(function(querySnapshot) {
      // console.log('WORKING QUERY SNAP', querySnapshot);
      querySnapshot.forEach(function(doc) {
        // console.log('**************', querySnapshot);
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    });
  };



  loadUserPostsFromFB = () => {
    let postsRef = db.collection('posts');
    let userDoc = postsRef.where('uid', '==', this.props.currentUserUid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          console.log('######', doc.id);
          // console.log('this is the data.postText     ', data.postText);
          // console.log('full data returned', data);

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

  tellHome = (postData) => {
    this.setState({
      posts: [
        ...this.state.posts,
        {
          postText: postData.postText,
          time: postData.time,
          uid: postData.uid
        }
      ]
    });
  };

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
    const theFullState = this.state;
    

    return (
      <div className="col-md-6">
        <h1>You are home</h1>
        { this.state.name ? <User stateSentFromParentHome={this.state}/> : null}
        { this.state.name ? <Posts stateSentFromParentHome = {this.state} currentUserUid={this.props.currentUserUid} currentUserName={this.state.name}/>
          :
          null }
        <PostForm tellHomeNewPost = {this.tellHome}/>

        {/* <User stateSentFromParentHome={this.state}/> */}

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