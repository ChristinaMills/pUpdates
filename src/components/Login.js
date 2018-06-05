import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire, { db } from '../services/firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

 
login = (e) => {
  e.preventDefault();
  fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((u) => {})
    .catch((error) => { console.log(error); });
};

handleChange = ({ target }) => {
  this.setState({ [target.name]: target.value });
};

signUp = (e) => {
  e.preventDefault();
  fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
      console.log('where the balls the user obj at', user); 
      //we are naming the document id by iud explicity here
      db.collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email, 
      });
    })
    .catch((error) => {console.log('Error adding document', error);});
};


render() {
  return (
    <div className="col-md-6">
      <form>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="email" className="form-control" placeholder="Enter email " />  
          <small id="email-help">We will never share your email!</small> 
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password: </label>
          <input value={this.state.password} onChange={this.handleChange} name="password" id="inputPassword"/>
          <br/>
          <button type="submit" onClick={this.login}>Login</button>
          <br/>
          <button onClick={this.signUp}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
}

export default Login;

