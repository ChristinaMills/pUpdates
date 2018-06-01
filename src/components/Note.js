import React, { Component } from 'react';
import { db } from '../services/firebase';
import fire from '../services/firebase';

export default class Note extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      note: '',
      uid: '', 
      test: ''
    };
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({ 
          uid: user.uid,
        });
        console.log('_^_^_^_^_UID of CURRENT USER from note comp', user.uid);
        console.log('_^_^_^_^_UID of CURRENT USER from note comp');

      }
      else {
        console.log('NO USER from note');
      }
    });
  }

  // addNoteToUser = () => {
  //   var uid = this.state.uid;
  //   var userDocRef = db.collection('users').document().getId();
  //   console.log(userDocRef);
  //   return userRef.update({
  //     newParam: 'YAhooooooo'
  //   })
  //     .then(function() {
  //       console.log('Document successfully updated!');
  //     })
  //     .catch(function(error) {
  //     // The document probably doesn't exist.
  //       console.error('Error updating document: ', error);
  //     });
  

  // };

  handleSubmit = (event) => {
    // console.log('LOG ---- button was clicked');
    console.log('state before ---  ', this.state);
    console.log();
    event.preventDefault();
    this.setState({ test: 'test' });
 
  };

  // toggleUpdate = () => {
  //   this.setState({
  //     editing: !this.state.editing
  //   });
  // };

  handleChange = ({ target }) => {
    this.setState({ [target.name] : target.value });
  };

  // handleSubmit = (index, note) => {
  //   this.props.handleUpdate(index, note);
  //   this.toggleUpdate();
  // };

  render(){
    const { handleRemove, index } = this.props;

    return (
      <div><h1>## This is the NOTE component ##</h1>
        {/* <li key={index}> */}
        {/* {editing 
          ? <input name="note" value={note} onChange={this.handleChange}/> 
          : note}  */}
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input name="note" value={this.state.note} onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
        {/* <button onClick={()=> handleRemove(index)}>X</button>
        <button onClick={this.toggleUpdate}>Update</button> */}

        {/* { editing && 
        <button onClick={()=> this.handleSubmit(index, note)}>Submit</button> } */}
        {/* </li> */}
      </div>
    );
  }
}

// to get the editing function access to note, we could also make a seperate editing component and pass in note as props