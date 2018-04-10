import React, { Component, Fragment } from 'react';

export default class Note extends Component {

  render(){
    const { handleRemove, note, index } = this.props;

    return (
      <li key={index} onClick={()=> handleRemove(index)}>{note}</li>
    );
  }
}