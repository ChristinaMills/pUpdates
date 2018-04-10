import React, { Component, Fragment } from 'react';
import Note  from './Note';

export default class Notes extends Component {
  
  
  render(){
    const { notes, handleRemove, handleUpdate, caretaker } = this.props;
    console.log(caretaker);
    console.log(notes);

    return (
      <Fragment>
        <ul>{notes.map((note, index) => 
          <Note key={index} index={index} handleRemove={handleRemove} handleUpdate={handleUpdate} note={note}/>)}
        {/* the index that we are passing into the "key" for a unique key for the <li> the second index that we are passing to "index" is for the handleRemove function that we are also passing to Note.</li> */}
        </ul>
        <a>{caretaker}</a>
      </Fragment>
   
    );
  }
}