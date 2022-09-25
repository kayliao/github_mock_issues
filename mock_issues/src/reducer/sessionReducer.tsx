import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	session: null,
	token: null,
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

// module.exports.supaBaseInfoActions = supaBaseInfoSlice.actions

// const sessionActionTypes = {
// 	SET_SESSION_INFO: "SET_SESSION_INFO",
// 	SET_SESSION_TOKEN: "SET_SESSION_TOKEN",
// };

// const initialState = {
// 	session: null,
// 	token: null,
// };

// function sessionReducer(state = initialState, action) {
// 	switch (action.type) {
// 		case sessionActionTypes.SET_SESSION_INFO: {
// 			const newSession = action.payload.sessionInfo;
// 			state.session = newSession;
// 			return state;
// 			// return { session: newSession };
// 		}
// 		case sessionActionTypes.SET_SESSION_TOKEN: {
// 			const newSessionToken = action.payload.sessionToken;
// 			state.token = newSessionToken;
// 			return state;
// 			// return { session: newSession };
// 		}
// 		default: {
// 			return state;
// 		}
// 	}
// }

// export { sessionActionTypes, sessionReducer };
