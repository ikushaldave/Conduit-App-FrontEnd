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
import Loader from "./Loader";
import NotFound from "./NotFound";

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
		console.log("App Getting User");
		const token = localStorage.getItem("token");
		if (token) {
			const data = await getRequest("/api/user");
			console.log(data, "user");
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
		this.updateState("user", null);
	};

	componentDidMount() {
		console.log("App Mounting");
		this.getUser();
	}

	render() {
		console.log("App Rendering");
		const { isLoggedIn, user } = this.state;
		if (localStorage.getItem("token") && !user && !isLoggedIn) return <Loader />;
		console.log(user, isLoggedIn);
		return (
			<Router>
				<Header isLoggedIn={isLoggedIn} user={user} logout={this.logout} />
				{isLoggedIn && user ? <AuthRoute user={user} isLoggedIn={isLoggedIn} updateState={this.updateState} logout={this.logout} /> : <NoAuthRoute updateState={this.updateState} logout={this.logout} />}
			</Router>
		);
	}
}

function NoAuthRoute({ updateState }) {
	return (
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/register">
				<Register updateState={updateState} />
			</Route>
			<Route path="/login">
				<Login updateState={updateState} />
			</Route>
			<Route path="/article/:slug" component={({ match }) => <Article slug={match.params.slug} />} />
			<Route path={["/create/article", "/article/:slug/edit", "/setting", "/profile/:username"]}>
				<Redirect to="/login" />
			</Route>
			<Route path="*">
				<NotFound />
			</Route>
		</Switch>
	);
}

function AuthRoute({ user, isLoggedIn, updateState }) {
	return (
		<Switch>
			<Route path="/" exact>
				<Home isLoggedIn={isLoggedIn} user={user} />
			</Route>
			<Route path="/register">
				<Register updateState={updateState} isLoggedIn={isLoggedIn} user={user} />
			</Route>
			<Route path="/login">
				<Login updateState={updateState} isLoggedIn={isLoggedIn} user={user} />
			</Route>
			<Route path="/create/article">{isLoggedIn ? <NewPost isLoggedIn={isLoggedIn} /> : <Redirect to="/login" />}</Route>
			<Route path="/article/:slug/edit" component={({ match }) => <EditPost user={user} slug={match.params.slug} isLoggedIn={isLoggedIn} />} />
			<Route path="/article/:slug" component={({ match }) => <Article user={user} slug={match.params.slug} isLoggedIn={isLoggedIn} />} />
			<Route path="/setting" component={({ match }) => <Setting user={user} slug={match.params.slug} isLoggedIn={isLoggedIn} />} />
			<Route path="/profile/:username" component={({ match }) => <Profile user={user} username={match.params.username} isLoggedIn={isLoggedIn} />} />
			<Route path="*">
				<NotFound />
			</Route>
		</Switch>
	);
}

export default App;
