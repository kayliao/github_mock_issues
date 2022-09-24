import styled from "styled-components";
import { SyncIcon } from "@primer/octicons-react";
import Button from "../../stories/Iconsstories/Button";
import { useState, useEffect } from "react";
import Label from "../../stories/Iconsstories/Label";
import { useForm } from "react-hook-form";

const ButtonColor = {
	darkColors: [
		"#B60205",
		"#D93F0B",
		"#FBCA04",
		"#0E8A16",
		"#006B75",
		"#1D76DB",
		"#0052CC",
		"#5319E7",
	],
	lightColors: [
		"#E99695",
		"#F9D0C4",
		"#FEF2C0",
		"#C2E0C6",
		"#BFDADC",
		"#C5DEF5",
		"#BFD4F2",
		"#D4C5F9",
	],
};

export default function LabelActionBox({
	show,
	cancelAction,
	typeName,
	gitInfo,
	typeAction,
	labelName,
	labeldescription,
	labelcolor,
}) {
	const [isSubmitOk, setIsSubmitOk] = useState(false);
	const [name, setName] = useState(labelName);
	const [description, setDescription] = useState(labeldescription);
	const [color, setColor] = useState(labelcolor);
	const [colorInvalid, setColorInvalid] = useState(false);
	const [buttonColorShow, setButtonColorShow] = useState(labelcolor);
	const [colorInputOnFocus, setColorInputOnFocus] = useState(false);

	// const onFormSumbit = (formObj, e) => {
	// 	e.preventDefault();
	// 	console.log("Form Submitted");
	// 	const formData = new FormData(e.target);
	// 	for (const pair of formData.entries()) {
	// 		console.log(`${pair[0]}: ${pair[1]}`);
	// 	}
	// };

	useEffect(() => {
		const checkColorValid = checkIsColor(color);
		const checkNameValid = checkName(name);
		if (checkColorValid && checkNameValid) setIsSubmitOk(true);
		else setIsSubmitOk(false);
		if (!checkColorValid) setColorInvalid(true);
		else setColorInvalid(false);
	}, [name, color]);

	function checkIsColor(value: string) {
		const s = new Option().style;
		s.color = value;
		return s.color !== "";
	}

	function checkName(input) {
		const namePattern = new RegExp(/^(?!(\.|\.\.)$).*$/);
		if (namePattern.test(input) && input.length != 0) {
			return true;
		} else return false;
	}

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

	function GetRandomColor() {
		let randomColor = Math.floor(Math.random() * 16777215).toString(16);
		while (randomColor.length < 6) randomColor = GetRandomColor();
		return randomColor;
	}

	return show ? (
		<>
			{/* <LabelA
				labelcolor={buttonColorShow}
				wordcolor={lightOrDark(buttonColorShow)}
			>
				{name.length != 0 ? name : "label preview"}
			</LabelA> */}
			<Label
				backgroundColor={buttonColorShow}
				labelName={name.length != 0 ? name : "label preview"}
			/>

			<LabelFormBox>
				<InputWrapperBox>
					<InputTitle htmlFor="label-name">Label name</InputTitle>
					<InputInput
						required
						type="text"
						pattern="^(?!(\.|\.\.)$).*$"
						maxLength={50}
						autoComplete="off"
						id="label-name"
						placeholder="Label name"
						value={name}
						onChange={(e) => {
							const checkNameValid = checkName(e.target.value);
							if (checkNameValid) {
								if (e.target.value.length >= e.target.maxLength) {
									e.target.value = e.target.value.slice(0, e.target.maxLength);
									// e.preventDefault();
									setName(e.target.value);
									return;
								}
								setName(e.target.value);
								return;
							} else {
								if (e.target.value.length === 0) {
									setName(e.target.value);
								}
							}
						}}
						name="label-name"
					/>
				</InputWrapperBox>
				<InputWrapperBox>
					<InputTitle htmlFor="label-description">Description</InputTitle>
					<InputInput
						id="label-description"
						placeholder="Description (optional)"
						value={description}
						autoComplete="off"
						maxLength={100}
						onChange={(e) => {
							if (e.target.value.length >= e.target.maxLength) {
								e.target.value = e.target.value.slice(0, e.target.maxLength);
								setDescription(e.target.value);
								return;
							}
							setDescription(e.target.value);
							return;
						}}
					/>
				</InputWrapperBox>
				<InputWrapperBox>
					<InputTitle htmlFor="label-color">Color</InputTitle>
					<ColorBox>
						<NewColorButton
							buttonColor={buttonColorShow}
							onClick={(e) => {
								// e.preventDefault();
								// e.stopPropagation();
								const randomColor = GetRandomColor();
								setButtonColorShow(`#${randomColor}`);
								setColor(`#${randomColor}`);
							}}
						>
							<SyncIcon fill={lightOrDark(buttonColorShow)} />
						</NewColorButton>

						<InputInput
							style={{ color: colorInvalid ? "#cf222e" : "#24292f" }}
							required
							type="text"
							maxLength={7}
							pattern="#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
							autoComplete="off"
							id="label-color"
							placeholder="#fff"
							value={color}
							onFocus={() => {
								setColorInputOnFocus(true);
							}}
							onBlur={() => {
								setColorInputOnFocus(false);
							}}
							onChange={(e) => {
								if (e.target.value.length >= e.target.maxLength) {
									e.target.value = e.target.value.slice(0, e.target.maxLength);
									// e.preventDefault();

									const isColor = checkIsColor(e.target.value);
									if (isColor) setButtonColorShow(e.target.value);
									setColor(e.target.value);
									return;
								}
								if (e.target.value.length === 0) {
									e.target.value = "#";
									// e.preventDefault();
									setColor(e.target.value);
									return;
								}
								const isColor = checkIsColor(e.target.value);
								if (isColor) setButtonColorShow(e.target.value);
								setColor(e.target.value);
							}}
						/>
						<ColorMenu display={colorInputOnFocus ? "block" : "none"}>
							<p style={{ color: "#57606a", fontSize: "12px" }}>
								Choose from default colors:
							</p>
							<ColorMenuContainer>
								{ButtonColor.darkColors.map((item) => (
									<ColorMenuBtn
										onMouseDown={(e) => {
											// e.preventDefault();
											// e.stopPropagation();

											setButtonColorShow(item);
											setColor(item);
										}}
										backgroundColor={item}
									></ColorMenuBtn>
								))}
							</ColorMenuContainer>
							<ColorMenuContainer>
								{ButtonColor.lightColors.map((item) => (
									<ColorMenuBtn
										onMouseDown={(e) => {
											// e.preventDefault();
											// e.stopPropagation();

											setButtonColorShow(item);
											setColor(item);
										}}
										backgroundColor={item}
									></ColorMenuBtn>
								))}
							</ColorMenuContainer>
						</ColorMenu>
					</ColorBox>
				</InputWrapperBox>
				<InputActionBox>
					<ButtonCompoStyleBox>
						<Button
							textColor={isSubmitOk ? "#fff" : "rgba(255,255,255,0.8)"}
							backgroundColor={isSubmitOk ? "#2da44e" : "#94d3a2"}
							textSize="14px"
							displayText={typeName}
							borderColor="rgba(27,31,36,0.15)"
							hoverColor="#2c974b"
							hoverBorderColor="rgba(27,31,36,0.15)"
							isAble={isSubmitOk}
							onClickFunc={() => {
								let apiBodyData = {
									username: gitInfo.username,
									reponame: gitInfo.reponame,
								};
								if (typeName === "Save Changes") {
									console.log("new name errors:", gitInfo.labelname, name);
									apiBodyData["labelname"] = gitInfo.labelname;
									apiBodyData["editData"] = {
										owner: gitInfo.username,
										repo: gitInfo.reponame,
										name: gitInfo.labelname,
										new_name: name,
										description: description,
										color: buttonColorShow.slice(1, 7),
									};
									typeAction(apiBodyData);
								}
								if (typeName === "Create Label") {
									apiBodyData["createLabelData"] = {
										owner: gitInfo.username,
										repo: gitInfo.reponame,
										name: name,
										description: description,
										color: buttonColorShow.slice(1, 7),
									};
									typeAction(apiBodyData);
								}
								cancelAction();
							}}
						/>
					</ButtonCompoStyleBox>
					<ButtonCompoStyleBox2>
						<Button
							textColor="#24292f"
							backgroundColor="#f6f8fa"
							textSize="14px"
							displayText="Cancel"
							borderColor="rgba(27,31,36,0.15)"
							hoverColor="#f3f4f6"
							hoverBorderColor="rgba(27,31,36,0.15)"
							isAble={true}
							onClickFunc={cancelAction}
						/>
					</ButtonCompoStyleBox2>
				</InputActionBox>
			</LabelFormBox>
		</>
	) : (
		<></>
	);
}

