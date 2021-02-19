import React from "react";
import { Redirect } from "react-router-dom";
import Loader from "./Loader";
import regexValidation from "../utils/regexValidation";
import putRequest from "../utils/putRequest";

class Setting extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      username: "",
			email: "",
			bio: "",
			image: "",
			password: "",
			errors: {
				email: "",
				bio: "",
				password: "",
      },
      error: false,
		};
		this.file = React.createRef();
	}

	changeHandler = ({ target }) => {
		const { name, value } = target;
		const { errors } = this.state;
		switch (name) {
			case "email":
				errors[name] = regexValidation(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, value) ? "" : `email should be valid`;
				break;
			case "bio":
				errors.bio = (value.trim().length > 10) || (value.trim().length === 0) ? "" : "Bio should be minimum 10 characters";
				break;
			case "password":
				errors[name] = regexValidation(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, value.trim()) ? "" : `password should contain minimum of 8 at least one capital, at least one digit, and at least one special character`;
				break;
			default:
				break;
		}

		this.setState({
			[name]: value,
			errors,
		});
	};

  settingHandler = async (e) => {
    e.preventDefault();
    const { email, password, bio } = this.state.errors;
    if (email || password || bio) return;
    const {user, errors} = await putRequest("/api/user", { user: { ...this.state } });
    console.log(user);
    this.setState({
      ...user,
      error: errors ? true : false
    })
  };

	componentDidMount() {
		const { user } = this.props;
    this.setState({
      username: user?.username ?? "",
			email: user?.email ?? "",
			bio: user?.bio ?? "",
			image: user?.image ?? "",
		});
	}

	render() {
		const { isLoggedIn, user } = this.props;
		const { email, bio, password } = this.state;

    if (localStorage.getItem("token")) {
      if (!(isLoggedIn && user)) return <Loader />;
    } else {
      return <Redirect to="/login" />
    }

		return (
			<div className="container mx-auto p-4">
				<form className="w-3/4 mx-auto p-6 rounded-2xl bg-gray-50 shadow-lg" onSubmit={this.settingHandler}>
					<h2 className="text-2xl uppercase text-gray-500 text-center m-8">Setting</h2>
					<label htmlFor="image">Profile Image</label>
					<input type="file" name="image" id="image" ref={this.file} />
					<label htmlFor="username">Username -</label>
					<input type="text" name="username" id="username" defaultValue={user.username} readOnly={true} />
					<label htmlFor="email">Email -</label>
					<input type="email" name="email" id="email" placeholder="abc@conduit.com" value={email} onChange={this.changeHandler} required />
					<span className="text-red-700 text-sm">{this.state.errors.email || ""}</span>
					<label htmlFor="bio">Bio -</label>
					<input type="text" name="bio" id="bio" minLength="10" placeholder="Bio should be minimum 10 character" value={bio} onChange={this.changeHandler} />
					<span className="text-red-700 text-sm">{this.state.errors.bio || ""}</span>
					<label htmlFor="password">Change Password -</label>
					<input type="password" name="password" id="password" placeholder="Admin@123" value={password} onChange={this.changeHandler} />
					<span className="text-red-700 text-sm">{this.state.errors.password || ""}</span>
					<div className="text-right">
						<input type="submit" value="Update Profile" className="btn" />
					</div>
				</form>
			</div>
		);
	}
}

export default Setting;