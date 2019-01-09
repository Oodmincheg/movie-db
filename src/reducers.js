import {
  SET_SEARCH_STRING,
  ADD_ALL_GENRES,
  ADD_RECOMENDATIONS
} from "./actions";
import { combineReducers } from "redux";

const searchString = (state = "", action) => {
  //return Object.assign({}, state, { searchString: action.payload });
  if (action.type === SET_SEARCH_STRING) {
    return action.payload;
  }
  return state;
};

const allGenres = (state = [], action) => {
  if (action.type === ADD_ALL_GENRES) {
    return action.payload.genres;
  }
  return state;
};

const recomendations = (state = [], action) => {
  if (action.type === ADD_RECOMENDATIONS) {
    console.log("data-hyata???", action.payload);
    return action.payload.results;
  }
  return state;
};
const rootReducer = combineReducers({
  searchString,
  allGenres,
  recomendations
});

export default rootReducer;
