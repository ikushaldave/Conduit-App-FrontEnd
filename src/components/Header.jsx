import { Link } from "react-router-dom";
import Nav from "./Nav"


function Header () {
  return (
		<header className="bg-blue-50">
			<div className="container mx-auto p-4">
				<div className="flex justify-between items-center">
					<Link to="/">
						<h2 className="text-xl uppercase text-gray-600 font-extrabold">Conduit Blog</h2>
          </Link>
          <Nav />
				</div>
			</div>
		</header>
  );
}

export default Header;