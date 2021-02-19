import React from "react";
import { Link } from "react-router-dom";

class Author extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    }
  }

  toggleDropdown = () => {
    this.setState((prev) => {
      return {
        isOpened: !prev.isOpened
      }
    })
  }

  render () {
    const { author } = this.props

    return (
		<div className="border-t border-b border-gray-300 py-4 flex items-center justify-between">
			<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1602747641539/i1G-w7U74.png?w=200&h=200&fit=crop&crop=faces&auto=compress" alt="" width="70px" height="70px" className="rounded-full inline-block border border-gray-200" />
			<div className="author w-3/5">
				<h4 className="text-gray-900 lowercase font-bold">
					<a href="##">{author.username}</a>
				</h4>
				<p className="text-gray-500 text-sm">
					Published on <span className="text-gray-600 font-bold text-base">Feb 10, 2021</span>
				</p>
				<p className="text-gray-500">
					<i className="fal fa-clock"></i> 5 min read
				</p>
			</div>
			<div className="w-1/5 relative">
				<button className="text-gray-600 inline-block border border-transparent hover:border-gray-200 rounded p-1 focus:outline-none" onClick={this.toggleDropdown}>
					<svg className="w-5 h-5 fill-current inline-block" viewBox="0 0 512 512">
						<path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-207.5 86.6l115-115.1c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L256 303l-99.5-99.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l115 115.1c4.8 4.6 12.4 4.6 17.1-.1z"></path>
					</svg>
					<span className="inline-block ml-2 align-middle">More</span>
				</button>
				<div className={this.state.isOpened ? "absolute w-48 text-lg bg-gray-100 rounded-lg right-8 top-full m-4 shadow-lg border border-gray-300 block" : "hidden"}>
					<button className="block p-4 px-6 hover:bg-gray-200 rounded-t-lg text-gray-500 border-b border-gray-500">
						<i className="fal fa-bell-plus mr-6"></i>
						<span>Follow</span>
					</button>
					<button className="block p-4 px-6 hover:bg-gray-200 rounded-b-lg text-gray-500 border-b">
						<i className="fal fa-bookmark mr-6"></i>
						<span>Bookmark</span>
					</button>
				</div>
			</div>
		</div>
	);
  }
}

export default Author;