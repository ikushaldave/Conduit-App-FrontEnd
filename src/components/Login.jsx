import React from "react"
import { Link } from "react-router-dom";
import postRequest from "../utils/postRequest";
import regexValidation from "../utils/regexValidation";
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {
				email: "",
				password: "",
				error: "",
			},
		};
		this.errors = {}
	}

	changeHandler = ({ target }) => {
		const { name, value } = target;
		const errors = this.errors;

		switch (name) {
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

	loginHandler = async (e) => {
		e.preventDefault();
		const { email, password } = this.state.errors;

		if (email || password) return;
		const data = await postRequest("/api/user/login", { user: { ...this.state } })
		console.log(data)
		if (data.errors?.errorCode === "auth-02") {
			this.state.errors.error = data.errors.detail;
			this.setState({
				errors: this.state.errors,
			});
		} else {
			localStorage.setItem("token", data.user.token);
			const user = { ...data.user };
			delete user.token;
			this.props.updateState("user", user);
		}
	}

	render() {
		return (
			<div className="container mx-auto">
				<div className="flex justify-center items-center m-16">
					<div className="w-1/3 p-6 rounded-2xl bg-gray-50 shadow-lg">
						<form action="/api/user/login" method="post" onSubmit={this.loginHandler}>
							<h2 className="text-2xl uppercase text-gray-500 text-center m-8">Login</h2>
							<span className="text-red-700 text-sm">{this.state.errors.error || ""}</span>
							<label htmlFor="email">Email:</label>
							<input type="email" name="email" id="email" required value={this.state.email} onChange={this.changeHandler} />
							<span className="text-red-700 text-sm">{this.state.errors.email || ""}</span>
							<label htmlFor="password">Password:</label>
							<input type="password" name="password" id="password" required value={this.state.password} onChange={this.changeHandler} />
							<span className="text-red-700 text-sm">{this.state.errors.password || ""}</span>
							<div className="text-right">
								<input type="submit" value="Login" className="btn" required />
							</div>
						</form>
						<p className="text-gray-700 text-center m-2">
							Not Have Registered?{" "}
							<Link to="/register" className="text-gray-900">
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;