import { Link } from "react-router-dom";

function Register () {
  return (
		<div className="container mx-auto">
			<div className="flex justify-center items-center mt-10">
				<div className="w-1/3 p-6 rounded-2xl bg-gray-50 shadow-lg">
					<form action="/api/user" method="post">
						<h2 className="text-2xl uppercase text-gray-500 text-center m-8">Register</h2>
						<label htmlFor="username">Username:</label>
						<input type="text" name="username" id="username" minLength="6" required />
						<label htmlFor="email">Email:</label>
						<input type="email" name="email" id="email" required match="/\S+@\S+\.\S+/" />
						<label htmlFor="password">Password:</label>
						<input type="password" name="password" id="password" required match="/^(?=.{4,10}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/" />
						<div>
							<input type="checkbox" name="tc" id="tc" />
							<label htmlFor="tc" className="tc capitalize text-sm">
								Please read and accept <a href="##">T&C</a>.
							</label>
						</div>
						<div className="text-right">
							<input type="submit" value="Sign Up" className="btn" required />
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

export default Register;