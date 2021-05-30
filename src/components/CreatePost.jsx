import React from "react";
import { Redirect } from "react-router-dom";
import Editor from "./Editor";

import postRequest from "../utils/postRequest";
import editorConfig from "../utils/editorConfig"
class NewPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			tagList: "",
			article: null,
			errors: {
				title: "",
				description: ""
			},
		};
		this.editor = null;
		this.articleBody = React.createRef()
	}

	changeHandler = ({ target }) => {
		const { name, value } = target;
		const { errors } = this.state;
		switch (name) {
			case "title":
				errors.title = value.trim().length > 15 ? "" : "Title should be minimum 15 characters";
				break;
			case "description":
				errors.description = value.trim().length > 25 ? "" : "Description should be minimum 25 characters";
				break;
			default:
				break;
		}

		this.setState({
			[name]: value,
			errors,
		});
	};

	addHandler = async (e) => {
		e.preventDefault();
		const { title, description } = this.state.errors;
		if (title || description) return;
		const body = await this.editor.save();
		console.log(body)
		const { article } = await postRequest("/api/articles", { article: { ...this.state, body: JSON.stringify(body), tagList: this.state.tagList.split(",").map((tag) => tag.trim().toLowerCase()) } });
		this.setState({
			article: article ?? null,
		});
	};

	componentDidMount () {
		console.log("New Post Mounting")
		this.editor = editorConfig("body")
	}

	render () {
		console.log("New Post Rendering")

		const { article } = this.state;
		if (article) return <Redirect to={`/article/${article.slug}`} />;

		return (
			<div className="container mx-auto p-4">
				<form className="w-3/4 mx-auto p-6 " onSubmit={this.addHandler}>
					<h2 className="text-2xl uppercase text-gray-500 text-center m-8">Create Article</h2>
					<label htmlFor="title">Title -</label>
					<input type="text" name="title" id="title" minLength="15" placeholder="Title should be minimum 15 character" value={this.state.title} onChange={this.changeHandler} required />
					<span className="text-red-700 text-sm">{this.state.errors.title || ""}</span>
					<label htmlFor="description">Description -</label>
					<input type="text" name="description" id="description" minLength="25" placeholder="Description should be minimum 20 character" value={this.state.description} onChange={this.changeHandler} required />
					<span className="text-red-700 text-sm">{this.state.errors.description || ""}</span>
					<label htmlFor="description">Content -</label>
					<Editor />
					<span className="text-red-700 text-sm">{this.state.errors.body || ""}</span>
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