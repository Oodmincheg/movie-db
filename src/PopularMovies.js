import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import {
  getAPIGenres,
  setSearchString,
  getAPIPopularMovies
} from "./actionCreators";

const Gallery = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;
const Header = styled.header`
  margin: 0 auto;
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
            <h1>Movies</h1>
            <input
              type="text"
              placeholder="type title..."
              value={this.props.searchString}
              onChange={this.props.handleSearch}
            />
          </Header>
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
  console.log("movies!!!", state.popularMovies);
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
