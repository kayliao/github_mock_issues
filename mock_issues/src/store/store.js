import { createStore, combineReducers } from "redux";
import { userReducer } from "../reducer/userReducer";
import { sessionReducer } from "../reducer/sessionReducer";

const infoReducerCombine = combineReducers({
	userStore: userReducer,
	sessionStore: sessionReducer,
});

const store = createStore(infoReducerCombine);

export default store;
