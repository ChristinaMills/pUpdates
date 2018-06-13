import React, { Component, Fragment } from 'react';
import Post  from './Post';
import fire, { db } from '../services/firebase';

export default class Posts extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      uid: '',
      posts: []
    };
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(function(user) {
      if(user) {
        this.setState({
          uid: user.uid
        });
        console.log('User logged in from notes', this.state.uid);

      }
      else {
        console.log('NO USER');
      }
    }.bind(this));
    console.log(this.state, 'state after component did mount ran');

  }



  // componentDidMount(){
  //   this.loadUserPostsFromFB();
  //   console.log(this.state, '     00000000000');
  // }

  // loadAllPostsFromFB = () => {
  //   db.collection('posts').get().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, ' => ', doc.data());
  //     });
  //   });
  // };
  
  // loadUserPostsFromFB = async() => {
  //   let postsRef = db.collection('posts');
  //   let userRef = await postsRef.where('userID', '==', this.state.uid).get();

  //   for(record of userRef.docs) {
  //     console.log(record.id);
  //     let newRef = await postsRef.doc(record.id).get();
  //     console.log(newRef.data);
  //   }
  // };..

  // loadUserPostsFromFB = () => {
  //   let collectionRef = db.collection('posts');
  //   let query = collectionRef.where('userID', '==', this.state.uid);
  //   // console.log('did you get here????   ');

  //   query.get().then((querySnapshot) => {
  //     querySnapshot.forEach((documentSnapshot) => {
  //       // console.log(doc.id, '=>', doc.data());
  //       let data = documentSnapshot.data();
  //       console.log('this is the data     ', data);

  //       this.setState({
  //         posts: [
  //           ...this.state.posts,
  //           {
  //             postContent: data.postContent,
  //             time: data.time
  //           }
  //         ]
            
  //       });
  //       console.log('*********** This is the STATE', this.state);
  //       // console.log('****', doc.data.postContent);
  //     });
  //     // console.log(querySnapshot.docs);
  //   });
  // };
 
   
  
  render(){
    // const { notes, handleRemove, handleUpdate } = this.props;
    const { postsSentFromParentHome } = this.props;
    // console.log('@@@@@@@@     this is postsSentFromParentHome', postsSentFromParentHome);

    return (
      <Fragment>
        <h2>### Post-S component ###</h2>
        <ul>{postsSentFromParentHome.posts.map((post, index) => 
          <li key={index}>{post.postText}</li>)}
        </ul>
        <button onClick={this.loadUserPostsFromFB}>Press me to load</button>
        
      </Fragment>
   
    );
  }
}

// {/* <ul>{notes.map((note, index) => 
//   <Note key={index} index={index} handleRemove={handleRemove} handleUpdate={handleUpdate} note={this.allPosts}/>)}
// {/* the index that we are passing into the "key" for a unique key for the <li> the second index that we are passing to "index" is for the handleRemove function that we are also passing to Note.</li> */} */}
// </ul>; */}