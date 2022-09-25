import { createStore, combineReducers } from "redux";
import { userReducer } from "../reducer/userReducer";
// import { sessionReducer } from "../reducer/sessionReducer";
import { githubApiSlice } from "../api/githubApiSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { supaBaseInfoReducer } from "../reducer/supaBaseReducer";

const store = configureStore({
	reducer: {
		[githubApiSlice.reducerPath]: githubApiSlice.reducer,
		supaBaseInfo: supaBaseInfoReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(githubApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

// const infoReducerCombine = combineReducers({
// 	userStore: userReducer,
// 	sessionStore: sessionReducer,
// 	apiStore:githubApiSlice
// });

// const store = createStore(infoReducerCombine);

// type RootState = ReturnType<typeof store.getState>;

// export default store;
// export { RootState };
