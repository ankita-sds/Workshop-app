import { createStore, applyMiddleware } from "redux";
import themeReducer from "./reducers/themeReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './middleware/logger'

const store = createStore( themeReducer, composeWithDevTools( applyMiddleware(logger) ) );

export default store;