import React, { Component, Fragment } from 'react';
import Note  from './Note';
import fire, { db } from '../services/firebase';

export default class Notes extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      uid: ''
    };
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(function(user) {
      if(user) {
        this.setState({
          uid: user.uid
        });
      }
      else {
        console.log('NO USER');
      }
    }.bind(this));
  }

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
      console.log('did you get here????   ');

      query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log(doc.id, '=>', doc.data());
          console.log('****', doc.data.postContent);
        });
        // console.log(querySnapshot.docs);
      });
    };
 
  // console.log('do you get here??  ')
  
    render(){
      const { notes, handleRemove, handleUpdate } = this.props;


      return (
        <Fragment>
          <h2>### Note-S component ###</h2>
          <button onClick={this.loadUserPostsFromFB}>Press me to load</button>
        
        </Fragment>
   
      );
    }
}

// {/* <ul>{notes.map((note, index) => 
//           <Note key={index} index={index} handleRemove={handleRemove} handleUpdate={handleUpdate} note={this.allPosts}/>)}
//         {/* the index that we are passing into the "key" for a unique key for the <li> the second index that we are passing to "index" is for the handleRemove function that we are also passing to Note.</li> */}
//         </ul> */}