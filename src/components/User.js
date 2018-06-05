import React, { Component } from 'react';
import { db } from '../services/firebase';
import fire from '../services/firebase';

export default class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Bob',
      groupID: 2,
      photo: null,
      posts: ['test post 1', 'test post 2']

    };
  }

  componentDidMount = () => {
    fire.auth().onAuthStateChanged(function(user) {
      if(user) {
        // console.log('_^_^_^_^_User obj of CURRENT USER', user);
      }
      else {
        console.log('NO USER');
      }
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name] : target.value });
  };


  render() {
    const { name } = this.state;

    if(!name) return null;


    return (
      <div>
        <h1>## This is the User Component ## </h1>
        <p>Connect User Profile information</p>
        {/* <figure className="user_info">
          <h3>Name: {name}</h3>
          <h3>Group ID: {groupId}</h3>
          <p>List of posts: {posts}</p>
        </figure>
        <form onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>
          <h2>Enter Name: </h2>
          <input name="name" onChange={this.handleChange}/>

          <h2>Enter Group ID: </h2>
          <input name="group-id" onChange={this.handleChange}/>
          <input type="submit" value="Submit" />
        </form> */}
      </div>

    );
  }
}