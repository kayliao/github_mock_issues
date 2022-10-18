import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: JSON.parse(window.localStorage.getItem("supabaseUser")) ?? null,
	session: JSON.parse(window.localStorage.getItem("supabaseSession")) ?? null,
	token: window.localStorage.getItem("provider_token") ?? null,
};

const supaBaseInfoSlice = createSlice({
	name: "supaBaseInfo",
	initialState,
	reducers: {
		setuser: (state, action) => {
			state.user = action.payload.userInfo;
		},
		setsession: (state, action) => {
			state.session = action.payload.sessionInfo;
		},
		settoken: (state, action) => {
			state.token = action.payload.sessionToken;
		},
	},
});

const supaBaseInfoReducer = supaBaseInfoSlice.reducer;
const supaBaseInfoActions = supaBaseInfoSlice.actions;

export { supaBaseInfoActions, supaBaseInfoReducer };
