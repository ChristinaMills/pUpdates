import React, { Component, Fragment } from 'react';
import Post from './Post';

export default class Posts extends Component {
  
  componentDidMount() {
    console.log('Props from Posts mount*****', User);
    //fb call for the posts arr of current user id (on did update)
  }

  render(){
    const { post, posts, handleRemove, handleUpdate, caretaker } = this.props;
    console.log(caretaker);
    console.log('posts, post, Post', posts);

    return (
      <Fragment>
        <ul>{posts.map((post, index) => 
          <Post key={index} index={index} handleRemove={handleRemove} handleUpdate={handleUpdate} posts={posts}/>)}
        {/* the index that we are passing into the "key" is for a unique key for the <li> the second index that we are passing to "index" is for the handleRemove function that we are also passing to Note.</li> */}
        </ul>
        <a>{caretaker}</a>
      </Fragment>
    );
  }
}