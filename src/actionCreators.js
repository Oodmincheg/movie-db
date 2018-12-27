import { SET_SEARCH_STRING } from "./actions";

export function setSearchString(searchString) {
  return { type: SET_SEARCH_STRING, payload: searchString };
}
