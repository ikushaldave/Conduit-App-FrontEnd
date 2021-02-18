import React from "react";
import { Redirect } from "react-router-dom";
import Loader from "./Loader";
import NotFound from "./NotFound";
import getRequest from "../utils/getRequest";
import putRequest from "../utils/putRequest";
import deleteRequest from "../utils/deleteRequest";

class EditPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			body: "",
			tagList: "",
			author: null,
			error: "",
			article: null,
			isDeleted: false,
			errors: {
				title: "",
				description: "",
				body: "",
			},
		};
	}

	changeHandler = ({ target }) => {
		const { name, value } = target;
		const { errors } = this.state;
		switch (name) {
			case "title":
				errors.title = value.trim().length > 15 ? "" : "title should be minimum 15 characters";
				break;
			case "description":
				errors.description = value.trim().length > 25 ? "" : "description should be minimum 25 characters";
				break;
			case "body":
				errors.body = value.trim().length > 100 ? "" : "content should be minimum 100 characters";
				break;
			default:
				break;
		}

		this.setState({
			[name]: value,
			errors
		});
	};

	editHandler = async (e) => {
    e.preventDefault();
    const { slug } = this.props;
		const { article, errors } = await putRequest(`/api/articles/${slug}`, { article: { ...this.state, tagList: this.state.tagList.split(",").map((tag) => tag.trim().toLowerCase()) } });
		this.setState({
			article: article ?? null,
			error: errors ? true : false,
		});
	};

	deleteHandler = async (e) => {
		const { slug } = this.props;
		const { article, errors } = await deleteRequest(`/api/articles/${slug}`);
		this.setState({
			isDeleted: article ? true : false,
			error: errors ? true : false
		});
	}

  async componentDidMount () {
    const { slug } = this.props;
    const { article, errors } = await getRequest(`/api/articles/${slug}`);
    this.setState({
			title: article?.title ?? "",
			description: article?.description ?? "",
			body: article?.body ?? "",
			tagList: article?.tagList.join(",") ?? "",
			author: article?.author.username,
			error: errors ? true : false,
		});
  }

  render () {
		const { isLoggedIn, user } = this.props
    const { title, description, body, tagList, error, author, article, isDeleted } = this.state;

		if (isDeleted) return <Redirect to="/" />;
		if (error) return <NotFound />;
		if (!(title && description && body) || !(isLoggedIn && user)) return <Loader />;
		if (user.username !== author) return <Redirect to="/" />;
		if (article) return <Redirect to={`/article/${article.slug}`} />;

		return (
			<div className="container mx-auto p-4">
				<form className="w-3/4 mx-auto p-6 rounded-2xl bg-gray-50 shadow-lg" onSubmit={this.editHandler}>
					<h2 className="text-2xl uppercase text-gray-500 text-center m-8">Update Article</h2>
					<label htmlFor="title">Title -</label>
					<input type="text" name="title" id="title" minLength="15" placeholder="Title should be minimum 15 character" value={title} onChange={this.changeHandler} required />
					<label htmlFor="description">Description -</label>
					<input type="text" name="description" id="description" minLength="25" placeholder="Description should be minimum 20 character" value={description} onChange={this.changeHandler} required />
					<label htmlFor="body">Content -</label>
					<textarea name="body" id="body" cols="30" rows="10" minLength="100" placeholder="Content should be minimum of 100 character" value={body} onChange={this.changeHandler} required />
					<label htmlFor="tagList">Tags -</label>
					<input type="text" name="tagList" id="tagList" placeholder="Multiple tags should be separated by commas (cars,books)" value={tagList} onChange={this.changeHandler} />
					<div className="text-right">
						<button className="btn del-btn mx-4" onClick={this.deleteHandler}>Delete</button>
						<input type="submit" value="Update Post" className="btn" />
					</div>
				</form>
			</div>
		);
	}
}

export default EditPost;
