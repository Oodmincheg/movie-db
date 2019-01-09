import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default store;
