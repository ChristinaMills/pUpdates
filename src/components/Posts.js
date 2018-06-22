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

  // componentDidMount() {
  //   fire.auth().onAuthStateChanged(function(user) {
  //     if(user) {
  //       this.setState({
  //         uid: user.uid
  //       });
  //       // console.log('User logged in from notes', this.state.uid);

  //     }
  //     else {
  //       console.log('NO USER');
  //     }
  //   }.bind(this));

  // }

  //TODO: fetch user object and put name, photo, group info in state

  
  render(){
    const { stateSentFromParentHome } = this.props;
    console.log('@@@@@@@@     this is stateSentFromParentHome', this.props);
    console.log('state from parent home', stateSentFromParentHome);
    return (
      <Fragment>
        <h2>### Post-S component ###</h2>
        <ul>{stateSentFromParentHome.posts.map((post, index) => 
          <Post key={index} postTextFromList={post.postText} uidFromList={this.props.stateSentFromParentHome.currentUserUid} currentUserName={this.props.currentUserName}/>)}
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