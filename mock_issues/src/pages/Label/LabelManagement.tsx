import styled from "styled-components";
import MidHead from "../../components/MidHead/MidHead";
import NewLabel from "./NewLabel";
import LabelActionBox from "./LabelActionBox";
import LabelItem from "./LabelItem";
import Button from "../../stories/Iconsstories/Button";
import {
	TagIcon,
	MilestoneIcon,
	SearchIcon,
	TriangleDownIcon,
	KebabHorizontalIcon,
	CheckIcon,
} from "@primer/octicons-react";
import { useState } from "react";

export default function LabelManagement() {
	const [editClick, setEditClick] = useState(false);
	const [newLabelClick, setNewLabelClick] = useState(false);
	const [sortClick, setSortClick] = useState(false);

	return (
		<>
			<MidHead />
			<WrapperBox>
				<OtherNavBox>
					<LabelMileStoneBox>
						<ButtonIconLink isSelected={true}>
							<TagIcon />
							<ButtonIconText isSelected={true}>Labels</ButtonIconText>
						</ButtonIconLink>
						<ButtonIconLink isSelected={false}>
							<MilestoneIcon />
							<ButtonIconText isSelected={false}>MileStones</ButtonIconText>
						</ButtonIconLink>
					</LabelMileStoneBox>
					<SearchLabelWrapper>
						<SearchLabelBox>
							<SearchIcon />
							<SearchLabelInput placeholder="Search all labels" />
						</SearchLabelBox>
					</SearchLabelWrapper>
					<ButtonCompoStyle>
						<Button
							textColor="#fff"
							backgroundColor="#2da44e"
							textSize="14px"
							displayText="New label"
							borderColor="rgba(27,31,36,0.15)"
							hoverColor="#2c974b"
							hoverBorderColor="rgba(27,31,36,0.15)"
							isAble={true}
							onClickFunc={() => setNewLabelClick(true)}
						/>
					</ButtonCompoStyle>
				</OtherNavBox>
				<NewLabel
					show={newLabelClick}
					cancelAction={() => setNewLabelClick(false)}
				/>
				<LabelListBox>
					<LabelListBoxHeader>
						<LabelListBoxHeaderSpan>9 labels</LabelListBoxHeaderSpan>
						<SortBox>
							<SortButton onClick={() => setSortClick((prev) => !prev)}>
								<SortButtonA>Sort</SortButtonA>
								<TriangleDownIcon></TriangleDownIcon>
							</SortButton>
							<LabelsList display={sortClick ? "block" : "none"}>
								<SortTitle>Sort</SortTitle>
								<SortListMenu>
									<SortLink href="#/">
										<CheckIcon size={16} />
										<SortText>Alphabetically</SortText>
									</SortLink>
									<SortLink href="#/">
										{/* <CheckIcon size={16} /> */}
										<SortText>Reverse alphabetically</SortText>
									</SortLink>
									<SortLink href="#/">
										{/* <CheckIcon size={16} /> */}
										<SortText>Most issues</SortText>
									</SortLink>
									<SortLink href="#/">
										{/* <CheckIcon size={16} /> */}
										<SortText>Fewest issues</SortText>
									</SortLink>
								</SortListMenu>
							</LabelsList>
						</SortBox>
					</LabelListBoxHeader>
					<ListItemBox>
						<LabelItem />
					</ListItemBox>
					<ListItemBox>
						<LabelItem />
					</ListItemBox>
				</LabelListBox>
			</WrapperBox>
		</>
	);
}
const WrapperBox = styled.div`
	margin-top: 24px;
	padding-left: 16px;
	padding-right: 16px;
	width: 100%;
	@media screen and (min-width: 768px) {
		padding-left: 24px;
		padding-right: 24px;
	}
	@media screen and (min-width: 1012px) {
		padding-left: 32px;
		padding-right: 32px;
	}
	@media screen and (min-width: 1280px) {
		width: 1216px;
		padding-left: 0px;
		padding-right: 0px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const OtherNavBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	position: relative;
`;

const LabelMileStoneBox = styled.div`
	display: flex;
	float: left;
	white-space: nowrap;
`;

const ButtonIconLink = styled.a`
	display: flex;
	align-items: center;
	text-decoration: none;
	font-weight: 500;
	line-height: 20px;
	border: 1px solid #d0d7de;
	border-color: ${(props: isSelectedProps) =>
		props.isSelected ? "#0969da" : "#d0d7de"};
	background-color: ${(props: isSelectedProps) =>
		props.isSelected ? "#0969da" : "#fff"};

	color: ${(props: isSelectedProps) => (props.isSelected ? "#fff" : "#24292f")};
	padding: 5px 16px;

	&:first-child {
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
		border-right-color: transparent;
	}
	&:last-child {
		border-top-right: 1px solid #000;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
	}
`;

