import styled from "styled-components";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import ButtonShare from "../../stories/Iconsstories/ButtonShare";
import LabelActionBox from "./LabelActionBox";
import { useState } from "react";
import Label from "../../stories/Iconsstories/Label";

type GitLabelDataType = {
	color?: string;
	default?: boolean;
	description?: boolean;
	id?: number;
	name?: string;
	node_id?: string;
	url?: string;
};

export default function LabelItem({
	gitLabelData,
	deleteAction,
	gitInfo,
	updateAction,
}) {
	const [editClick, setEditClick] = useState(false);
	const [sortClick, setSortClick] = useState(false);
	const [summaryClick, setSummaryClick] = useState(false);

	function lightOrDark(bgcolor) {
		if (bgcolor.length === 7) {
			const r = parseInt(bgcolor.slice(1, 3), 16);
			const g = parseInt(bgcolor.slice(3, 5), 16);
			const b = parseInt(bgcolor.slice(5, 7), 16);
			const hsp = r * 0.3 + g * 0.6 + b * 0.1;
			if (hsp > 127.5) {
				return "#000000";
			} else {
				return "#ffffff";
			}
		} else if (bgcolor.length === 4) {
			const r = parseInt(bgcolor.slice(1, 2) + bgcolor.slice(1, 2), 16);
			const g = parseInt(bgcolor.slice(2, 3) + bgcolor.slice(2, 3), 16);
			const b = parseInt(bgcolor.slice(3, 4) + bgcolor.slice(3, 4), 16);
			const hsp = r * 0.3 + g * 0.6 + b * 0.1;
			if (hsp > 127.5) {
				return "#000000";
			} else {
				return "#ffffff";
			}
		}
		if (bgcolor === "#ffff" || "#0000") return "#000000";
	}

	return editClick ? (
		<WrapperBox>
			<WrapperItemBox>
				<ActionSummaryButton
					isClicked={sortClick}
					onClick={() => setSortClick((prev) => !prev)}
				>
					<NewKebabHorizontalIcon fill={sortClick ? "#fff" : "#57606a"} />
				</ActionSummaryButton>
				{/* <ActionSortButtonBox>
					<Button
						textColor={sortClick ? "#24292f" : "ffffff"}
						backgroundColor={sortClick ? "#0969da" : "#f6f8fa"}
						textSize="14px"
						displayText="..."
						borderColor="rgba(27, 36, 31, 0.15)"
						hoverColor="#ffffff"
						hoverBorderColor="#0969da"
						isAble={true}
						onClickFunc={() => setSortClick((prev) => !prev)}
					/>
				</ActionSortButtonBox> */}
				<ReviseMenuDelete display={sortClick ? "block" : "none"}>
					<ReviseMenuContainer>
						<ReviseMenuBtn
							onClick={() => {
								setSortClick(false);
								deleteAction();
							}}
						>
							Delete
						</ReviseMenuBtn>
					</ReviseMenuContainer>
				</ReviseMenuDelete>
			</WrapperItemBox>
			<ActionBoxButton
				onClick={() => {
					setSortClick(false);
					deleteAction();
				}}
			>
				Delete
			</ActionBoxButton>
			<LabelActionBox
				show={editClick}
				cancelAction={() => setEditClick(false)}
				typeName={"Save Changes"}
				gitInfo={gitInfo}
				typeAction={updateAction}
				labelName={gitLabelData.name}
				labeldescription={gitLabelData.description}
				labelcolor={`#${gitLabelData.color}`}
			/>
		</WrapperBox>
	) : (
		<>
			<ListItemInnerBox>
				{/* <LabelA
					labelcolor={`#${gitLabelData.color}`}
					wordcolor={lightOrDark(`#${gitLabelData.color}`)}
				>
					{gitLabelData.name}
				</LabelA> */}
				<LabelTagBox>
					<Label
						backgroundColor={`#${gitLabelData.color}`}
						labelName={gitLabelData.name}
					/>
				</LabelTagBox>

				<LabelDescipition>{gitLabelData.description}</LabelDescipition>

				<LabelIssueDescription>
					dajsfpoisdjfoiasdjfaoisdfjierpijp
				</LabelIssueDescription>
				<WrapperItemBox>
					<SummaryButton
						isClicked={sortClick}
						onClick={() => setSortClick((prev) => !prev)}
					>
						<NewKebabHorizontalIcon fill={sortClick ? "#fff" : "#57606a"} />
					</SummaryButton>
					<ReviseMenu display={sortClick ? "block" : "none"}>
						<ReviseMenuContainer>
							<ReviseMenuBtn onClick={() => setEditClick(true)}>
								Edit
							</ReviseMenuBtn>
							<ReviseMenuBtn
								onClick={() => {
									setSortClick(false);
									deleteAction();
								}}
							>
								Delete
							</ReviseMenuBtn>
						</ReviseMenuContainer>
					</ReviseMenu>
					<ActionButton onClick={() => setEditClick(true)}>Edit</ActionButton>
					<ActionButton
						onClick={() => {
							setSortClick(false);
							deleteAction();
						}}
					>
						Delete
					</ActionButton>
				</WrapperItemBox>
			</ListItemInnerBox>
		</>
	);
}
const LabelTagBox = styled.div`
	@media screen and (min-width: 768px) {
		width: 24.99999997%;
	}
`;

// const LabelDescritptionBox = styled.div`
// 	display: none;
// 	word-wrap: break-word;
// 	width: 33.33333332%;

// 	@media screen and (min-width: 768px) {
// 		width: 33.33333332%;
// 		display: block;
// 		// display: flex;
// 		// flex-wrap: wrap;
// 		// flex-flow: row wrap;
// 	}
// `;

