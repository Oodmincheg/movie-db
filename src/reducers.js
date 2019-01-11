import {
  //SET_SEARCH_STRING,
  ADD_ALL_GENRES,
  ADD_RECOMENDATIONS,
  ADD_MOVIE_DETAILS,
  ADD_POPULAR_MOVIES
} from "./actions";
import { combineReducers } from "redux";
import { searchString } from "./actionCreators";

/*const searchString = (state = "", action) => {
  //return Object.assign({}, state, { searchString: action.payload });
  if (action.type === SET_SEARCH_STRING) {
    return action.payload;
  }
  return state;
};*/

const allGenres = (state = [], action) => {
  if (action.type === ADD_ALL_GENRES) {
    return action.payload.genres;
  }
  return state;
};

const recomendations = (state = [], action) => {
  if (action.type === ADD_RECOMENDATIONS) {
    return action.payload.results;
  }
  return state;
};

const movieDetails = (state = {}, action) => {
  if (action.type === ADD_MOVIE_DETAILS) {
    return action.payload;
  }
  return state;
};

const popularMovies = (state = [], action) => {
  if (action.type === ADD_POPULAR_MOVIES) {
    return state.concat(action.payload);
  }
  return state;
};
const page = (state = 1, action) => {
  console.log("AAAAAA");
  if (action.type === ADD_POPULAR_MOVIES) {
    return state + 1;
  }
  return state;
};
const rootReducer = combineReducers({
  searchString,
  allGenres,
  recomendations,
  movieDetails,
  popularMovies,
  page
});

export default rootReducer;
