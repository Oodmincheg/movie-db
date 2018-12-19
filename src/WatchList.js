import React from "react";
import WatchListButton from "./AddWatchListButton";

class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchList: {}
    };
  }
  componentDidMount() {
    let watchList = JSON.parse(localStorage.getItem("watchlist"));
    this.setState({ watchList });
    console.log(this.state.watchList);
  }
  render() {
    if (JSON.stringify(this.state.watchList) == "{}") {
      return <h2>Watch list is empty</h2>;
    } else {
      return (
        <ul>
          {Object.keys(this.state.watchList).map(id => (
            <li key={id}>
              {this.state.watchList[id]}{" "}
              <WatchListButton id={id} title={this.state.watchList.id} />{" "}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default WatchList;
