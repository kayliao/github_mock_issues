import { githubApiSlice } from "../api/githubApiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { supaBaseInfoReducer } from "../reducer/supaBaseReducer";
import { currentRepoInfoReducer } from "reducer/currentRepoInfoReducer";

const store = configureStore({
	reducer: {
		[githubApiSlice.reducerPath]: githubApiSlice.reducer,
		supaBaseInfo: supaBaseInfoReducer,
		currentRepoInfo: currentRepoInfoReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(githubApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