const WrapperBox = styled.div`
	position: relative;
`;
const ActionBoxButton = styled.button`
	display: none;
	z-index: 1;
	&:hover {
		text-decoration: underline;
		color: #0969da;
	}
	@media screen and (min-width: 1012px) {
		position: absolute;
		display: block;
		margin-left: 16px;
		color: #57606a;
		display: inline-block;
		padding: 0;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		font-size: 12px;
		appearance: none;
		user-select: none;
		background-color: transparent;
		border: 0;
		top: 5px;
		right: 0;
	}
`;
const ActionSummaryButton = styled.button<PropsTypes>`
	position: absolute;
	right: 0;
	background-color: #f6f8fa;
	color: #57606a;
	border: none;
	padding: 0;
	cursor: pointer;
	outline: inherit;
	padding: 3px 12px;
	line-height: 20px;
	border: 1px solid rgba(27, 36, 31, 0.15);
	border-radius: 6px;
	vertical-align: text-top;
	background-color: ${(props: PropsTypes) =>
		props.isClicked ? "#0969da" : "#f6f8fa"};
	@media screen and (min-width: 1012px) {
		display: none;
	}
	&:hover {
		background-color: #0969da;
	}
`;

const ActionSortButtonBox = styled.div`
	position: absolute;
	right: 0;
	vertical-align: text-top;

	@media screen and (min-width: 1012px) {
		display: none;
	}
`;

const NewKebabHorizontalIcon = styled(KebabHorizontalIcon)`
	&:hover {
		fill: #fff;
	}
`;

const ListItemInnerBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const LabelA = styled.a`
	white-space: nowrap;
	padding: 0 10px;
	font-size: 12px;
	font-weight: 500;
	line-height: 22px;
	border: 1px solid transparent;
	border-radius: 2em;
	font-weight: 500;
	background-color: ${(props: PropsTypes) => props.labelcolor};
	color: ${(props: PropsTypes) => props.wordcolor};
`;

type PropsTypes = {
	labelcolor?: string;
	wordcolor?: string;
	isClicked?: boolean;
};

const SummaryButton = styled.button`
	color: #57606a;
	border: none;
	padding: 0;
	cursor: pointer;
	outline: inherit;
	padding: 3px 12px;
	line-height: 20px;
	border: 1px solid rgba(27, 36, 31, 0.15);
	border-radius: 6px;
	vertical-align: text-top;
	background-color: ${(props: PropsTypes) =>
		props.isClicked ? "#0969da" : "#f6f8fa"};

	@media screen and (min-width: 1012px) {
		display: none;
	}

	&:hover {
		background-color: #0969da;
	}

	// &:focus {
	// 	background-color: #0969da;
	// }
`;

const LabelDescipition = styled.span`
	display: none;
	word-wrap: break-word;

	@media screen and (min-width: 768px) {
		width: 33.33333332%;
		display: inline-block;
		font-size: 12px;
		color: #57606a;
	}
	@media screen and (min-width: 768px) {
		width: 33.33333332%;
	}
`;

const LabelIssueDescription = styled.a`
	cursor: pointer;
	display: none;
	word-wrap: break-word;

	&:hover {
		color: #0969da;
	}
	@media screen and (min-width: 768px) {
		display: inline-block;
		font-size: 12px;
		color: #57606a;
		width: 24.99999999%;
	}
`;

const WrapperItemBox = styled.div`
	position: relative;
`;

const ActionButton = styled.button`
	display: none;
	&:hover {
		text-decoration: underline;
		color: #0969da;
	}
	@media screen and (min-width: 1012px) {
		display: block;
		margin-left: 16px;
		color: #57606a;
		display: inline-block;
		padding: 0;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		font-size: 12px;
		appearance: none;
		user-select: none;
		background-color: transparent;
		border: 0;
	}
`;

//.....................
const ReviseMenu = styled.div<DisplayProps>`
	width: 158px;
	margin-top: 2px;
	padding: 0 4px;
	line-height: 1.5;
	position: absolute;
	font-size: 12px;
	top: 100%;
	right: 0;
	z-index: 1;

	display: ${(props) => props.display};

	@media screen and (min-width: 1012px) {
		display: none;
	}
`;

const ReviseMenuDelete = styled.div<DisplayProps>`
	width: 158px;
	margin-top: 2px;
	padding: 0 4px;
	line-height: 1.5;
	position: absolute;
	font-size: 12px;
	top: 27px;
	right: 0;
	z-index: 1;

	display: ${(props) => props.display};

	@media screen and (min-width: 1012px) {
		display: none;
	}
`;

const ReviseMenuContainer = styled.div`
	width: 160px;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	color: #24292f;
	border: 1px solid #d0d7de;
	margin-top: 2px;
	padding-top: 4px;
	padding-bottom: 4px;
	line-height: 1.5;
	box-shadow: 0 8px 24px rgba(140, 149, 159, 20%);
	border-radius: 6px;

	&::after {
		top: -10.7px;
		right: 10px;
		left: auto;
		border: 7px solid transparent;
		position: absolute;
		display: inline-block;
		border-bottom-color: #fff;
		content: "";
	}
	&::before {
		top: -12px;
		right: 10px;
		left: auto;
		border: 7px solid transparent;
		position: absolute;
		display: inline-block;
		border-bottom-color: #d0d7de;
		content: "";
	}
`;
const ReviseMenuBtn = styled.button`
	text-align: left;
	background-color: transparent;
	border: none;
	padding: 4px 8px 4px 16px;
	justify-content: flex-end;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 100%;
	cursor: pointer;
	&:hover {
		background-color: #0969da;
		color: #fff;
	}

	@media screen and (min-width: 1012px) {
		display: none;
	}
`;

type DisplayProps = {
	display: string;
};
