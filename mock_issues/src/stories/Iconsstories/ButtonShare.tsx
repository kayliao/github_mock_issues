import styled from "styled-components";

export default function ButtonShare({
	textColor,
	backgroundColor,
	textSize,
	displayText,
	borderColor,
	hoverColor,
	hoverBorderColor,
	isAble,
	onClickFunc,
}) {
	return (
		<NewButton
			disabled={!isAble}
			textColor={textColor}
			backgroundColor={backgroundColor}
			textSize={textSize}
			borderColor={borderColor}
			hoverColor={hoverColor}
			hoverBorderColor={hoverBorderColor}
			onClick={onClickFunc}
		>
			{displayText}
		</NewButton>
	);
}

const NewButton = styled.button`
	color: ${(props: NewButtonType) => props.textColor};
	background-color: ${(props) => props.backgroundColor};
	border: 1px solid;
	border-color: ${(props) => props.borderColor};
	border-radius: 6px;
	padding: 5px 16px;
	font-size: ${(props) => props.textSize};
	font-weight: 500;
	line-height: 20px;
	white-space: nowrap;
	vertical-align: middle;
	cursor: pointer;

	&:hover:enabled {
		border-color: ${(props) => props.hoverBorderColor};
		background-color: ${(props) => props.hoverColor};
	}

	&:disabled {
		cursor: not-allowed;
	}
`;

type NewButtonType = {
	textColor?: string;
	backgroundColor?: string;
	borderColor?: string;
	textSize?: string;
	hoverColor?: string;
	hoverBorderColor?: string;
	onClickFunc?: React.MouseEventHandler<HTMLButtonElement>;
};
