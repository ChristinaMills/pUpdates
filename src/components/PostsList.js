import React, { Component, Fragment } from 'react';
import Post  from './Post';
import fire, { db } from '../services/firebase';

export default class PostsList extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      uid: '',
      posts: [],
      allPosts: []
    };
  }

  

  componentDidMount() {
    // let { teamMemberArr } = this.props.stateSentFromParentHome;
    this.getMemberPosts();
  }
  
  //TODO: fetch user object and put name, photo, group info in state
  // todo maybe?? Get all currentuser post from the state from home and push them into an array with all the other member posts and put it all into an array, and the maybe order by timestamp
  
  getMemberPosts = () => {
    let postsRef = db.collection('posts');
    let teamMembers = this.props.teamMembers;

    teamMembers.forEach(item => {
    // for(let i = 0; i < teamMembers.length; i++) {
      let userPostsDoc = postsRef.where('uid', '==', item).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let data = doc.data();
            this.setState({
              allPosts: [
                ...this.state.allPosts, data 
              ]
            });
          });
        });
    });
  };


  
  render(){
    // const { stateSentFromParentHome } = this.props;

    return (
      <Fragment>
        <h2>### Post-S component ###</h2>
        <ul>{this.state.allPosts.map((post, index) => 
          // <Post key={index} currentUserName={this.props.currentUserName} postTextFromList={post.postText} time={post.time} uidFromList={this.props.stateSentFromParentHome.currentUserUid}/>)}
          <Post key={index} currentUserName={post.name} postTextFromList={post.postText} time={post.time} uidFromList={this.props.stateSentFromParentHome.currentUserUid}/>)}
        </ul>

        <button onClick={this.getMemberPosts}>Press me to load</button>
        
      </Fragment>
   
    );
  }
}

// {/* <ul>{notes.map((note, index) => 
//   <Note key={index} index={index} handleRemove={handleRemove} handleUpdate={handleUpdate} note={this.allPosts}/>)}
// {/* the index that we are passing into the "key" for a unique key for the <li> the second index that we are passing to "index" is for the handleRemove function that we are also passing to Note.</li> */} */}
// </ul>; */}