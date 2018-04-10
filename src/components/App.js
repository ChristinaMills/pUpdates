import React, { Component } from 'react';
import  Notes  from './Notes';

export default class App extends Component {

  constructor() {
    super();
    
    this.state = {
      notes: ['he peed', 'all good', 'bit the neighbor kid'],
      update: '',
      caretaker: 'user2'
    };

  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      notes: [...this.state.notes,
        this.state.update],
      update: ''
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



  render() {
    const { caretaker, notes, update } = this.state;

    console.log(caretaker, 'from app');
    return (
      <div className="App">
        <h1>Posts</h1>
        <Notes notes={notes} handleRemove={this.handleRemove} caretaker={caretaker}/>
        <form onSubmit={this.handleSubmit}>
          <select name="caretaker" value={caretaker} onChange={this.handleChange}>
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