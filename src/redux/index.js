import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./root_reducer";

const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
