import styled from "styled-components";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import Button from "../../stories/Iconsstories/Button";
import LabelActionBox from "./LabelActionBox";
import { useState } from "react";

export default function LabelItem() {
	const [editClick, setEditClick] = useState(false);
	const [sortClick, setSortClick] = useState(false);
	const [summaryClick, setSummaryClick] = useState(false);

	return editClick ? (
		<WrapperBox>
			<WrapperItemBox>
				<ActionSummaryButton
					isClicked={sortClick}
					onClick={() => setSortClick((prev) => !prev)}
				>
					<NewKebabHorizontalIcon />
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
						<ReviseMenuBtn>Delete</ReviseMenuBtn>
					</ReviseMenuContainer>
				</ReviseMenuDelete>
			</WrapperItemBox>
			<ActionBoxButton>Delete</ActionBoxButton>
			<LabelActionBox
				show={editClick}
				cancelAction={() => setEditClick(false)}
				typeName={"Save Changes"}
			/>
		</WrapperBox>
	) : (
		<>
			<ListItemInnerBox>
				<LabelA labelcolor="#d73a4a" wordcolor="#fff">
					bug
				</LabelA>
				<LabelDescipition>
					kasljf sdajfoj aposdjoja lpsdjfodjsapofjoidsajfopja
				</LabelDescipition>
				<LabelIssueDescription>
					dajsfpoisdjfoiasdjfaoisdfjierpijp
				</LabelIssueDescription>
				<WrapperItemBox>
					<SummaryButton
						isClicked={sortClick}
						onClick={() => setSortClick((prev) => !prev)}
					>
						<NewKebabHorizontalIcon />
					</SummaryButton>
					<ReviseMenu display={sortClick ? "block" : "none"}>
						<ReviseMenuContainer>
							<ReviseMenuBtn>Edit</ReviseMenuBtn>
							<ReviseMenuBtn>Delete</ReviseMenuBtn>
						</ReviseMenuContainer>
					</ReviseMenu>
					<ActionButton onClick={() => setEditClick(true)}>Edit</ActionButton>
					<ActionButton>Delete</ActionButton>
				</WrapperItemBox>
			</ListItemInnerBox>
		</>
	);
}

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
		font-size: inherit;
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

	&:focus {
		background-color: #0969da;
	}
`;

const LabelDescipition = styled.span`
	display: none;
	@media screen and (min-width: 768px) {
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
		font-size: inherit;
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
	width: 158px;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	color: #24292f;
	border-color: #d0d7de;
	margin-top: 2px;
	padding: 0 4px;
	line-height: 1.5;
	box-shadow: 0 8px 24px rgba(140, 149, 159, 20%);
	border-radius: 6px;

	&::after {
		top: -12px;
		right: 10px;
		left: auto;
		border: 7px solid transparent;
		position: absolute;
		display: inline-block;
		border-bottom-color: #fff;
		content: "";
	}
`;
const ReviseMenuBtn = styled.button`
	text-align: start;
	background-color: transparent;
	border: none;
	padding: 4px 8px 4px 16px;
	justify-content: flex-end;

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
