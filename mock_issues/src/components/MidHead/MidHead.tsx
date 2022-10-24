import styled from "styled-components";
import { useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	RepoIcon,
	CodeIcon,
	IssueOpenedIcon,
	GitPullRequestIcon,
	PlayIcon,
	TableIcon,
	BookIcon,
	ShieldIcon,
	GraphIcon,
	GearIcon,
} from "@primer/octicons-react";
import e from "express";

const ActionLists = [
	{
		icon: <CodeIcon />,
		text: "Code",
		maxWidth: 115,
		number: 0,
		navigate: "code",
	},
	{
		icon: <IssueOpenedIcon />,
		text: "Issues",
		maxWidth: 211,
		number: 1,
		navigate: "issues",
	},
	{
		icon: <GitPullRequestIcon />,
		text: "Pull requests",
		maxWidth: 323,
		number: 0,
		navigate: "pr",
	},
	{
		icon: <PlayIcon />,
		text: "Actions",
		maxWidth: 398,
		number: 0,
		navigate: "actions",
	},
	{
		icon: <TableIcon />,
		text: "Projects",
		maxWidth: 478,
		maxWidthIcon: 598,
		number: 0,
	},
	{
		icon: <BookIcon />,
		text: "Wiki",
		maxWidth: 531,
		maxWidthIcon: 675,
		number: 0,
	},
	{
		icon: <ShieldIcon />,
		text: "Security",
		maxWidthIcon: 792,
		number: 0,
	},
	{
		icon: <GraphIcon />,
		text: "Insights",
		maxWidthIcon: 896,
		number: 0,
		navigate: "insights",
	},
	{
		icon: <GearIcon />,
		text: "Settings",
		maxWidthIcon: 998,
		number: 0,
		navigate: "settings",
	},
];

export default function MidHead({ username, reponame, visibility }) {
	const [pageId, setPageId] = useState(1);
	const navigate = useNavigate();
	ActionLists[1].number = useSelector(
		(state: RootState) => state?.currentRepoInfo?.repoInfo?.open_issues_count
	);

	return (
		<MidHeadBox>
			<TitleBox>
				<RepoIcon />
				<UserNameTitle
					onClick={(e) => {
						e.preventDefault();
						navigate(`/${username}/repos`);
					}}
				>
					{username}
				</UserNameTitle>
				<DivideLine>/</DivideLine>
				<RepoNameTitle>{reponame}</RepoNameTitle>
				<Visibility>{visibility}</Visibility>
			</TitleBox>
			<ActionsListBoxContainer>
				<ActionsListBox>
					{ActionLists.map((element, index) => {
						return (
							<ActionButtonBox
								underlineDisplay={index === pageId ? true : false}
								onClick={() => {
									navigate(`/${username}/${reponame}/${element.navigate}`);
								}}
							>
								<ActionsIcon>{element.icon}</ActionsIcon>
								<ActionTitle fontweight={index === pageId ? 600 : 400}>
									{element.text}
								</ActionTitle>
								{element.number !== 0 ? (
									<ActionsNumber>
										<span>{element.number}</span>
									</ActionsNumber>
								) : (
									<></>
								)}
							</ActionButtonBox>
						);
					})}
				</ActionsListBox>
			</ActionsListBoxContainer>
		</MidHeadBox>
	);
}

const MidHeadBox = styled.div`
	width: 100%;
	background-color: #f6f8fa;
	height: 91px;
	box-shadow: inset 0 -1px 0 hsla(210, 18%, 87%, 1);
	@media screen and (min-width: 768px) {
		height: 94px;
	}
`;

const TitleBox = styled.div`
	margin-left: 16px;
	margin-right: 16px;
	padding-top: 16px;
	@media screen and (min-width: 768px) {
		margin-left: 24px;
		margin-right: 24px;
	}
	@media screen and (min-width: 1012px) {
		margin-left: 32px;
		margin-right: 32px;
	}
`;

const UserNameTitle = styled.a`
	text-decoration: none;
	color: #0969da;
	font-size: 18px;
	font-weight: 400px;
	margin-left: 8px;
	cursor: pointer;
	@media screen and (min-width: 768px) {
		font-size: 20px;
	}
`;

const DivideLine = styled.span`
	margin-left: 4px;
	margin-right: 4px;

	align-self: stretch;
	color: #57606a;
	font-size: 18px;
	@media screen and (min-width: 768px) {
		font-size: 20px;
	}
`;

const RepoNameTitle = styled.a`
	text-decoration: none;
	color: #0969da;
	font-size: 18px;
	font-weight: 600px;
	font-weight: bold;
	cursor: pointer;

	@media screen and (min-width: 768px) {
		font-size: 20px;
	}
`;

const Visibility = styled.div`
	color: #57606a;
	border-color: #d0d7de;
	display: inline-block;
	padding: 0 7px;
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	white-space: nowrap;
	border: 1px solid #d0d7de;
	border-radius: 2em;
	margin-right: 4px;
	margin-left: 8px;

	border-style: solid;
	vertical-align: middle;
`;

const ActionsListBox = styled.div`
	display: flex;
	min-height: 48px;
	max-height: 48px;
	padding-right: 16px;
	padding-left: 16px;
	overflow-x: auto;
	overflow-y: clip;

	@media screen and (min-width: 768px) {
		padding-right: 24px;
		padding-left: 24px;
	}
	@media screen and (min-width: 1012px) {
		padding-right: 32px;
		padding-left: 32px;
		display: flex;
		align-items: center;
	}
`;
const ActionsIcon = styled.div`
	margin-right: 8px;
`;
const ActionsNumber = styled.div`
	margin-top: 4px;
	padding: 0 6px;
	background-color: rgba(175, 184, 193, 0.2);

	border-radius: 2em;
	text-align: center;
	margin-left: 8px;
	font-size: 12px;
`;
const ActionsListBoxContainer = styled.div`
	max-width: 1054px;
`;
const ActionButtonBox = styled.div`
	white-space: nowrap;
	display: flex;
	margin-right: 20px;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 0 8px;

	&:hover {
		cursor: pointer;
		border-radius: 6px;
		background-color: #eaeef2;
	}

	&::after {
		display: ${(props: PropsType) =>
			props.underlineDisplay ? "block" : "none"};
		position: absolute;
		right: 50%;
		bottom: calc(50% - 25px);
		width: 100%;
		height: 2px;
		content: "";
		background: #fd8c73;
		border-radius: 6px;
		transform: translate(50%, -50%);
	}

	&:last-child {
		margin-right: 0px;
	}
`;

const ActionTitle = styled.span`
	margin-top: 2px;
	font-size: 14px;
	font-weight: ${(props: PropsType) => props.fontweight};
`;

type PropsType = {
	fontweight?: number;
	underlineDisplay?: boolean;
};
