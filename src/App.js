import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import store from "./store";
import MoviePage from "./MoviePage";
import WatchList from "./WatchList";
import PopularMovies from "./PopularMovies";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Provider store={store}>
          <div>
            <Route exact path="/" render={() => <PopularMovies />} />
            <Route
              exact
              path="/movie/:id"
              render={props => <MoviePage movieId={props.match.params.id} />}
            />
            <Route exact path="/watchlist" component={WatchList} />
          </div>
        </Provider>
      </HashRouter>
    );
  }
}

export default App;
