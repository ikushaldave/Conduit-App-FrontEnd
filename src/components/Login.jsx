import { Link } from "react-router-dom";

function Login () {
  return (
		<div className="container mx-auto">
			<div className="flex justify-center items-center m-16">
				<div className="w-1/3 p-6 rounded-2xl bg-gray-50 shadow-lg">
					<form action="/api/user/login" method="post">
						<h2 className="text-2xl uppercase text-gray-500 text-center m-8">Login</h2>
						<label htmlFor="email">Email:</label>
						<input type="email" name="email" id="email" required match="/\S+@\S+\.\S+/" />
						<label htmlFor="password">Password:</label>
						<input type="password" name="password" id="password" required match="/^(?=.{4,10}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/" />
						<div className="text-right">
							<input type="submit" value="Login" className="btn" required />
						</div>
					</form>
					<p className="text-gray-700 text-center m-2">
						Not Have Registered? <Link to="/register" className="text-gray-900">Register</Link>
					</p>
				</div>
			</div>
		</div>
  );
}

export default Login;