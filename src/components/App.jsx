import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Header";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

class App extends React.Component {
  render () {
    return (
      <Router>
        <Header />
        <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;