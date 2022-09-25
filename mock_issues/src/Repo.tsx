import { useEffect, useState } from "react";
import { RootState } from "./store/store";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { currentRepoInfoActions } from "./reducer/currentRepoInfoReducer";

function Repo() {
	// const token = useSelector<RootState>(
	// 	(state) => state.sessionStore["session"]?.provider_token
	// );
	// const token = useSelector<RootState>((state) => state.sessionStore.token);
	const dispatch = useDispatch();

	const token = useSelector((state: RootState) => state.supaBaseInfo.token);
	const user = useSelector((state: RootState) => state.supaBaseInfo.user);

	console.log(token);
	console.log(user);

	const [repolist, setrepolist] = useState([]);

	useEffect(() => {
		async function getRepos() {
			const res = await fetch(
				`https://api.github.com/user/repos?visibility=all`,
				{
					method: `GET`,
					headers: new Headers({
						Authorization: `Bearer ${token}`,
					}),
				}
			);
			const resjson = await res.json();
			console.log(resjson);
			setrepolist(resjson);
		}
		if (token) getRepos();
	}, [token]);

	function getTime(time) {
		const formattedDate = new Date(time);

		formattedDate.toLocaleString("default", { month: "short" });

		return formattedDate.toLocaleString("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	}

	return (
		<>
			{token && user ? (
				<>
					<RepoListBox>
						{repolist.map((element) => (
							<RepoBox>
								<RepoA
									onClick={() => {
										window.scrollTo({
											top: 0,
											behavior: "smooth",
										});
										dispatch(
											currentRepoInfoActions.setCurrentRepoInfo({
												repoInfo: element,
											})
										);

										// if (navigateCallback) navigateCallback(navigateUrl);
									}}
									to={`/${element.full_name}/labels`}
								>
									{element.name}
								</RepoA>
								<VisibilityTag>{element.visibility}</VisibilityTag>
								<UpdateTime>
									{`Updated on `}
									{getTime(element.updated_at)}
								</UpdateTime>
							</RepoBox>
						))}
					</RepoListBox>
				</>
			) : (
				<WelcomeBox>
					<h1>
						Welcome to GitHub Issues
						<br />
						Please Sign In
					</h1>
				</WelcomeBox>
			)}
		</>
	);
}

export default Repo;

const WelcomeBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 40px;
	font-weight: 600;
	text-align: center;
`;

const RepoBox = styled.div`
	height: 100px;
	border-top: 1px solid #000;
	padding-top: 15px;
	position: relative;

	&:last-child {
		border-bottom: 1px solid #000;
	}
`;

const RepoA = styled(Link)`
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
	margin-top: 20px;
	margin-bottom: 50px;
`;

const UpdateTime = styled.div`
	font-size: 12px;
	color: #57606a;
	position: absolute;
	bottom: 15px;
`;
