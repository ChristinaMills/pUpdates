// import firestore from 'firestore';
import  Notes  from './Posts';
import React, { Component } from 'react';
import fire, { db } from '../services/firebase';
import  User  from './User';
import Auth from './Auth';
import Login from './Login';
import Home from './Home';

export default class App extends Component {

  constructor() {
    super();
    
    this.state = {
      user: {},
    };

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
      }
      else {
        this.setState({ user: null });
      }
    });
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.setState({
  //     notes: [...this.state.notes,
  //       this.state.update],
  //     update: ''
  //   });

  //   db.collection('users').add({
  //     user: this.state.user,
  //     notes: this.state.notes
  //   })
  //     .then((function(docRef) {
  //       console.log('Document written with ID: ', docRef.id);
  //     }))
  //     .catch(function(error) {
  //       console.error('Error adding document: ', error);
  //     });
  // };

  // handleChange = ({ target }) => {
  //   this.setState({ [target.name] : target.value });
  // };

  // handleRemove = (index) => {
  //   this.state.notes.splice(index, 1);
  //   this.setState({
  //     notes: [...this.state.notes]
  //   });
  // };

  // handleUpdate = (index, update) => {
  //   const newNotes = [...this.state.notes];
  //   newNotes[index] = update;
  //   this.setState({
  //     notes: newNotes
  //   });
  // };


  render() {
    const { user, update } = this.state;

   
    return (
      <div className="App">
        { this.state.user ? <Home/> : <Login/> }

        {/* <h1>APP.js </h1>
        <h2>NOTES COMPONENT BELOW</h2>
        <Notes notes={notes} handleRemove={this.handleRemove} handleUpdate={this.handleUpdate} user={user}/>
        <form onSubmit={this.handleSubmit}>
          <input name="update" value={update} onChange={this.handleChange}/>
        </form> */}
        {/* <div>
          <h1>AUTH PART</h1>
          <Auth/>
        </div> */}
      </div>
      
    );

  }
}