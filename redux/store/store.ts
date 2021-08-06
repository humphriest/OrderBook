import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { orderBookReducer } from "../orderBook/orderBookReducer";

const allReducers = {
  orderStateReducer: orderBookReducer,
};
const reducers = combineReducers<IState>(allReducers);
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
