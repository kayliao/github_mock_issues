import { createStore, combineReducers } from "redux";
import { userReducer } from "../reducer/userReducer";
import { sessionReducer } from "../reducer/sessionReducer";

const infoReducerCombine = combineReducers({
	userStore: userReducer,
	sessionStore: sessionReducer,
});

const store = createStore(infoReducerCombine);

type RootState = ReturnType<typeof store.getState>;

export default store;
export { RootState };
