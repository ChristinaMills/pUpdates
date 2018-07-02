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
  // todo maybe?? Get all currentuser post from the state from home and push them into an array with all the other member posts and put it all into an array, and the maybe order by timestamp
  
  combinePosts = () => {
    let currentUserPosts = this.props.stateSentFromParentHome.posts;
    let otherMemebersUids = this.props.stateSentFromParentHome.teamMemberArr;

  }

  getMemberPosts = () => {
    let postsRef = db.collection('posts');
    // console.log('@@@@@@@@     this is state', this.state);

    let teamMembersArr = this.props.stateSentFromParentHome.teamMembersArr;
    teamMembersArr.push(this.props.currentUserUid);

    //arr of uids of all members
    teamMembersArr.forEach(item => {
      let userPostsDoc = postsRef.where('uid', '==', item).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let data = doc.data();
            console.log('# post obj', data);

          });
        });
    });

  }

  render(){
    const { stateSentFromParentHome } = this.props;
    // console.log('@@@@@@@@     this is stateSentFromParentHome teamm member props', this.props.stateSentFromParentHome.teamMemberArr);
    // console.log('state from parent home', stateSentFromParentHome);
    // console.log('time', );
    this.getMemberPosts();

    return (
      <Fragment>
        <h2>### Post-S component ###</h2>
        <ul>{stateSentFromParentHome.posts.map((post, index) => 
          <Post key={index} currentUserName={this.props.currentUserName} postTextFromList={post.postText} time={post.time} uidFromList={this.props.stateSentFromParentHome.currentUserUid}/>)}
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