const ButtonIconText = styled.span`
	color: ${(props: isSelectedProps) => (props.isSelected ? "#fff" : "#24292f")};
	padding: 0px 6px;
	padding-top: 2px;
`;

type isSelectedProps = {
	isSelected: boolean;
};

const SearchLabelWrapper = styled.div`
	flex-basis: 100%;
	@media screen and (min-width: 768px) {
		flex-basis: 0%;
	}
`;

const SearchLabelBox = styled.div`
	background-color: #f6f8fa;
	padding: 5px 8px;
	font-size: 14px;
	border-radius: 6px;
	border: 1px solid #d0d7de;
	width: 320px;
	height: 32px;
	margin-left: 0px;
	margin-right: 24px;
	margin-top: 16px;
	@media screen and (min-width: 768px) {
		margin-left: 8px;
		margin-top: 0px;
	}
`;
const SearchLabelInput = styled.input`
	background-color: #f6f8fa;
	border: none;
	color: #57606a;
	width: 280px;
`;

const NewLabelButton = styled.button`
	color: #fff;
	background-color: #238636;
	border-color: rgba(240, 246, 252, 0.1);
	border: 1px solid;
	border-radius: 6px;
	padding: 5px 16px;
	font-size: 14px;
	font-weight: 500;
	line-height: 20px;
	white-space: nowrap;
	vertical-align: middle;
	cursor: pointer;
	position: absolute;
	right: 0px;
`;

const LabelListBox = styled.div`
	background-color: #fff;
	border-color: #d0d7de;
	border-style: solid;
	border-width: 1px;
	border-radius: 6px;
	margin-top: 20px;
`;

const LabelListBoxHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 16px;
	margin: -1px -1px 0;
	background-color: #f6f8fa;
	border-color: #d0d7de;
	border-style: solid;
	border-width: 1px;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
	border-bottom: none;
`;

const LabelListBoxHeaderSpan = styled.span`
	color: #24292f;
	font-size: 14px;
	font-weight: 600;
`;

const SortButton = styled.button`
	background: none;
	color: #57606a;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`;

const SortButtonA = styled.a`
	font-size: 14px;
	&:hover {
		text-decoration: underline;
	}
`;

const SortBox = styled.div`
	position: relative;
`;

const ListItemBox = styled.div`
	border-top-color: transparent;
	//display: flex;
	padding: 16px;
	// justify-content: space-between;
	border-color: #d0d7de;
	border-style: solid;
	border-top-width: 1px;
	// align-items: center;
	&:first-child {
		border-top-width: 0px;
		border: none;
	}
`;

const ButtonCompoStyle = styled.div`
	position: absolute;
	right: 0px;
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
	background-color: ${(props: LabelAProps) => props.labelcolor};
	color: ${(props: LabelAProps) => props.wordcolor};
`;

type LabelAProps = {
	labelcolor: string;
	wordcolor: string;
};

const SummaryButton = styled.button`
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
	@media screen and (min-width: 1012px) {
		display: none;
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

const WrapperItemBox = styled.div``;

//...................
type DisplayProps = {
	display: string;
};
const Container = styled.div`
	position: relative;
`;
const Labels = styled.div`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
	&::after {
		display: inline-block;
		border: 4px solid;
		vertical-align: -2px;
		content: "";
		border-right-color: transparent;
		border-bottom-color: transparent;
		border-left-color: transparent;
		margin-left: 4px;
	}
	&:active {
		text-decoration: underline;
	}
`;
const LabelsList = styled.div<DisplayProps>`
	z-index: 99;
	width: 300px;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	font-size: 12px;
	color: #24292f;
	border-color: #d0d7de;
	margin-top: 4px;
	margin-bottom: 20px;
	background-clip: padding-box;
	line-height: 1.5;
	box-shadow: 0 8px 24px rgb(140, 149, 159, 20%);
	position: absolute;
	right: 0px;
	border-radius: 6px;
	display: ${(props) => props.display};
`;
const SortTitle = styled.div`
	padding: 8px 10px;
	line-height: 16px;
	border-bottom: 1px solid hsla(210, 18%, 87%, 1);
	font-weight: 600;
`;
const SortListMenu = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 1.5;
`;
const SortLink = styled.a`
	text-decoration: none;
	color: #24292f;
	padding: 8px;
	height: 32px;
	width: 100%;
	border-bottom: 1px solid hsla(210, 18%, 87%, 1);

	&:hover {
		background-color: #0969da;
		color: #fff;
	}
`;
const SortText = styled.span`
	position: absolute;
	left: 30px;
`;
