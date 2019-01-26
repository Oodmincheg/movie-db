import React from 'react';
import styled from 'styled-components';
//
const Button = styled.button`
  font-family: 'Inconsolata', monospace;
  border: 2px solid lightblue;
`;
class WatchListButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inWatchList: false
    };
    this.deleteFromWatchList = this.deleteFromWatchList.bind(this);
    this.moveToLocalStorage = this.moveToLocalStorage.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
  }
  componentDidMount = () => {
    if (localStorage.getItem('watchlist')) {
      let watchlist = JSON.parse(localStorage.getItem('watchlist'));
      this.setState({ watchlist });
      this.setState({ inWatchList: Boolean(this.props.id in watchlist) });
    } else {
      localStorage.setItem('watchlist', '{}');
    }
    window.addEventListener('beforeunload', this.moveToLocalStorage);
  };
  moveToLocalStorage = () => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));
    if (this.state.inWatchList && !(this.props.id in watchlist)) {
      watchlist[this.props.id] = this.props.title;
    }
    if (!this.state.inWatchList && this.props.id in watchlist) {
      delete watchlist[this.props.id];
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  };
  componentWillUnmount = () => {
    this.moveToLocalStorage();
    window.removeEventListener('beforeunload', this.componentCleanup);
  };
  deleteFromWatchList() {
    this.setState({ inWatchList: false });
  }
  addToWatchList() {
    this.setState({ inWatchList: true });
  }
  render() {
    if (this.state.inWatchList) {
      return (
        <Button onClick={this.deleteFromWatchList}>
          Delete from watchlist
        </Button>
      );
    } else {
      return <Button onClick={this.addToWatchList}>Add to watch list</Button>;
    }
  }
}

export default WatchListButton;
