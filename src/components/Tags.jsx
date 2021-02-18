function Tags (props) {
  return (
    <div className="m-4 relative border border-gray-400 rounded-md p-4">
      <h3 className="uppercase text-xl text-gray-700 text-center">Tags -</h3>
      <div className="flex flex-wrap justify-around">
        {props.tags.map((tag) => (
          <button className="bg-indigo-100 text-gray-700 border border-indigo-400 capitalize font-normal text-sm hover:bg-indigo-400 rounded-3xl py-2 px-4 m-2" key={ tag } onClick={ () => props.tagHandler(tag) }>
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tags;