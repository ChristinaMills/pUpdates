import React, { Component } from 'react';
import { db } from '../services/firebase';
import fire from '../services/firebase';

export default class User extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     name: 'Bob',
  //     groupID: 2,
  //     photo: null,
  //     posts: ['test post 1', 'test post 2']

  //   };
  // }

  componentWillMount() {
    // if(!this.props.name) return null;
    console.log('reached user');
  }
  // componentDidMount = () => {
  //   fire.auth().onAuthStateChanged(function(user) {
  //     if(user) {
  //       // console.log('_^_^_^_^_User obj of CURRENT USER', user);
  //     }
  //     else {
  //       console.log('NO USER');
  //     }
  //   });
  // };

  // handleChange = ({ target }) => {
  //   this.setState({ [target.name] : target.value });
  // };


  render() {
    const { name } = this.props.stateSentFromParentHome;
    const { petName } = this.props.stateSentFromParentHome;
    // console.log('props in FROM USER %%%%%%   ', this.props);
    // console.log('name!    ', name);
    


    return (
      <div>
        <h1>## This is the User Component ## </h1>
        <p>Connect User Profile information</p>
        <figure className="user_info">
          <h3>Name: {name}</h3>
          <h3>Pet Name Group: {petName}</h3>
        </figure>
        
      </div>

    );
  }
}