const LabelA = styled.button`
	white-space: nowrap;
	padding: 0 10px;
	font-size: 12px;
	font-weight: 500;
	line-height: 22px;
	border: 1px solid transparent;
	border-radius: 2em;
	font-weight: 500;
	background-color: ${(props: PropsType) => props.labelcolor};
	color: ${(props: PropsType) => props.wordcolor};
`;

const LabelABox = styled.div`
	height: 48px;
`;

const LabelFormBox = styled.div`
	display: flex;
	margin-bottom: -8px;
	align-items: flex-start;
	flex-direction: column;
	@media screen and (min-width: 768px) {
		flex-direction: row;
		align-items: flex-end;
	}
`;
const InputWrapperBox = styled.div`
	margin-top: 8px;
	margin-bottom: 8px;
	width: 100%;
	margin: 15px 0;
	@media screen and (min-width: 768px) {
		width: 100%;
		padding-right: 16px;
	}
`;
const InputTitle = styled.label`
	position: static;
	font-size: 14px;
	font-weight: 600;
`;

const InputInput = styled.input`
	max-width: 100%;
	margin-right: 5px;
	background-color: #f6f8fa;
	width: 100%;
	padding: 5px 12px;
	font-size: 14px;
	line-height: 20px;
	color: #24292f;
	vertical-align: middle;
	background-repeat: no-repeat;
	background-position: right 8px center;
	border: 1px solid #d0d7de;
	border-radius: 6px;
	box-shadow: inset 0 1px 0 rgba(208, 215, 222, 0.2);
	@media screen and (min-width: 768px) {
		width: 100%;
	}
	&:focus {
		outline-color: #0969da;
		background-color: #fff;
	}
`;

