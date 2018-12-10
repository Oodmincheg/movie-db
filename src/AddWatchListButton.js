import React from "react";
//
class WatchListButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inWatchList: Boolean(this.props.id in localStorage)
    };
    this.deleteFromWatchList = this.deleteFromWatchList.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
  }
  deleteFromWatchList() {
    localStorage.removeItem(this.props.id);
    this.setState({ inWatchList: false });
  }
  addToWatchList() {
    localStorage.setItem(this.props.id, this.props.title);
    this.setState({ inWatchList: true });
  }
  render() {
    if (this.state.inWatchList) {
      return (
        <button onClick={this.deleteFromWatchList}>
          Delete from watchlist
        </button>
      );
    } else {
      return <button onClick={this.addToWatchList}>Add to watch list</button>;
    }
  }
}

export default WatchListButton;
