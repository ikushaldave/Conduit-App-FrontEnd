import React from "react";
import { Redirect } from "react-router-dom";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    console.log(this.props);
    return <h1>New Post</h1>
  }
}

export default NewPost;