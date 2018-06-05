import React, { Component } from 'react';
import { db } from '../services/firebase';
import fire from '../services/firebase';

export default class Note extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      note: '',
      uid: '' 
    };
    // this.addNote = this.addNote.bind(this);
    // this.addNoteSetup = this.addNoteSetup.bind(this);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        let uid = user;
        this.setState({
          uid: uid.uid
        });
        console.log('just USER uid', user.uid);
      }
      else {
        console.log('NO USER from note');
      }
    });
  }
  
  // <3 the whole confusion here was trying to access the docRef that was returned from using the add function. Instead I used the set function which allows you to set a custom id for the document, in this case setting it as the uid will let me access it in Note.
  addNote2() {
    db.collection('users').doc(this.state.uid).set({ 
      notes: this.state.note
    }, { merge: true });
    
    console.log('********** note added');
  }

  addNote() {
    db.collection('posts').add({
      userID: this.state.uid,
      postContent: this.state.note,
      time: new Date()
    })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .then(this.setState({
        userID: this.state.uid,
        postContent: this.state.note,
        time: new Date()
      }))
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });

  }


handleSubmit = (event) => {
  // console.log('LOG ---- button was clicked');
  event.preventDefault();
  this.addNote();
  this.setState({
    note: ''
  });
  console.log('handlesubmit ran', this.state);
 
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
    // const { handleRemove, index } = this.props;
    // console.log('the state bro', this.state);

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