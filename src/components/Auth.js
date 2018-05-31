import React, { Component } from 'react';
import firebase, { db } from '../services/firebase';


export default class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'Sample@aol.com',
      password: 'supersecret'
    };
  }

handleChange = ({ target }) => {
  this.setState({ [target.name] : target.value });
  console.log(target);
};

handleSubmit = (event) => {
  event.preventDefault();
  this.setState({
    email: this.state.email,
    password: this.state.password
  });
};


createUser = () => firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

render() {
  const { email, password } = this.state;
  console.log(this.state.email, this.state.password);
  return (
    <div>
      <figure className="user_info">
        {/* <h5>Email: {email}</h5>
        <h5>Password: {name}</h5>
         */}
      </figure>
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <h2>Enter Email: </h2>
        <input name="email" onChange={this.handleChange}/>

        <h2>Enter Password: </h2>
        <input name="group-id" onChange={this.handleChange}/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );

} 
}

