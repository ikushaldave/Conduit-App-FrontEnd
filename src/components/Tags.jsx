import { Link } from "react-router-dom";

function Tags (props) {
  return (
    <>
      <h3 className="uppercase text-xl text-gray-700 text-center">Tags -</h3>
      <div className="flex flex-wrap justify-between">
        { props.tags.map((tag) => <button className="bg-indigo-100 text-gray-700 border border-indigo-400 capitalize font-normal text-sm hover:bg-indigo-400 rounded-3xl py-2 px-4 m-2" key={ tag }>{ tag }</button>)}
      </div>
    </>
  )
}

export default Tags;