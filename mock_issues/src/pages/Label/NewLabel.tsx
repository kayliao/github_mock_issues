import styled from "styled-components";
import { SyncIcon } from "@primer/octicons-react";
import ButtonShare from "../../stories/Iconsstories/ButtonShare";
import LabelActionBox from "../Label/LabelActionBox";
import { useState } from "react";

export default function NewLabel({
	show,
	gitInfo,
	cancelAction,
	createAction,
}) {
	return show ? (
		<WrapperBox>
			<LabelActionBox
				show={show}
				cancelAction={cancelAction}
				typeName={"Create Label"}
				gitInfo={gitInfo}
				typeAction={createAction}
				labelName=""
				labeldescription=""
				labelcolor="#ffffff"
			/>
		</WrapperBox>
	) : (
		<></>
	);
}

const WrapperBox = styled.div`
	padding: 16px;
	margin-bottom: 16px;
	border-color: #d0d7de;
	background-color: #f6f8fa;
	border-radius: 6px;
	border: 1px solid #d0d7de;

	margin-top: 24px;
	padding-left: 16px;
	padding-right: 16px;
`;
