import styled from "styled-components";
import { SyncIcon } from "@primer/octicons-react";
import Button from "../../stories/Iconsstories/Button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function LabelActionBox({ show, cancelAction, typeName }) {
	const [isSubmitOk, setIsSubmitOk] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [color, setColor] = useState("");
	const [buttonColorShow, setButtonColorShow] = useState("#000");
	// const { register, handleSubmit } = useForm({
	// 	mode: "onChange", // "onBlur"
	// });

	// const onFormSumbit = (formObj, e) => {
	// 	e.preventDefault();
	// 	console.log("Form Submitted");
	// 	const formData = new FormData(e.target);
	// 	for (const pair of formData.entries()) {
	// 		console.log(`${pair[0]}: ${pair[1]}`);
	// 	}
	// };

	useEffect(() => {}, [name, color]);

	return show ? (
		<>
			<LabelA labelcolor="#d73a4a" wordcolor="#fff">
				bug
			</LabelA>

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
							if (e.target.value.length >= e.target.maxLength) {
								e.target.value = e.target.value.slice(0, e.target.maxLength);
								e.preventDefault();
								setName(e.target.value);
								return;
							}
							setName(e.target.value);
						}}
						name="label-name"
						// {...register("label-name", {
						// 	required: true,
						// 	maxLength: 50,
						// 	pattern: /^(?!(\.|\.\.)$).*$/,
						// })}
					/>
				</InputWrapperBox>
				<InputWrapperBox>
					<InputTitle htmlFor="label-description">Description</InputTitle>
					<InputInput
						id="label-description"
						placeholder="Description (optional)"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</InputWrapperBox>
				<InputWrapperBox>
					<InputTitle htmlFor="label-color">Color</InputTitle>
					<ColorBox>
						<NewColorButton buttonColor={buttonColorShow}>
							<SyncIcon />
						</NewColorButton>
						<InputInput
							required
							type="text"
							maxLength={7}
							pattern="#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
							autoComplete="off"
							id="label-color"
							placeholder="#fff"
							value={color}
							onChange={(e) => {
								function checkIsColor(value) {
									const s = new Option().style;
									s.color = value;
									return s.color !== "";
								}

								if (e.target.value.length >= e.target.maxLength) {
									e.target.value = e.target.value.slice(0, e.target.maxLength);
									e.preventDefault();

									const isColor = checkIsColor(e.target.value);
									if (isColor) setButtonColorShow(e.target.value);
									setColor(e.target.value);
									return;
								}
								if (e.target.value.length === 0) {
									e.target.value = "#";
									e.preventDefault();
									setColor(e.target.value);
									return;
								}
								const isColor = checkIsColor(e.target.value);
								if (isColor) setButtonColorShow(e.target.value);
								setColor(e.target.value);
							}}
						/>
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
							onClickFunc={() => {}}
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

const LabelFormBox = styled.form`
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
`;

const ColorBox = styled.div`
	display: flex;
	margin-left: 0;
`;

const NewColorButton = styled.button<PropsType>`
	color: #fff;
	background-color: ${(props) => props.buttonColor};
	border-color: rgba(240, 246, 252, 0.1);
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
