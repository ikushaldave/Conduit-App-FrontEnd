import React from "react";
import getRequest from "../utils/getRequest";
import Articles from "./Articles";
import Tags from "./Tags";
import Loader from "./Loader";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      tags: null
    }
  }

  latestUpdate = async () => {
    const { tags } = await getRequest("/api/tags");
    const { articles } = await getRequest("/api/articles");
    this.setState({
      tags,
      articles,
    });
  }

  async componentDidMount () {
    this.latestUpdate();
  }

  async componentWillUnmount () {
    this.setState({
      tags: null,
      articles: null
    })
  }

  render () {
    const { tags, articles } = this.state

    if (!(tags && articles)) {
      return <Loader />
    }

    return (
      <main className="container mx-auto">
        <div className="flex mx-auto my-8">
          <section className="p-4">
            <div className="flex flex-col">
              <Articles articles={articles}/>
            </div>
          </section>
          <aside className="ml-2 relative mx-8 border border-gray-400 rounded-md p-4">
            <Tags tags={tags}/>
          </aside>
        </div>
      </main>
    );
  }
}



export default Home;