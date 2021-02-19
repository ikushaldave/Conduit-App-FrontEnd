import React from "react";
import { Redirect } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Articles from "./Articles";
import Followers from "./Followers";
import Followings from "./Followings";
import Loader from "./Loader";
import getRequest from "../utils/getRequest"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		user: null,
		followers: [],
		followings: [],
		published: [],
		activeTab: "published",
	};
  }

  updateTab = (tab) => {
    this.setState({
		activeTab: tab,
		[tab]: [],
	});
    this.fetchFn(tab)
  }

  fetchFn = async (tab) => {
    const { username } = this.props;
    let value = null;
    console.log(username, value);
    switch (tab) {
      case "published":
        const { articles } = await getRequest(`/api/articles?author=${username}`);
        value = articles;
        break;
      case "followers":
        const followers = await getRequest(`/api/profiles/${username}/followers`);
        value = followers;
        break;
      case "followings":
        const followings = await getRequest(`/api/profiles/${username}/followings`);
        value = followings;
        break;
      default:
        break;
    }

    this.setState({
      [tab]: value,
    });

  }

  conditionalRendering = () => {
    const { activeTab, published } = this.state;
    console.log(published, "published");
    switch (activeTab) {
      case "published":
        return <Articles articles={published} />;
      case "followings":
        return <Followings />;
      case "followers":
        return <Followers />
      default:
        break;
    }
  }

  componentDidMount () {
    this.fetchFn("published")
  }

  componentWillUnmount () {
    console.log("Unmounting Profile");
  }

  render () {
    const loggedUserInfo = this.props.user;
    const { isLoggedIn } = this.props

    if (localStorage.getItem("token")) {
      if (!(isLoggedIn && loggedUserInfo)) return <Loader />;
    }

    const { activeTab, followers, followings, published } = this.state

    if(!(followers || followings || published)) return <Loader />
    return (
		<main className="container mx-auto">
			<div className="flex mx-auto my-8">
				<aside className="w-1/3 mt-12">
					<ProfileCard />
				</aside>
				<section className="ml-4 p-4 flex-grow">
					<div className="flex flex-col">
						<div className="mb-4 border-b-2 border-green-500">
							<button className={activeTab === "published" ? "btn feed-btn feed-active" : "btn feed-btn"} onClick={() => this.updateTab("published")}>
								<i className="fal fa-paper-plane"></i> Published
							</button>
							<button className={activeTab === "followings" ? "btn feed-btn feed-active" : "btn feed-btn"} onClick={() => this.updateTab("followings")}>
                followings
							</button>
							<button className={activeTab === "followers" ? "btn feed-btn feed-active" : "btn feed-btn"} onClick={() => this.updateTab("followers")}>
								followers
							</button>
						</div>
					</div>
          <div>
            {this.conditionalRendering()}
          </div>
				</section>
			</div>
		</main>
	);
  }
}

export default Profile;
