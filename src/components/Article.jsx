import Comment from "./Comment";

function Article () {
		return (
			<div className="container mx-auto">
				<div className="w-5/6 flex mx-auto my-8">
					<section className="w-4/6">
						<div>
							<img src="https://images.unsplash.com/photo-1610859234494-6cb68d6361a2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80" alt="" className="rounded" />
						</div>
						<div className="my-6">
							<h2 className="text-gray-900 text-4xl font-extrabold break-words my-4 mr-4">Github1s - Instantly Browse Projects on VSCode in Your Browser ⚡</h2>
							<Author />
							<p className="whitespace-pre-wrap m-4">
								Like $GME, Github1s is a project that seemingly blew up overnight (literally). Developed by @conwnet, this project aims to be an extremely fast way to load up any Github project in "one second" with the same feel as if you opened it up locally on VSCode. Now, you might be wondering why would anyone need this when you can just browse the repository on Github website or clone the project yourself? The Good Speed If you're like me, the Github website just doesn't beat the snappiness of opening any codebase in an editor, like VSCode. The need to go back and forth to browse files within the website adds enough of a delay to make it annoying over time, especially when you're looking through tons of files. Along with your StackOverflow tabs, soon it'll be quite difficult to make out which tab corresponds to what. With Github1s, you can browse the code without crowding out your other browser tabs. This project uses the file tree also found in VSCode to help you
								switch and search for files without needing to go to a different page. Clicking on a file in the sidebar brings it up immediately. Alt Text Convenience Using it is incredibly simple. Go to a repository you are browsing, let's say https://github.com/Spiderpig86/Cirrus. Then, go to your address bar and change github.com to github1s.com and press enter. You should now see the repository loaded up in a VSCode-like window. Open Source The source is public and you can follow directions to host an instance of this on your own machine. But at that point, is there really any benefit? You might as well just clone the repositories yourself. The Bad VSCode Appearance Minus Most of the Functionality This is not the tool to use if you were expecting a full-on VSCode experience in your browser. There is no terminal, no debugging support, and no extensions. Do not expect the Source Control panel in the sidebar to work either. Github API Limits Since the app uses the
								Github API to load the repositories and fetch all the files, you are also subjected to API rate limiting. As mentioned on the sidebar, unauthenticated requests are limited to just 60 per hour. With your own OAuth token, you can make up to 5,000 requests per hour. This limitation can become quite annoying if you end up surpassing the limits. Alt Text Overall Github1s, in the end, is a great tool to browse repositories quickly. It's extremely easy to use and quick to load. However, the API request limitation can end up becoming a pain point as requests can be consumed rather quickly. In 5 minutes, I was able to surpass the 60 request quota by perusing the VSCode repository. If staying secure is your concern, I recommend cloning the repository and setting it up yourself. Thanks for reading! 💎 Thank you for taking the time to check out this post. For more content like this, head over to my actual blog. Feel free to reach out to me on LinkedIn and follow me
								on Github.
							</p>
						</div>
						<Tags />
					</section>
					<aside className="w-1/5 relative mx-8">
						<div className="flex h-screen flex-col justify-center items-center sticky top-0">
							<a href="##" className="my-4 text-2xl text-gray-900">
								<i class="fal fa-heart"></i>
							</a>
							<a href="##" className="my-4 text-2xl text-gray-900">
								<i class="fal fa-bookmark"></i>
							</a>
							<a href="##" className="my-4 text-2xl text-gray-900">
								<i class="fal fa-share-alt"></i>
							</a>
						</div>
					</aside>
				</div>
				<Comment />
			</div>
		);
	}

function Author () {
	return (
		<div className="border-t border-b border-gray-300 py-4 flex items-center justify-between">
			<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1602747641539/i1G-w7U74.png?w=200&h=200&fit=crop&crop=faces&auto=compress" alt="" width="70px" height="70px" className="rounded-full inline-block border border-gray-200" />
			<div className="author w-3/5">
				<h4 className="text-gray-900 capitalize font-bold">
					<a href="##">Kushal Dave</a>
				</h4>
				<p className="text-gray-500 text-sm">
					Published on <span className="text-gray-600 font-bold text-base">Feb 10, 2021</span>
				</p>
				<p className="text-gray-500">
					<i className="fal fa-clock"></i> 5 min read
				</p>
			</div>
			<div className="w-1/5 relative">
				<a href="##" className="text-gray-600 inline-block border border-transparent hover:border-gray-200 rounded p-1">
					<svg className="w-5 h-5 fill-current inline-block" viewBox="0 0 512 512">
						<path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-207.5 86.6l115-115.1c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L256 303l-99.5-99.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l115 115.1c4.8 4.6 12.4 4.6 17.1-.1z"></path>
					</svg>
					<span className="inline-block ml-2 align-middle">More</span>
				</a>
				<div className="absolute w-60 text-lg bg-blue-50 rounded-lg right-3/4 top-full hidden ">
					<a href="##" className="block p-4 px-6 hover:bg-gray-200 rounded-t-lg text-gray-500">
						<i className="fal fa-bell-plus mr-6"></i>
						<span>Follow</span>
					</a>
					<a href="##" className="block p-4 px-6 hover:bg-gray-200 rounded-b-lg text-gray-500">
						<i className="fal fa-bookmark mr-6"></i>
						<span>Bookmark</span>
					</a>
				</div>
			</div>
		</div>
	);
}

function Tags () {
		return (
			<div className="my-4">
				<h4 className="text-xl text-gray-800 font-extrabold uppercase mx-2 my-4">Tags -</h4>
				<a href="##" className="p-2 m-2 bg-gray-100 text-gray-800 inline-block rounded hover:bg-gray-200">
					#web-development
				</a>
				<a href="##" className="p-2 m-2 bg-gray-100 text-gray-800 inline-block rounded hover:bg-gray-200">
					#github
				</a>
				<a href="##" className="p-2 m-2 bg-gray-100 text-gray-800 inline-block rounded hover:bg-gray-200">
					#javascript
				</a>
			</div>
		);
	}

	export default Article;