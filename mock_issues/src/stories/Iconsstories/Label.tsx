import styled from "styled-components";

export default function Label({ backgroundColor, labelName }) {
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
