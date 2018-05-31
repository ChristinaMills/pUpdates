import React, { Component } from 'react';
import { db } from '../services/firebase';

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

  handleChange = ({ target }) => {
    this.setState({ [target.name] : target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      name: this.state.name,
      groupID: this.state.groupID
    });

    db.collection('users').add({
      name: this.state.name,
      groupID: this.state.groupID
    })
      .then((function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      }))
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };


  render() {
    const { name } = this.state;

    if(!name) return null;

    const { groupId, posts } = this.state;

    return (
      <div>
        <figure className="user_info">
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
        </form>
      </div>

    );
  }
}