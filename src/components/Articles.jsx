import { Link } from "react-router-dom";

function Articles (props) {
	const { articles } = props
	console.log(articles, "single article");
  return (
		<>
			{ articles.map((article, index) => <ArticleCard article={ article } key={ article.id }/>)}
		</>
  );
}

function ArticleCard (props) {
	const article = props.article;
	return (
		<div className="flex justify-between items-center bg-gray-50 shadow-lg p-4 rounded-xl mb-8">
			<img src="https://images.unsplash.com/photo-1610859234494-6cb68d6361a2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80" alt="" className="w-48 object-cover rounded-md" />
			<div className="p-4 flex-grow">
				<h3 className="text-xl text-gray-700 font-extrabold my-1">
					<Link to={`/article/${article.slug}`}>{article.title}</Link>
				</h3>
				<div className="flex justify-between items-center my-2">
					<Link to={`/user/${article.author.username}`} className="capitalize">
						<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1602747641539/i1G-w7U74.png?w=200&h=200&fit=crop&crop=faces&auto=compress" alt="" className="rounded-full w-6 h-6 border border-gray-300 mr-2 inline-block" />
						<span className="align-bottom text-gray-700 lowercase">@{article.author.username}</span>
					</Link>
					<p className="text-gray-500 text-sm">
						<i className="fal fa-clock mx-2"></i>
						<span className="text-gray-600 font-bold">Feb 10, 2021</span>
					</p>
				</div>
				<p className="text-gray-500">{ article.description }</p>
				<div className="text-right">
					<Link to={`/article/${article.slug}`} className="text-indigo-500 capitalize">
						read more
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Articles;