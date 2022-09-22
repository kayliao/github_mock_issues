import styled from "styled-components";
import { useEffect } from "react";
import { RootState } from "../../store/store";

import github from "../../utils/github";
import { useDispatch, useSelector } from "react-redux";
import {
	userActionTypes,
	userStateType,
	userType,
} from "../../reducer/userReducer";
import { sessionActionTypes } from "../../reducer/sessionReducer";

import { MarkGithubIcon } from "@primer/octicons-react";

function Header() {
	const dispatch = useDispatch();
	const user = useSelector<RootState>((state) => state.userStore["user"]);

	useEffect(() => {
		async function checkUser() {
			const result = await github.checkUser();

			console.log(result);
			dispatch({
				type: userActionTypes.SET_USER_INFO,
				payload: { userInfo: result.user },
			});
			dispatch({
				type: sessionActionTypes.SET_SESSION_INFO,
				payload: { sessionInfo: result.session },
			});
		}

		checkUser();
		window.addEventListener("hashchange", function () {
			checkUser();
		});
	}, []);

	async function handleSignInClick() {
		await github.signInWithGithub();
	}

	async function handleSignOutClick() {
		const result = await github.signOut();

		console.log("signout", result);

		dispatch({
			type: userActionTypes.SET_USER_INFO,
			payload: { userInfo: null },
		});
		dispatch({
			type: sessionActionTypes.SET_SESSION_INFO,
			payload: { sessionInfo: null },
		});
	}

	console.log(user);
	return (
		<HeaderBox>
			<GitHubIcon size={42} fill="#fff" />
			<Title>GitHub Issues</Title>

			{user ? (
				<>
					<AvartarImg
						alt="profile_picture"
						src={(user as userType).identities[0].identity_data.avatar_url}
					/>
					<SignOut onClick={handleSignOutClick}>Sign Out</SignOut>
				</>
			) : (
				<SignIn onClick={handleSignInClick}>Sign In</SignIn>
			)}
		</HeaderBox>
	);
}

export default Header;

const HeaderBox = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	height: 60px;
	background-color: #000000;
	z-index: 2;
	display: flex;
	align-items: center;
`;
const GitHubIcon = styled(MarkGithubIcon)`
	margin-left: 20px;
`;

const Title = styled.h1`
	color: #fff;
	margin-left: 50px;
	font-size: 26px;
	font-weight: bold;
`;

const SignInA = styled.a`
	position: absolute;
	right: 20px;
	cursor: pointer;
	color: #fff;
	text-decoration: none;
`;

const SignIn = styled.div`
	position: absolute;
	right: 20px;
	cursor: pointer;
	color: #fff;
	text-decoration: none;
`;

const SignOut = styled.div`
	position: absolute;
	right: 20px;
	cursor: pointer;
	color: #fff;
	text-decoration: none;
`;

const AvartarImg = styled.img`
	position: absolute;
	right: 100px;
	border-radius: 50%;
	width: 42px;
	height: auto;
`;
