import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	repoInfo: null,
};

const currentRepoInfoSlice = createSlice({
	name: "currentRepoInfo",
	initialState,
	reducers: {
		setCurrentRepoInfo: (state, action) => {
			state.repoInfo = action.payload.repoInfo;
		},
	},
});

const currentRepoInfoReducer = currentRepoInfoSlice.reducer;
const currentRepoInfoActions = currentRepoInfoSlice.actions;

export { currentRepoInfoActions, currentRepoInfoReducer };
