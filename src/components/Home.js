import React, { Component } from 'react';
// import User from './User';
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
      name: 'EveryoneIsBob'
    };
  }


  componentWillMount() {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({
          uid: user.uid
        });
        // console.log('user uid after SS in if', this.state.uid);

        this.loadUserPostsFromFB();
        this.loadUserInfoFromFB();
      }
      else {
        console.log('NO USER');
      }
    });
  }

  loadUserInfoFromFB = async() => {
    let usersDocRef = await db.collection('users').doc(this.state.uid);
    const test = await usersDocRef.get();
    console.log('%%%%%%%%%   ', test);
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
    let userDoc = postsRef.where('uid', '==', this.state.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          console.log('######', doc.id);
          console.log('this is the data.postText     ', data.postText);
          console.log('full data returned', data);

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
    console.log('%%%% reached home function');
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
    console.log('%%%% reached END home function');

  }

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
    const postText1 = this.state.posts && this.state.posts.postText;

    // console.log('^^^^^^^  post', this.state.posts[0].postText);
    console.log('test   ', postText1);

    console.log('state', theFullState);

    return (
      <div className="col-md-6">
        <h1>You are home</h1>
        {/* <User/> */}
        <Posts postsSentFromParentHome = {this.state}/>
        <PostForm tellHomeNewPost = {this.tellHome}/>

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