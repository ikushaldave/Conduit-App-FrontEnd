import React from "react";
import { Link } from "react-router-dom";
import getRequest from "../utils/getRequest";
import postRequest from "../utils/postRequest";

class CommentSkelton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			comment: "",
			commentDialog: false,
			error: false,
		};
	}

	toggleCommentDialog = () => {
		this.setState((prev) => {
			return {
				commentDialog: !prev.commentDialog,
			};
		});
	};

	changeHandler = ({ target }) => {
		const { name, value } = target;
		this.setState({
			[name]: value,
		});
	};

	getComments = async () => {
		const { slug } = this.props;
		const { comments } = await getRequest(`/api/articles/${slug}/comments`);
		return comments;
	};

	addComment = async (e) => {
		e.preventDefault();
		const { slug, isLoggedIn } = this.props;
		if (!isLoggedIn) return;

		const { errors } = await postRequest(`/api/articles/${slug}/comments`, { comment: { body: this.state.comment } });
		const comments = await this.getComments();

		this.setState((prev) => {
			return {
				comments: comments ?? [],
				commentDialog: !prev.commentDialog,
				error: errors ? true : false,
			};
		});
	};

	async componentDidMount() {
		console.log("Mounting Comments");
		const comments = await this.getComments();
		this.setState({
			comments: comments ?? [],
		});
	}

	componentWillUnmount() {
		console.log("unmounting comments");
	}

	render () {
		console.log("rendering comments")
		const { isLoggedIn } = this.props;
		const { commentDialog, comments, comment } = this.state;

		if (comments.length === 0) return <></>;

		return (
			<section>
				<div className="container mx-auto">
					<div className="w-5/6 mx-auto">
						<div className="border border-gray-300 p-4 my-4 rounded-lg w-4/6 flex items-center">
							<h4 className="text-gray-700 font-extrabold">Comments ({comments.length})</h4>
							<select name="commentFilter" id="commentFilter" className="mx-6 p-2 outline-none focus-within:outline-none rounded-md text-gray-900 cursor-pointer">
								<option value="popular">Popular</option>
								<option value="recent">Recent</option>
							</select>
							<div className="flex-grow text-right">
								<button className="btn primary-btn" onClick={this.toggleCommentDialog}>
									<i className="fal fa-pencil"></i> Add a comment
								</button>
							</div>
						</div>
						<div>
							{comments.map((comment) => (
								<Comment comment={comment} key={comment.id} />
							))}
						</div>
					</div>
					<div className={commentDialog ? "fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center" : "hidden"}>
						<div className="relative w-1/3 p-6 rounded-2xl bg-gray-50 shadow-lg">
							<form onSubmit={this.addComment}>
								<h2 className="text-2xl uppercase text-gray-500 text-center m-8">Comment</h2>
								<textarea name="comment" id="comment" cols="30" rows="6" placeholder="Write Here..." minLength="4" required value={comment} onChange={this.changeHandler}></textarea>
								<div className="text-right">
									<input type="submit" value="post comment" className="btn" required />
								</div>
							</form>
							<div className={isLoggedIn ? "hidden" : "text-gray-700 text-center m-2 capitalize"}>
								<p>
									To post comment please
									<Link to="/login" className="text-gray-900 m-1">
										login
									</Link>{" "}
									or
									<Link to="/register" className="text-gray-900 m-1">
										Register
									</Link>
								</p>
							</div>
							<button className="absolute top-6 right-4 font-lg rounded-full bg-gray-500 text-white font-extrabold w-6 h-6 focus:outline-none hover:bg-gray-800" onClick={this.toggleCommentDialog}>
								<i className="far fa-times"></i>
							</button>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

function Comment (props) {

	const { body } = props.comment
	const { username, bio } = props.comment.author;

  return (
		<div className="border border-gray-300 p-4 my-4 rounded-lg w-4/6">
			<div className="flex">
				<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1602747641539/i1G-w7U74.png?w=200&h=200&fit=crop&crop=faces&auto=compress" alt="" className="rounded-full inline-block border border-gray-200 w-9 h-9" />
				<div className="author w-3/5 mx-4">
					<h5 className="text-gray-900 capitalize font-bold">
						<a href="##" className="lowercase">
							{ username }
						</a>
						<a href="##" className="mx-2 text-gray-500">
							<i className="fab fa-facebook"></i>
						</a>
						<a href="##" className="text-gray-500">
							<i className="fab fa-twitter"></i>
						</a>
					</h5>
					<p className="text-gray-500 text-sm">{bio }</p>
				</div>
				<div className="w-1/5 flex-grow text-right">
					<p className="text-gray-500">Feb 11</p>
				</div>
			</div>
			<div className="m-4 text-gray-900">
				<p>{ body }</p>
			</div>
			<div className="m-4 flex justify-between text-gray-600">
				<button>
					<i className="far fa-thumbs-up m-2"></i>
					Like
				</button>
				<button>
          <i className="fal fa-reply m-2"></i>
          Reply
				</button>
			</div>
		</div>
  );
}

export default CommentSkelton;