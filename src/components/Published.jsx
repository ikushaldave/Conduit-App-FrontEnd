import React from "react";
import getRequest from "../utils/getRequest";
import Loader from "./Loader";

class Published extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      error: false
    }
  }

  fetchArticles = async () => {
    const { username } = this.props.user
    const { articles, errors } = await getRequest(`/api/articles?author=${username}`);
    this.setState({
      articles,
      error: errors ? true : false
    })
  }

  componentDidMount () {
    console.log("Mounting Published");
    this.fetchArticles()
  }

  render () {


    return (
      <div>
        <h2>Published</h2>
      </div>
    )
  }
}

export default Published