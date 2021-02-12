import Article from "./Article";
import Articles from "./Articles";

function Home () {
  return (
		<main className="container mx-auto">
			<div className="flex mx-auto my-8">
				<section className="p-4">
          <div className="flex flex-col">
            <Articles />
          </div>
				</section>
        <aside className="ml-2 relative mx-8 border border-gray-400 rounded-md p-4">
          <h3 className="uppercase text-xl text-gray-700 text-center">Tags -</h3>
          <div className="flex flex-wrap justify-between">
            <button className="bg-indigo-100 text-gray-700 border border-indigo-400 capitalize font-normal text-sm hover:bg-indigo-400 rounded-3xl py-2 px-4 m-2">Web Development</button>
            <button className="bg-indigo-100 text-gray-700 border border-indigo-400 capitalize font-normal text-sm hover:bg-indigo-400 rounded-3xl py-2 px-4 m-2">Life Style</button>
          </div>
				</aside>
			</div>
		</main>
  );
}



export default Home;