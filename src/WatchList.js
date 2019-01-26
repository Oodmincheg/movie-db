import React from 'react';
import WatchListButton from './AddWatchListButton';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wraper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  border: 2px lightblue solid;
  margin: 0 auto;
  max-width: 22%;
  & h2 {
    color: darkblue;
    & a {
      font-size: 12px;
      margin-left: 5px;
    }
  }
`;
const LI = styled.li`
  color: darkblue;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
`;
class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchList: {}
    };
  }
  componentDidMount() {
    let watchList = JSON.parse(localStorage.getItem('watchlist'));
    this.setState({ watchList });
    console.log(this.state.watchList);
  }
  render() {
    if (JSON.stringify(this.state.watchList) == '{}') {
      return (
        <Wraper>
          <h2>
            Watch list is empty<Link to="/">(main page)</Link>
          </h2>
        </Wraper>
      );
    } else {
      return (
        <Wraper>
          <h2>
            Watch list
            <Link to="/">(main page)</Link>
          </h2>
          <ul>
            {Object.keys(this.state.watchList).map(id => (
              <LI key={id}>
                {this.state.watchList[id]}{' '}
                <WatchListButton id={id} title={this.state.watchList.id} />{' '}
              </LI>
            ))}
          </ul>
        </Wraper>
      );
    }
  }
}

export default WatchList;
