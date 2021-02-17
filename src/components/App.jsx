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
			console.log(data);
			if (data.errors?.errorCode === "auth-00") {
				localStorage.clear();
        this.updateState("user", null);
        return false
			} else {
				const user = { ...data.user };
        this.updateState("user", user);
        return true;
      }
    }
    return false
  };

  logout = () => {
    localStorage.clear();
    this.updateState("user", null)
  }

	async componentDidMount() {
		console.log("Mounting");
		this.getUser();
	}

  render () {
    const { isLoggedIn, user } = this.state;
		return (
			<Router>
				<Header isLoggedIn={isLoggedIn} user={user} />
				<Switch>
					<Route path="/register">
						<Register updateState={this.updateState} isLoggedIn={isLoggedIn} />
					</Route>
					<Route path="/login">
						<Login updateState={this.updateState} isLoggedIn={isLoggedIn} />
					</Route>
					<Route
						path="/logout"
						component={() => {
							this.logout();
							return <Redirect to="/" />;
						}}
					></Route>
					<Route path="/create/article">
						{isLoggedIn ? <NewPost /> : <Redirect to="/login" />}
					</Route>
					<Route path="/article/:slug/edit" component={({ match }) => <EditPost user={this.state.user} slug={match.params.slug} isLoggedIn={this.state.isLoggedIn}/>} />
					<Route path="/article/:slug" component={({ match }) => <Article user={this.state.user} slug={match.params.slug} isLoggedIn={this.state.isLoggedIn}/>} />
					<Route path="/" exact>
						<Home />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;