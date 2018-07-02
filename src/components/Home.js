import React, { Component } from 'react';
import User from './User';
// import Note from './Note';
import PostForm from './PostForm';
import PostsList from './PostsList';
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

  componentDidMount() {
    this.setState({
      uid: this.props.currentUserUid
    });
    // console.log(',.,.,.,.,.,.,', this.props.currentUserUid);

    // console.log(',.,.,.,.,.,., state', this.state);

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
  };


  //not active
  loadAllPostsFromFB = () => {
    db.collection('posts').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
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
          // console.log('######', doc.id);
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
          this.getTeamMembers();
        });
      });
  };

  getTeamMembers = () => {
    console.log('TEAM', this.state.petName);
    let teamMemberArr = [];
    let usersRef = db.collection('users');
    let teamDocs = usersRef.where('petName', '==', this.state.petName).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          let memberUid = data.uid;

          //does this memberuid exist in this array? if not, push it in, otherwise die
          !teamMemberArr[memberUid] ? teamMemberArr.push(memberUid) : console.log('its already in there man');

          console.log('%%%%%%%%% dis da data!!!', data.uid);
          console.log('arr or users', teamMemberArr);

          this.setState({
            teamMemberArr
          });
        });
      });
  };

  loadTeamPostsFromFB = () => {

  };






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


  logout = () => {
    fire.auth().signOut();
  };

  render() {
    const theFullState = this.state;
    console.log('!!   the props from home', this.state);

    return (
      <div className="col-md-6">
        <h1>You are home</h1>
        { this.state.name ? <User stateSentFromParentHome={this.state}/> : null}
        { this.state.name ? <PostsList stateSentFromParentHome = {this.state} currentUserUid={this.props.currentUserUid} currentUserName={this.state.name} />
          :
          null }
        <PostForm tellHomeNewPost = {this.tellHome}/>

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