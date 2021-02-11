import React from "react";

class App extends React.Component {
  componentWillMount () {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  render () {
    return(<h1>Loading...</h1>)
  }
}

export default App;