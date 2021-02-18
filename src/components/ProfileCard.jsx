import { Link } from "react-router-dom";

function ProfileCard (props) {
  return (
		<div className="relative border border-gray-400 rounded-md px-2 py-4 text-center">
			<img src="/dummy-profile.png" alt="" className="w-36 h-36 object-cover rounded-full inline-block bg-gray-500" />
			<Link to="" className="text-gray-600 font-bold lowercase my-2 text-lg block">
				@ikushaldave
			</Link>
			<h3 className="text-gray-500 my-2 text-sm">
				<span className="font-extrabold text-gray-900">Bio -</span> Love to code
			</h3>
			<div className="text-400 text-sm">
				<Link to="">
					<i className="fas fa-users mx-2"></i>
					39 followers
				</Link>{"  - "}
				<Link to="">16 followings</Link>
			</div>
			<div className="my-2 text-lg text-gray-500">
				<a href="##" target="_blank" rel="noopener noreferrer" className="mx-3">
					<i className="fab fa-facebook"></i>
				</a>
				<a href="##" target="_blank" rel="noopener noreferrer" className="mx-3">
					<i className="fab fa-twitter"></i>
				</a>
			</div>
			<button className="btn primary-btn follow capitalize m-4">Follows</button>
		</div>
  );
}

export default ProfileCard;