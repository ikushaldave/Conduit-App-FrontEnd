import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import getRequest from "../utils/getRequest";
import Header from "./Header";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false
    }
  }

  updateState = (key, value) => {
    this.setState({
        [key]: value,
        isLoggedIn: localStorage.getItem("token") ? true : false
      });
  }

  async componentDidMount () {
    console.log("mounting");
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const data = await getRequest("/api/user")
      console.log(data)
      if (data.errors?.errorCode === "auth-00") {
        localStorage.clear();
        this.updateState("user", null)
      } else {
        const user = { ...data.user };
        delete user.token;
        this.updateState("user", user);
      }
    }
  }

  render () {
    return (
		<Router>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
			<Switch>
				<Route path="/register">{this.state.isLoggedIn ? <Redirect to="/" /> : <Register updateState={this.updateState} />}</Route>
        <Route path="/login">{this.state.isLoggedIn ? <Redirect to="/" /> : <Login updateState={this.updateState} />}</Route>
        <Route path="/logout"><Redirect to="/" /></Route>
				<Route path="/"><Home /></Route>
			</Switch>
		</Router>
	);
  }
}

export default App;