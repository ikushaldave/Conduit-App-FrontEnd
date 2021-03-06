import React from "react";
import getRequest from "../utils/getRequest";
import Articles from "./Articles";
import Tags from "./Tags";
import Loader from "./Loader";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: null,
			tags: [],
			showingArticle: 0,
			activeFeed: "global",
			activeTags: [],
		};
	}

	fetchFn = async (path) => {
		const { tags } = await getRequest("/api/tags");
		const { articles, articlesCount, allArticlesCount } = await getRequest("api/articles");
		console.log(articles, "articles");
		this.setState({
			tags,
			articles,
			showingArticle: articlesCount,
			allArticlesCount,
		});
	};

	updateFeed = (feed) => {
		switch (feed) {
			case "global":
				this.fetchFn(`/api/articles`);
				break;
			case "user":
				this.fetchFn(`/api/articles/feed`);
				break;
			default:
				break;
		}

		this.setState({
			activeFeed: feed,
			articles: null,
			tags: [],
			showingArticle: 0,
		});
	};

	componentDidMount() {
		console.log("Home Mounting");
		this.fetchFn();;
	}

	render() {
		console.log("Home Rendering");
		const { tags, articles, activeFeed } = this.state;
		const { isLoggedIn, user } = this.props;

		if (!articles) {
			return <Loader />;
		}

		return (
			<main className="container mx-auto">
				<div className="flex mx-auto my-8 justify-between">
					<section className="w-2/3 p-4">
						<div className="flex flex-col">
							<nav className="mb-4 border-b-2 border-green-500">
								<button className={activeFeed === "global" ? "btn feed-btn feed-active" : "btn feed-btn"} onClick={() => this.updateFeed("global")}>
									Global Feed
								</button>
								<button className={!(isLoggedIn && user) ? "hidden" : activeFeed === "user" ? "btn feed-btn feed-active" : "btn feed-btn"} onClick={() => this.updateFeed("user")}>
									User Feed
								</button>
							</nav>
							<Articles articles={articles} />
						</div>
					</section>
					<aside className="w-1/3 mt-12">
						<Tags tags={tags} tagHandler={this.tagHandler} />
					</aside>
				</div>
			</main>
		);
	}
}

export default Home;