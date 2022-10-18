const userActionTypes = {
	SET_USER_INFO: "SET_USER_INFO",
};

const initialState = {
	user: null,
};

type identityDataType = {
	avatar_url: string;
};

type identityObject = {
	identity_data: identityDataType;
};

type identityType = [identityObject];

type userType = {
	identities: identityType;
};

type userStateType = {
	user: null | userType;
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

export { userActionTypes, userReducer, userStateType, userType };
