const userActionTypes = {
	SET_USER_INFO: "SET_USER_INFO",
};

const initialState = {
	// user: (() => {
	// 	async function checkUser() {
	// 		const result = await github.checkUser;
	// 		return result;
	// 	}
	// 	return checkUser();
	// })(),
	user: null,
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case userActionTypes.SET_USER_INFO: {
			const newUser = action.payload.userInfo;
			return { user: newUser };
		}
		default: {
			return state;
		}
	}
}

export { userActionTypes, userReducer };
