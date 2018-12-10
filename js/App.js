import React from "react";
import PopularMovies from "./PopularMovies";
import { BrowserRouter, Route } from "react-router-dom";
import MoviePage from "./MoviePage";
import WatchList from "./WatchList";
//
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesLoaded: false,

      error: null,
      popularMovies: []
    };
  }

  componentDidMount() {
    //prettier-ignore
    const urlPopularMovies = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=98135c4d3cc392347281f8d007876760&language=en-US";

    fetch(urlPopularMovies)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            moviesLoaded: true,
            popularMovies: data.results
          });
        },
        error => {
          this.setState({
            moviesLoaded: true,
            error
          });
        }
      );
  }
  render() {
    if (!this.state.moviesLoaded) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Route
              exact
              path="/"
              render={() => <PopularMovies movies={this.state.popularMovies} />}
            />
            <Route
              exact
              path="/movie/:id"
              render={props => <MoviePage movieId={props.match.params.id} />}
            />
            <Route exact path="/watchlist" component={WatchList} />
          </div>
        </BrowserRouter>
      );
    }
  }
}
export default App;
//render(<App />, document.getElementById("root"));
