import React from "react";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  render () {
    return (
      <nav className="flex justify-between items-center w-1/5">
        <Link to="/">Home</Link>
        <Link to="/register" className="btn primary-btn">Sign Up</Link>
        <Link to="/login" className="btn secondary-btn">Log In</Link>
      </nav>
    );
  }
}

export default Navigation;