import React from "react";
import { Link, withRouter } from "react-router-dom";
class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    }
	}

	navHandler = () => {
		this.setState({
			isOpened: !this.state.isOpened
		})
	}

  render () {
    let Nav = null;
    const { user, isLoggedIn, logout, history } = this.props;

		if (isLoggedIn) {
			Nav = (
				<>
					<Link to="/create/article" className="btn primary-btn mx-4">
						Write <i className="fas fa-pencil px-2"></i>
					</Link>
					<nav className="relative" onClick={this.navHandler}>
						<button className="btn secondary-btn">
							<img src={user.image || "/dummy-profile.png"} alt="profile" className="w-8 h-8 rounded-full object-cover inline-block" />
							<h3 className="inline-block ml-2 text-gray-700 text-sm">{`@${user.username}`}</h3>
						</button>
						<div className={this.state.isOpened ? "logged-nav" : "hidden"}>
							<Link to={`/profile/${user.username}`} className="capitalize p-4 hover:bg-gray-200">
								<i className="fal fa-user-circle mr-3"></i> Profile
							</Link>
							<Link to={`/setting`} className="capitalize p-4 border-t border-b border-gray-500 hover:bg-gray-200">
								<i className="fal fa-user-cog mr-3"></i> Setting
							</Link>
							<a href="/logout" className="capitalize p-4 hover:bg-gray-200" onClick={(e) => {
								e.preventDefault();
								logout()
								history.push("/");
							}}>
								<i className="fas fa-sign-out-alt mr-3"></i> Log out
							</a>
						</div>
					</nav>
				</>
			);
		} else {
			Nav = (
				<>
					<Link to="/register" className="btn primary-btn mx-4">
						Sign Up
					</Link>
					<Link to="/login" className="btn secondary-btn">
						Log In
					</Link>
				</>
			);
		}

    return (
		<nav className="flex justify-between items-center">
			<Link to="/">Home</Link>
			{Nav}
		</nav>
	);
  }
}

export default withRouter(Navigation);