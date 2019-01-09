import {
  SET_SEARCH_STRING,
  ADD_ALL_GENRES,
  ADD_RECOMENDATIONS
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
