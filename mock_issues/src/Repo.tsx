import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import { supabase } from "./Client";
import styled from "styled-components";

// import store from "./store/store";
import { useSelector } from "react-redux";
// import { StateType } from "./reducer/actionList";

// import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import { Provider } from "react-redux";

function Repo() {
	const token = JSON.parse(window.localStorage.getItem("supabase.auth.token"));
	const [repolist, setrepolist] = useState([]);
	// const username = ${token.currentSession.user.user_metadata.user_name}

	useEffect(() => {
		async function getRepos() {
			const res = await fetch(
				`https://api.github.com/user/repos?visibility=all`,
				{
					method: `GET`,
					headers: new Headers({
						Authorization: "Bearer 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",
					}),
				}
			);
			const resjson = await res.json();
			console.log(resjson);
			setrepolist(resjson);
		}
		getRepos();
	}, []);

	return (
		<>
			{token ? (
				<>
					{/* <h1>{token.currentSession.user.user_metadata.user_name}</h1> */}
					<RepoListBox>
						{repolist.map((element) => (
							<RepoBox>
								<RepoA>{element.name}</RepoA>
								<VisibilityTag>{element.visibility}</VisibilityTag>
							</RepoBox>
						))}
					</RepoListBox>

					{/* <button onClick={async () => getRepos()}>list all repos</button> */}
				</>
			) : (
				<></>
			)}
		</>
	);
}

export default Repo;

const RepoBox = styled.div`
	height: 60px;
	border-top: 1px solid #000;
	padding-top: 5px;

	&:last-child {
		border-bottom: 1px solid #000;
	}
`;

const RepoA = styled.a`
	font-size: 20px;
	color: #58a6ff;
	text-decoration: none;
	font-weight: 600;
	cursor: pointer;
`;

const VisibilityTag = styled.span`
	display: inline-block;
	padding: 0 7px;
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	white-space: nowrap;
	border: 1px solid #8b949e;
	border-radius: 2em;
	color: #8b949e;
	margin-left: 12px;
`;

const RepoListBox = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 80%;
	margin-top: 50px;
`;
