import React from "react";
import { Link, Redirect } from "react-router-dom";
import Loader from "./Loader";
import postRequest from "../utils/postRequest";
import regexValidation from "../utils/regexValidation";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			errors: {
				username: "",
				email: "",
				password: "",
			},
			error: ""
		};
	}

	changeHandler = ({ target }) => {
		const { name, value } = target;
		const { errors } = this.state;

		switch (name) {
			case "username":
				errors[name] = regexValidation(/^(?=.{4,25}$)(?:[a-zA-Zd]+(?:(?:.|-|_)[a-zA-Zd])*)+$/, value) ? "" : `username should minimum of length 4 & can contain '. - _' `;
				break;
			case "email":
				errors[name] = regexValidation(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, value) ? "" : `email should be valid`;
				break;
			case "password":
				errors[name] = regexValidation(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, value) ? "" : `password should contain minimum of 8 at least one capital, at least one digit, and at least one special character`;
				break;
			default:
				break;
		}
		this.setState({
			[name]: value,
			errors,
		});
	};

	registerHandler = async (e) => {
		e.preventDefault();

		const { username, email, password } = this.state.errors;

		if (username || email || password) return;
		const data = await postRequest("/api/user", {user: {...this.state}})
		console.log(data);
		if (data.errors) {
			this.setState({
				error: "username or email already exist if you existing user please login or try different email or username to register",
			});
		} else {
			localStorage.setItem("token", data.user.token);
			const user = { ...data.user }
			this.props.updateState("user", user)
		}
	};

	render () {
		const { isLoggedIn, user } = this.props;

		if (isLoggedIn && user) return <Redirect to="/" />;

		return (
			<div className="container mx-auto">
				<div className="flex justify-center items-center my-10">
					<div className="w-34 p-6 rounded-2xl bg-gray-50 shadow-lg">
						<form action="/api/user" method="post" onSubmit={this.registerHandler} autoComplete="false">
							<h2 className="text-2xl uppercase text-gray-500 text-center m-8">Register</h2>
							<span className="text-red-700 text-sm">{this.state.error || ""}</span>
							<label htmlFor="username">Username:</label>
							<input type="text" name="username" id="username" minLength="4" required placeholder="ikushaldave" value={this.state.username} onChange={this.changeHandler} className={this.state.errors.username ? "error" : "success"} />
							<span className="text-red-700 text-sm">{this.state.errors.username || ""}</span>
							<label htmlFor="email">Email:</label>
							<input type="email" name="email" id="email" required placeholder="abc@conduit.com" value={this.state.email} onChange={this.changeHandler} className={this.state.errors.email ? "error" : "success"} />
							<span className="text-red-700 text-sm">{this.state.errors.email || ""}</span>
							<label htmlFor="password">Password:</label>
							<input type="password" name="password" id="password" required placeholder="Admin@123" value={this.state.password} onChange={this.changeHandler} className={this.state.errors.password ? "error" : "success"} />
							<span className="text-red-700 text-sm">{this.state.errors.password || ""}</span>
							<div>
								<input type="checkbox" name="tc" id="tc" required />
								<label htmlFor="tc" className="tc capitalize text-sm">
									Please read and accept <a href="##">T&C</a>.
								</label>
							</div>
							<div className="text-right">
								<input type="submit" value="Sign Up" className="btn" />
							</div>
						</form>
						<p className="text-gray-700 text-center m-2">
							Already Registered?{" "}
							<Link to="/login" className="text-gray-900">
								login
							</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;