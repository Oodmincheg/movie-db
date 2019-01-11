import { combineReducers } from "redux";
import {
  searchString,
  allGenres,
  recomendations,
  movieDetails,
  popularMovies,
  page
} from "./actionsAndReducers";

const rootReducer = combineReducers({
  searchString,
  allGenres,
  recomendations,
  movieDetails,
  popularMovies,
  page
});

export default rootReducer;
