import React from "react";
import { Redirect } from "react-router-dom";
import postRequest from "../utils/postRequest";
class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: "",
      article: null
    }
  }

  changeHandler = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  addHandler = async (e) => {
    e.preventDefault()
    const { article } = await postRequest("/api/articles", {article: {...this.state, tagList: this.state.tagList.split(",").map((tag) => tag.trim().toLowerCase())}});
    this.setState({
      article: article ?? null
    })
  }

  render () {
    const { article } = this.state;
    if(article) return <Redirect to={`/article/${article.slug}`} />

    return (
		<div className="container mx-auto p-4">
			<form className="w-3/4 mx-auto p-6 rounded-2xl bg-gray-50 shadow-lg" onSubmit={ this.addHandler }>
				<h2 className="text-2xl uppercase text-gray-500 text-center m-8">Create Article</h2>
				<label htmlFor="title">Title -</label>
				<input type="text" name="title" id="title" minLength="15" placeholder="Title should be minimum 15 character" value={this.state.title} onChange={this.changeHandler} required/>
				<label htmlFor="description">Description -</label>
				<input type="text" name="description" id="description" minLength="25" placeholder="Description should be minimum 20 character" value={this.state.description} onChange={this.changeHandler} required/>
				<label htmlFor="body">Content -</label>
				<textarea name="body" id="body" cols="30" rows="10" minLength="100" placeholder="Content should be minimum of 100 character" value={this.state.body} onChange={this.changeHandler} required/>
				<label htmlFor="tagList">Tags -</label>
				<input type="text" name="tagList" id="tagList" placeholder="Multiple tags should be separated by commas (cars,books)" value={this.state.tagList} onChange={this.changeHandler} />
				<div className="text-right">
					<input type="submit" value="Post Article" className="btn" />
				</div>
			</form>
		</div>
	);
  }
}

export default NewPost;