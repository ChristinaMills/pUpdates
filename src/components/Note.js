import React, { Component, Fragment } from 'react';

export default class Note extends Component {

  constructor() {
    super();

    this.state = {
      editing: false
    };
  }

  toggleUpdate = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  render(){
    const { handleRemove, note, index } = this.props;
    const { editing } = this.state;
    return (

      <li key={index}>
        {editing ? 'Editing happening' : note} 
        <button onClick={()=> handleRemove(index)}>X</button>
        <button onClick={this.toggleUpdate}>Update</button>
      </li>
    );
  }
}

