import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import getRequest from "../utils/getRequest";
import Header from "./Header";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Article from "./Article";
import NewPost from "./CreatePost";
import EditPost from "./EditPost";
import Setting from "./Setting";
import Profile from "./Profile";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			isLoggedIn: false,
    };
	}

	updateState = (key, value) => {
		this.setState({
			[key]: value,
			isLoggedIn: localStorage.getItem("token") ? true : false,
		});
	};

	getUser = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			const data = await getRequest("/api/user");
			if (data.errors?.errorCode === "auth-00") {
				localStorage.clear();
        this.updateState("user", null);
			} else {
				const user = { ...data.user };
        this.updateState("user", user);
      }
    }
  };

  logout = () => {
    localStorage.clear();
  }

	componentDidMount() {
		console.log("App Mounting");
		this.getUser();
	}

  render () {
    const { isLoggedIn, user } = this.state;
		return (
			<Router>
				<Header isLoggedIn={isLoggedIn} user={user} />
				<Switch>
					<Route path="/" exact>
						<Home isLoggedIn={isLoggedIn} user={this.state.user} />
					</Route>
					<Route path="/register">
						<Register updateState={this.updateState} isLoggedIn={isLoggedIn} user={this.state.user} />
					</Route>
					<Route path="/login">
						<Login updateState={this.updateState} isLoggedIn={isLoggedIn} user={this.state.user} />
					</Route>
					<Route path="/create/article">{isLoggedIn ? <NewPost /> : <Redirect to="/login" />}</Route>
					<Route path="/article/:slug/edit" component={({ match }) => <EditPost user={this.state.user} slug={match.params.slug} isLoggedIn={this.state.isLoggedIn} />} />
					<Route path="/article/:slug" component={({ match }) => <Article user={this.state.user} slug={match.params.slug} isLoggedIn={this.state.isLoggedIn} />} />
					<Route path="/setting" component={({ match }) => <Setting user={this.state.user} slug={match.params.slug} isLoggedIn={this.state.isLoggedIn} />} />
					<Route path="/profile/:username" component={({ match }) => <Profile user={this.state.user} username={match.params.username} isLoggedIn={this.state.isLoggedIn} />} />
					<Route
						path="/logout"
						component={() => {
							this.logout();
							return <Redirect to="/" />;
						}}
					></Route>
				</Switch>
			</Router>
		);
	}
}

export default App;