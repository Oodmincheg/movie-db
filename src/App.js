import React from "react";
import PopularMovies from "./PopularMovies";
import { HashRouter, Route } from "react-router-dom";
import MoviePage from "./MoviePage";
import WatchList from "./WatchList";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" render={() => <PopularMovies />} />
          <Route
            exact
            path="/movie/:id"
            render={props => <MoviePage movieId={props.match.params.id} />}
          />
          <Route exact path="/watchlist" component={WatchList} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
