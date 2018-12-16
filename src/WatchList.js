import React from "react";
import WatchListButton from "./AddWatchListButton";

class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchList: []
    };
  }
  componentDidMount() {
    let watchList = [];
    for (let i = 0; i < localStorage.length; i++) {
      let obj = {
        id: localStorage.key(i),
        title: localStorage.getItem(localStorage.key(i))
      };
      watchList.push(obj);
    }
    this.setState({ watchList });
  }
  render() {
    if (localStorage.length === 0) {
      return <h2>Watch list is empty</h2>;
    } else {
      return (
        <ul>
          {this.state.watchList.map(movie => (
            <li key={movie.id}>
              {movie.title}{" "}
              <WatchListButton id={movie.id} title={movie.title} />{" "}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default WatchList;
