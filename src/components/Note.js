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
    this.addNote = this.addNote.bind(this);
    // this.addNoteSetup = this.addNoteSetup.bind(this);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        let uid = user;
        this.setState({
          uid: uid.uid
        });
        console.log('just USER', user);
      }
      else {
        console.log('NO USER from note');
      }
    });
  }
  


  async addNote() {
    let userCollectionRef = db.collection('users');
    // setTimeout(10000);
    let docID = await userCollectionRef.where("uid", "==", this.state.uid);
    console.log('fml', docID);
    
    // return () => userCollectionRef.where("uid", "==", this.state.uid)
    //   .then((document) => {
    //     console.log('did you get here?');
    //     console.log(document, 'salkfjlskajfdkjsa');
    //     return document.update({ note: 'held;asdf;jsfre is a note dammmmit' }, { merge: true });
    //   })
    //   .catch(error => console.log('error: ', error));

    //*******This works- when I hard code the DocumentID */
    // let userDocRef = db.collection('users').doc('JjjgLy7SbJFyJfa9o9OT');
    // let addNoteInfo = userDocRef.set({ note: 'here is a note dammit' }, { merge: true });

  }

 


  //get user uid from authUser object//
  //find user database object with that iud
  //create reference for thaaat object
  //do stuff
 

 
  // addNote() {
  //   this.addNoteSetup();
  //   // let userCollectionRef = this.state.userCollectionRef
  //   // let userDocID = userCollectionRef.where('uid', '==', this.state.uid)
  //   //   .then(() => {
  //   //     let docRef = db.collection('users').doc(userDocID);
  //   //   });
  //   // let addNoteInfo = docRef.set({ note: 'here is a note dammittttt' }, { merge: true });
  //   console.log('**********');
  // }

 
  // var uid = this.state.uid;
  // var userDocRef = db.collection('users').document().getId();
  // console.log(userDocRef);
  // return userRef.update({
  //   newParam: 'YAhooooooo'
  // })
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
  event.preventDefault();
  this.addNote();
  console.log('handlesubmite ran', this.state);
 
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