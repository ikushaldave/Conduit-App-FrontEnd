import React from "react";
import { Link } from "react-router-dom";
import getRequest from "../utils/getRequest";
import Loader from "./Loader";
import Author from "./Author"
import Comment from "./Comment";
import NotFound from "./NotFound"
class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			article: null,
			error: false
		}
	}

	async componentDidMount () {
		const { slug } = this.props
		const { article, errors } = await getRequest(`/api/articles/${slug}`);
		console.log(article, errors);

		this.setState({
			article: article ?? {},
			error: errors ? true: false
		})

	}

	render () {
		console.log(this.props);
		const { article, error } = this.state;
		const { user, slug, isLoggedIn } = this.props;

		if (!(article)) return <Loader />
		if (error) return <NotFound />

		return (
			<div className="container mx-auto">
				<div className="w-5/6 flex mx-auto my-8">
					<section className="w-4/6">
						<div>
							<img src="https://images.unsplash.com/photo-1610859234494-6cb68d6361a2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80" alt="" className="rounded" />
						</div>
						<div className="my-6">
							<h2 className="text-gray-900 text-4xl font-extrabold break-words my-4 mr-4">{ article.title }</h2>
							<Author author={ article.author }/>
							<p className="whitespace-pre-wrap m-4">
								{ article.body }
							</p>
						</div>
						<Tags tags={ article.tagList }/>
					</section>
					<aside className="w-1/5 relative mx-8">
						<div className="flex h-screen flex-col justify-center items-center sticky top-0">
							<a href="##" className="my-4 text-2xl text-gray-900">
								<i className="fal fa-heart"></i>
							</a>
							<a href="##" className="my-4 text-2xl text-gray-900">
								<i className="fal fa-bookmark"></i>
							</a>
							<a href="##" className="my-4 text-2xl text-gray-900">
								<i className="fal fa-share-alt"></i>
							</a>
						</div>
					</aside>
				</div>
				<Comment isLoggedIn={ isLoggedIn } slug={ slug }/>
				<div className={ (article.author.username === user?.username) ? "fixed bottom-20 right-12" : "hidden" }>
					<Link to={`/article/${slug}/edit`} className="bg-green-100 text-2xl text-gray-800 font-bold p-4 rounded-full w-10 h-10">
						<i className="fad fa-edit"></i>
					</Link>
				</div>
			</div>
		);
	}
}



function Tags (props) {
	const { tags } = props;

		return (
			<div className="my-4">
				<h4 className="text-xl text-gray-800 font-extrabold uppercase mx-2 my-4">Tags -</h4>
				{
					tags.map((tag) => (
						<Link to={`/api/articles/tag=${tag}`} className="p-2 m-2 bg-gray-100 text-gray-800 inline-block rounded hover:bg-gray-200 capitalize" key={tag}>
							#{tag}
						</Link>
					))
				}
			</div>
		);
	}

	export default Article;