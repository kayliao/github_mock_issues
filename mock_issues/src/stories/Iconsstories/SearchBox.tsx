import styled from "styled-components";
import { SearchIcon } from "@primer/octicons-react";
import { useState } from "react";

export default function SearchBox() {
	const [inputIsFocus, setInputIsFocus] = useState(false);
	return (
		<SearchLabelBox isOnFocus={inputIsFocus}>
			<SearchIcon />
			<SearchLabelInput
				autoComplete="off"
				onBlur={() => {
					setInputIsFocus(false);
				}}
				onFocus={() => {
					console.log("is on focus");
					setInputIsFocus(true);
				}}
				placeholder="Search all labels"
			/>
		</SearchLabelBox>
	);
}

type PropsType = {
	isOnFocus?: boolean;
};

const SearchLabelBox = styled.div<PropsType>`
	line-height: 20px;
	flex-basis: 100%;
	display: flex;
	align-items: center;
	background-color: #f6f8fa;
	padding: 5px 8px;
	font-size: 14px;
	border-radius: 6px;
	border: 1px solid #d0d7de;
	border-color: ${(props) => (props.isOnFocus ? "#0969da" : "#d0d7de")};
	border-width: ${(props) => (props.isOnFocus ? "2px" : "1px")};

	width: 320px;
	height: 34px;
	@media screen and (min-width: 768px) {
		flex-basis: 0%;
	}
	// margin-left: 0px;
	// margin-right: 24px;
	// margin-top: 16px;
	// @media screen and (min-width: 768px) {
	// 	margin-left: 8px;
	// 	margin-top: 0px;
	// }
`;
const SearchLabelInput = styled.input`
	margin-left: 5px;
	background-color: #f6f8fa;
	border: none;
	color: #57606a;
	width: 280px;
	outline: none;
`;
