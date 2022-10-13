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
	param,
}) {
	return (
		<NewButton
			disabled={!isAble}
			isAble={isAble}
			textColor={textColor}
			backgroundColor={backgroundColor}
			textSize={textSize}
			borderColor={borderColor}
			hoverColor={hoverColor}
			hoverBorderColor={hoverBorderColor}
			onClick={onClickFunc}
			other={param}
		>
			{displayText}
		</NewButton>
	);
}

const NewButton = styled.button`
	color: ${(props: NewButtonType) =>
		props.isAble ? props.textColor : "rgba(255,255,255,0.8)"};
	background-color: ${(props) =>
		props.isAble ? props.backgroundColor : "#94d3a2"};
	border: 1px solid;
	border-color: ${(props) => props.borderColor};
	border-radius: 6px;
	padding: ${(props) =>
		props.other?.padding ? props.other?.padding : "5px 16px"};
	font-size: ${(props) => props.textSize};
	font-weight: 500;
	line-height: 20px;
	white-space: nowrap;
	vertical-align: middle;
	cursor: pointer;

	&:hover:enabled {
		border-color: ${(props) => props.hoverBorderColor};
		background-color: ${(props) => props.hoverColor};
		color: ${(props) =>
			props?.other?.hoverTextColor
				? props?.other?.hoverTextColor
				: props.textColor};
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
	isAble?: boolean;
	other?: { padding?: string; hoverTextColor?: string };
	// param?:{disableTextColor?:string,disableBackgroundColor?:string,disableBorderColor?:string}
};
