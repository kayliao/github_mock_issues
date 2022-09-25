import styled from "styled-components";
import { TriangleDownIcon, CheckIcon } from "@primer/octicons-react";

export default function SortDropList({ isDrop, onClickFunc }) {
	return (
		<SortBox>
			<SortInnerBox>
				<SortButton onClick={onClickFunc}>
					<SortButtonA>Sort</SortButtonA>
					<TriangleDownIcon></TriangleDownIcon>
				</SortButton>
				<LabelsList display={isDrop ? "flex" : "none"}>
					<SortTitle>Sort</SortTitle>
					<SortListMenu>
						<SortLink>
							<CheckIcon size={16} />
							<SortText>Alphabetically</SortText>
						</SortLink>
						<SortLink>
							{/* <CheckIcon size={16} /> */}
							<SortText>Reverse alphabetically</SortText>
						</SortLink>
						<SortLink>
							{/* <CheckIcon size={16} /> */}
							<SortText>Most issues</SortText>
						</SortLink>
						<SortLink>
							{/* <CheckIcon size={16} /> */}
							<SortText>Fewest issues</SortText>
						</SortLink>
					</SortListMenu>
				</LabelsList>
			</SortInnerBox>
		</SortBox>
	);
}

type DisplayProps = {
	display: string;
};

const SortBox = styled.div`
	position: static;
	width: 300px;
`;

const SortInnerBox = styled.div`
	position: relative;
`;

const SortButton = styled.button`
	background: none;
	color: #57606a;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	position: absolute;
	right: 0;
`;

const SortButtonA = styled.a`
	font-size: 14px;
	&:hover {
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
	border: 1px solid #d0d7de;
	margin-top: 4px;
	margin-bottom: 20px;
	background-clip: padding-box;
	line-height: 1.5;
	box-shadow: 0 8px 24px rgb(140, 149, 159, 20%);
	position: absolute;
	right: 0px;
	top: 25px;
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
