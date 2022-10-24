import styled from "styled-components";
import { lightOrDark } from "utils/shareFunctions";

export default function Label({ backgroundColor, labelName }) {
	return (
		<LabelA
			labelColor={backgroundColor}
			wordColor={lightOrDark(backgroundColor)}
		>
			{labelName}
		</LabelA>
	);
}

const LabelA = styled.button`
	cursor: pointer;
	white-space: nowrap;
	padding: 0 10px;
	font-size: 12px;
	font-weight: 500;
	line-height: 22px;
	border: 1px solid transparent;
	border-radius: 2em;
	font-weight: 500;
	background-color: ${(props: PropsTypes) => props.labelColor};
	color: ${(props: PropsTypes) => props.wordColor};
	border-color: ${(props) =>
		props.labelColor === "#ffffff" ||
		props.labelColor === "#fff" ||
		props.labelColor === "#ffff" ||
		props.labelColor === "#0000"
			? "#d0d7de"
			: props.labelColor};
`;

type PropsTypes = {
	labelColor?: string;
	wordColor?: string;
};