const ColorBox = styled.div`
	display: flex;
	margin-left: 0;
	position: relative;
`;

const NewColorButton = styled.button<PropsType>`
	color: #fff;
	background-color: ${(props) => props.buttonColor};
	border: 1px solid;
	border-radius: 6px;
	padding: 0px 7px;
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	white-space: nowrap;
	vertical-align: middle;
	cursor: pointer;
	margin-right: 8px;
	border-color: ${(props) =>
		props.buttonColor === "#ffffff" ||
		props.buttonColor === "#fff" ||
		props.buttonColor === "#ffff" ||
		props.buttonColor === "#0000"
			? "#d0d7de"
			: props.buttonColor};
`;

const InputActionBox = styled.div`
	display: flex;
	margin-top: 8px;
	margin-bottom: 8px;
	margin-left: 0px;
	justify-content: flex-start;
	width: 100%;
	@media screen and (min-width: 768px) {
		justify-content: flex-end;

		margin-top: 16px;
		margin-bottom: 16px;
	}
`;

const ButtonCompoStyleBox = styled.div`
	margin-right: 8px;
	@media screen and (min-width: 768px) {
		margin-right: 0px;
		order: 1;
	}
`;
const ButtonCompoStyleBox2 = styled.div`
	margin-right: 0px;
	@media screen and (min-width: 768px) {
		margin-right: 8px;
	}
`;

type PropsType = {
	labelcolor?: string;
	wordcolor?: string;
	buttonColor?: string;
};

//.............................

const ColorMenu = styled.div<DisplayProps>`
	display: ${(props) => props.display};
	z-index: 100;
	position: absolute;
	background-color: #fff;
	box-shadow: 0 8px 24px rgba(140, 149, 159, 20%);
	top: 100%;
	width: 16em;
	border-radius: 6px;
	padding: 8px;
	margin-right: auto;
	left: 8%;
	border: 1px solid #d0d7de;
	margin-top: 3px;

	&::after {
		content: none;
	}

	@media screen and (min-width: 768px) {
		left: 18%;

		&::after {
			top: -12px;
			left: 10px;
			right: auto;
			border: 7px solid transparent;
			position: absolute;
			display: inline-block;
			border-bottom-color: #fff;
			content: "";
		}

		&::before {
			top: -14px;
			left: 10px;
			right: auto;
			border: 7px solid transparent;
			position: absolute;
			display: inline-block;
			border-bottom-color: #d0d7de;
			content: "";
		}
	}
`;
const ColorMenuContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 8px;
`;
const ColorMenuBtn = styled.button<backgroundColorProps>`
	width: 24px;
	height: 24px;
	border-color: transparent;
	border-radius: 6px;
	background-color: ${(props) => props.backgroundColor};
	cursor: pointer;
`;
type DisplayProps = {
	display: string;
};

type backgroundColorProps = {
	backgroundColor: string;
};
