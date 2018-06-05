import React, { Component, Fragment } from 'react';
import Note  from './Note';
import fire, { db } from '../services/firebase';

export default class Notes extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      uid: '',
      posts: [ 
        // { postText: 'string of post text',
        //   time: 'time string',
        //   name: 'User name',
        //   petName: 'name of pet'
        // },
        // { postText: '2string of post text',
        //   time: '2time string',
        //   name: '2User name',
        //   petName: '2name of pet'
        // },
        // { postText: '3string of post text',
        //   time: '3time string',
        //   name: '3User name',
        //   petName: '3name of pet'
        // }
      ]
    };
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(function(user) {
      if(user) {
        this.setState({
          uid: user.uid
        });
        
        this.loadUserPostsFromFB();
      }
      else {
        console.log('NO USER');
      }
    }.bind(this));
    console.log(this.state, '     00000000000');

  }

  // componentDidMount(){
  //   this.loadUserPostsFromFB();
  //   console.log(this.state, '     00000000000');
  // }

  loadAllPostsFromFB = () => {
    db.collection('posts').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    });
  };

    loadUserPostsFromFB = () => {
      let collectionRef = db.collection('posts');
      let query = collectionRef.where('userID', '==', this.state.uid);
      // console.log('did you get here????   ');

      query.get().then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          // console.log(doc.id, '=>', doc.data());
          let data = documentSnapshot.data();
          console.log('this is the data     ', data);

          this.setState({
            posts: [
              ...this.state.posts,
              {
                postContent: data.postContent,
                time: data.time
              }
            ]
            
          });
          console.log('*********** This is the STATE', this.state);
          // console.log('****', doc.data.postContent);
        });
        // console.log(querySnapshot.docs);
      });
    };
 

  
    render(){
      // const { notes, handleRemove, handleUpdate } = this.props;


      return (
        <Fragment>
          <h2>### Note-S component ###</h2>
          <ul>{this.state.posts.map((post, index) => 
            <li key={index}>{post.postContent}</li>)}
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