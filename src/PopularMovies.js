import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import { getAPIGenres } from "./actionCreators";
import { setSearchString } from "./actionCreators";

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
  constructor(props) {
    super(props);
    this.state = {
      pages: 1,
      movies: []
    };

    this.fetchMoreMovies = this.fetchMoreMovies.bind(this);
  }

  fetchMoreMovies() {
    const urlPopularMovies =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=98135c4d3cc392347281f8d007876760&language=en-US&page=" +
      this.state.pages;

    fetch(urlPopularMovies)
      .then(res => res.json())
      .then(data =>
        this.setState({
          movies: this.state.movies.concat(data.results),
          pages: this.state.pages + 1
        })
      );
  }

  componentDidMount() {
    this.fetchMoreMovies();
    if (this.props.allGenres.length) return;
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
            dataLength={this.state.movies.length}
            next={this.fetchMoreMovies}
            hasMore={true}
            //loader={<h4>Loading...</h4>}
          >
            <Gallery>
              {this.state.movies
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
  return {
    searchString: state.searchString,
    allGenres: state.allGenres
  };
};
const mapDispatchToProps = dispatch => ({
  handleSearch(event) {
    dispatch(setSearchString(event.target.value));
  },
  getAPIGenres() {
    dispatch(getAPIGenres());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularMovies);
