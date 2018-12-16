import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

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
      pages: 2,
      movies: this.props.movies,
      searchString: "",
      allGenres: [],
      genresLoaded: false
    };
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch({ target }) {
    this.setState({ searchString: target.value });
  }
  componentDidMount() {
    //prettier-ignore
    const urlGenres ="https://api.themoviedb.org/3/genre/movie/list?api_key=98135c4d3cc392347281f8d007876760&language=en-US";
    fetch(urlGenres)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            genresLoaded: true,
            allGenres: data.genres
          });
        },
        error => {
          this.setState({
            genresLoaded: true,
            error
          });
        }
      );
  }
  render() {
    if (!this.state.genresLoaded) {
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
              value={this.state.searchString}
              onChange={this.handleSearch}
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
                    .includes(this.state.searchString.toUpperCase())
                )
                .map(movie => (
                  <MovieCard
                    key={movie.id}
                    allGenres={this.state.allGenres}
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

export default PopularMovies;
