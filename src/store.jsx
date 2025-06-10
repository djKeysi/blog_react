import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { userReducer, usersReducer, postReducer, postsReducer } from './reducers';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
});

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnchancers(applyMiddleware(thunk)));
