// import firestore from 'firestore';
import  Notes  from './Notes';
import React, { Component } from 'react';
import { db } from '../services/firebase';

export default class App extends Component {

  constructor() {
    super();
    
    this.state = {
      notes: ['he peed', 'all good', 'bit the neighbor kid'],
      update: '',
      user: 'Leo'
    };

  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      notes: [...this.state.notes,
        this.state.update],
      update: ''
    });

    db.collection('users').add({
      user: this.state.user,
      notes: this.state.notes
    })
      .then((function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      }))
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name] : target.value });
  };

  handleRemove = (index) => {
    this.state.notes.splice(index, 1);
    this.setState({
      notes: [...this.state.notes]
    });
  };

  handleUpdate = (index, update) => {
    const newNotes = [...this.state.notes];
    newNotes[index] = update;
    this.setState({
      notes: newNotes
    });
  };


  render() {
    const { user, notes, update } = this.state;

    console.log(user, 'user from app');
    return (
      <div className="App">
        <h1>Posts</h1>
        <Notes notes={notes} handleRemove={this.handleRemove} handleUpdate={this.handleUpdate} user={user}/>
        <form onSubmit={this.handleSubmit}>
          <select name="user" value={user} onChange={this.handleChange}>
            <option name="user1" value="user1">User 1</option>
            <option name="user2" value="user2">User 2</option>
            <option name="user3" value="user3">User 3</option>
          </select>
          <input name="update" value={update} onChange={this.handleChange}/>
        </form>
      </div>
    );

  }
}