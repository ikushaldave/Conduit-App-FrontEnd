import { Link } from "react-router-dom";
import Nav from "./Nav"


function Header (props) {
	const { isLoggedIn, user, logout } = props;
  return (
		<header className="bg-blue-50">
			<div className="container mx-auto p-4">
				<div className="flex justify-between items-center">
					<Link to="/">
						<h2 className="text-xl uppercase text-gray-600 font-extrabold">Conduit Blog</h2>
					</Link>
					<Nav isLoggedIn={isLoggedIn} user={user} logout={logout} />
				</div>
			</div>
		</header>
  );
}

export default Header;