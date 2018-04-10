import React, { Component, Fragment } from 'react';

export default class Notes extends Component {

  
  render(){
    const { notes, handleRemove, caretaker } = this.props;
    console.log(caretaker);
    console.log(notes);
    return (
      <Fragment>

        <ul>{notes.map((note, index) => 
          <li key={index} onClick={()=> handleRemove(index)}>{note}</li>)}
        </ul>
        <a>{caretaker}</a>
      </Fragment>
   
    );
  }
}