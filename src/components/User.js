import React, { Component } from 'react';

export default class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Bob',
      groupId: 2,
      photo: null,
      posts: ['test post 1', 'test post 2']

    };
  }

  render() {
    const { name } = this.state;

    if(!name) return null;

    const { groupId, posts } = this.state;

    return (
      <div>
        <figure className="user_info">
          <h1>{name}</h1>
          <h2>{groupId}</h2>
        </figure>
        <Posts/>
      </div>

    );
  }
}