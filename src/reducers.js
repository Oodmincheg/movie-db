import { SET_SEARCH_STRING } from "./actions";

const DEFAULT_STATE = {
  searchString: ""
};

const setSerchString = (state, action) => {
  //return Object.assign({}, state, { searchString: action.payload });
  return { ...state, searchString: action.payload };
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_STRING:
      return setSerchString(state, action);
    default:
      return state;
  }
};

export default rootReducer;
