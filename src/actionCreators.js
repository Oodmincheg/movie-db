import {
  SET_SEARCH_STRING,
  ADD_ALL_GENRES,
  ADD_RECOMENDATIONS,
  ADD_MOVIE_DETAILS,
  ADD_POPULAR_MOVIES
} from "./actions";

export function setSearchString(searchString) {
  return { type: SET_SEARCH_STRING, payload: searchString };
}

export function addAllGenres(allGenres) {
  return { type: ADD_ALL_GENRES, payload: allGenres };
}

export function addRecomendations(recomendations) {
  return { type: ADD_RECOMENDATIONS, payload: recomendations };
}

export function addMovieDetails(movieDetails) {
  return { type: ADD_MOVIE_DETAILS, payload: movieDetails };
}
export function addPopularMovies(movies) {
  console.log("MOVIES in actionCreator", movies);
  return { type: ADD_POPULAR_MOVIES, payload: movies };
}

export function getAPIPopularMovies(page) {
  console.log("page in action creator", page);
  const urlPopularMovies =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=98135c4d3cc392347281f8d007876760&language=en-US&page=" +
    page;

  console.log("url", urlPopularMovies);
  return dispatch =>
    fetch(urlPopularMovies)
      .then(res => res.json())
      .then(
        data => {
          dispatch(addPopularMovies(data.results));
        },
        error => {
          console.log(error);
        }
      );
}

export function getAPIGenres() {
  const urlGenres =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=98135c4d3cc392347281f8d007876760&language=en-US";

  return dispatch =>
    fetch(urlGenres)
      .then(res => res.json())
      .then(
        data => {
          dispatch(addAllGenres(data));
        },
        error => {
          console.log(error);
        }
      );
}
export function getAPIRecomendations(id) {
  const urlRecomendation = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=98135c4d3cc392347281f8d007876760&language=en-US&page=1`;
  return dispatch =>
    fetch(urlRecomendation)
      .then(res => res.json())
      .then(
        data => {
          dispatch(addRecomendations(data));
        },
        error => {
          console.log(error);
        }
      );
}

export function getMovieDetails(id) {
  //prettier-ignore
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=98135c4d3cc392347281f8d007876760&language=en-US`;
  return dispatch =>
    fetch(url)
      .then(res => res.json())
      .then(
        data => {
          dispatch(addMovieDetails(data));
        },
        error => {
          console.log(error);
        }
      );
}
