import React, { Component } from 'react';

export default class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      post: ''
    };
  }

  componentDidMount() {
    console.log('post from post', this.props.post);
    this.setState({
      post: this.props.post
    });
  }
  toggleUpdate = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name] : target.value });
  };

  handleSubmit = (index, post) => {
    this.props.handleUpdate(index, post);
    this.toggleUpdate();
  };

  render(){
    const { handleRemove, index } = this.props;
    const { editing, post } = this.state;
    return (

      <li key={index}>
        {editing 
          ? <input name="post" value={post} onChange={this.handleChange}/> 
          : post} 
        <button onClick={()=> handleRemove(index)}>X</button>
        <button onClick={this.toggleUpdate}>Update</button>
        { editing && 
        <button onClick={()=> this.handleSubmit(index, post)}>Submit</button> }
      </li>
    );
  }
}

// to get the editing function access to note, we could also make a seperate editing component and pass in note as props