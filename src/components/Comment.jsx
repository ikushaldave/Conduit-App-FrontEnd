function CommentSkelton () {
  return (
		<section>
			<div className="container mx-auto">
				<div className="w-5/6 mx-auto">
					<div className="border border-gray-300 p-4 my-4 rounded-lg w-4/6 flex items-center">
						<h4 className="text-gray-700 font-extrabold">Comments (2)</h4>
						<select name="commentFilter" id="commentFilter" className="mx-6 p-2 outline-none focus-within:outline-none rounded-md text-gray-900 cursor-pointer">
							<option value="popular">Popular</option>
							<option value="recent">Recent</option>
						</select>
						<div className="flex-grow text-right">
							<button className="btn primary-btn">
								<i class="fal fa-pencil"></i> Add a comment
							</button>
						</div>
					</div>
					<Comment />
				</div>
			</div>
		</section>
  );
}

function Comment () {
  return (
		<div className="border border-gray-300 p-4 my-4 rounded-lg w-4/6">
			<div className="flex">
				<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1602747641539/i1G-w7U74.png?w=200&h=200&fit=crop&crop=faces&auto=compress" alt="" className="rounded-full inline-block border border-gray-200 w-9 h-9" />
				<div className="author w-3/5 mx-4">
					<h5 className="text-gray-900 capitalize font-bold">
						<a href="##" className="">
							Kushal Dave
						</a>
						<a href="##" className="mx-2 text-gray-500">
							<i class="fab fa-facebook"></i>
						</a>
						<a href="##" className="text-gray-500">
							<i class="fab fa-twitter"></i>
						</a>
					</h5>
					<p className="text-gray-500 text-sm">Software Engineer</p>
				</div>
				<div className="w-1/5 flex-grow text-right">
					<p className="text-gray-500">Feb 11</p>
				</div>
			</div>
			<div className="m-4 text-gray-900">
				<p>It's nice but there is even an easier way using octotree extension that adds sliding explorer in the browser.</p>
			</div>
			<div className="m-4 flex justify-between text-gray-600">
				<a href="##">
					<i className="far fa-thumbs-up m-2"></i>
					Like
				</a>
				<button>
          <i className="fal fa-reply m-2"></i>
          Reply
				</button>
			</div>
		</div>
  );
}

export default CommentSkelton;