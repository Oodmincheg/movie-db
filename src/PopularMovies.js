import React from 'react';
import Scroll from './ScrollComponent';
import styled from 'styled-components';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import {
  getAPIGenres,
  setSearchString,
  getAPIPopularMovies
} from './actionsAndReducers';

const Gallery = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;
const Header = styled.header`
  & h1 {
    font-size: 50px;
    color: darkblue;
  }
  font-family: 'Inconsolata', monospace;
  margin: 20px auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

class PopularMovies extends React.Component {
  fetchMorePopularMovies = this.fetchMorePopularMovies.bind(this);

  fetchMorePopularMovies() {
    this.props.getAPIPopularMovies(this.props.page);
  }

  componentDidMount() {
    if (this.props.allGenres.length) return;
    this.fetchMorePopularMovies();
    this.props.getAPIGenres();
  }

  render() {
    if (!this.props.allGenres.length) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div className="content">
          <Header>
            <Link to="/watchlist">Watch list</Link>
            <h1>Popular Movies</h1>
            <div>
              <span>Search:</span>
              <input
                type="text"
                placeholder="type title..."
                value={this.props.searchString}
                onChange={this.props.handleSearch}
              />
            </div>
          </Header>
          <Scroll scrollStepInPx="50" delayInMs="16.66" />
          <InfiniteScroll
            dataLength={this.props.popularMovies.length}
            next={this.fetchMorePopularMovies}
            hasMore={true}
            //loader={<h4>Loading...</h4>}
          >
            <Gallery>
              {this.props.popularMovies
                .filter(movie =>
                  movie.title
                    .toUpperCase()
                    .includes(this.props.searchString.toUpperCase())
                )
                .map(movie => (
                  <MovieCard
                    key={movie.id}
                    allGenres={this.props.allGenres}
                    movie={movie}
                  />
                ))}
            </Gallery>
          </InfiniteScroll>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  console.log('movies!!!', state.popularMovies);
  return {
    searchString: state.searchString,
    allGenres: state.allGenres,
    popularMovies: state.popularMovies,
    page: state.page
  };
};
const mapDispatchToProps = dispatch => ({
  handleSearch(event) {
    dispatch(setSearchString(event.target.value));
  },
  getAPIGenres() {
    dispatch(getAPIGenres());
  },
  getAPIPopularMovies(page) {
    dispatch(getAPIPopularMovies(page));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularMovies);
