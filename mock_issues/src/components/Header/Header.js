import styled from "styled-components";
import { useEffect, useState } from "react";

import { MarkGithubIcon, LogoGithubIcon } from "@primer/octicons-react";
import { supabase } from "../../Client";

function Header() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		/* when the app loads, check to see if the user is signed in */
		checkUser();
		/* check user on OAuth redirect */
		window.addEventListener("hashchange", function () {
			checkUser();
		});
	}, []);
	async function checkUser() {
		/* if a user is signed in, update local state */
		const user = supabase.auth.user();
		setUser(user);
		const session = supabase.auth.session();
		console.log(session);
	}
	async function signInWithGithub() {
		/*authenticate with GitHub */
		const { user, session, error } = await supabase.auth.signIn(
			{
				provider: "github",
			},
			{
				scopes: "repo gist notifications",
			}
		);
		const oAuthToken = session.provider_token;
		console.log(oAuthToken);
	}
	async function signOut() {
		/* sign the user out */
		await supabase.auth.signOut();
		setUser(null);
	}
	// if (user) {
	// 	return (
	// 		<div className="App">
	// 			<h1>Hello, {user.email}</h1>
	// 			<button onClick={signOut}>Sign out</button>
	// 		</div>
	// 	);
	// }
	if (user) {
		console.log(user);
	}

	return (
		<HeaderBox>
			<GitHubIcon size={42} fill="#fff" />
			<Title>GitHub Issues</Title>
			{/* <SignInA href="https://github.com/login/oauth/authorize?client_id=824b5f821175b91c7dfb&scope=repo">
				Sign In
			</SignInA> */}
			{user ? (
				<>
					<AvartarImg
						alt="profile_picture"
						src={user.identities[0].identity_data.avatar_url}
					/>
					<SignOut onClick={signOut}>Sign Out</SignOut>
				</>
			) : (
				<SignIn onClick={signInWithGithub}>Sign In</SignIn>
			)}
		</HeaderBox>
	);
}

export default Header;

const HeaderBox = styled.div`
	width: 100%;
	height: 60px;
	background-color: #000000;
	z-index: -1;
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
