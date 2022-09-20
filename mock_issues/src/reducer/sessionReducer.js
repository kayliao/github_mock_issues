const sessionActionTypes = {
	SET_SESSION_INFO: "SET_SESSION_INFO",
};

const initialState = {
	session: null,
};

function sessionReducer(state = initialState, action) {
	switch (action.type) {
		case sessionActionTypes.SET_SESSION_INFO: {
			const newSession = action.payload.sessionInfo;
			return { session: newSession };
		}
		default: {
			return state;
		}
	}
}

export { sessionActionTypes, sessionReducer };
