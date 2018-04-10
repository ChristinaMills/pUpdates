import React, { Component } from 'react';

export default class Note extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      note: ''
    };
  }

  componentDidMount() {
    this.setState({
      note: this.props.note
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

  render(){
    const { handleRemove, handleUpdate, index } = this.props;
    const { editing, note } = this.state;
    return (

      <li key={index}>
        {editing 
          ? <input name="note" value={note} onChange={this.handleChange}/> 
          : note} 
        <button onClick={()=> handleRemove(index)}>X</button>
        <button onClick={this.toggleUpdate}>Update</button>
        <button onClick={()=> handleUpdate(index, note)}>Submit</button>
      </li>
    );
  }
}

// to get the editing function access to note, we could also make a seperate editing component and pass in note as props