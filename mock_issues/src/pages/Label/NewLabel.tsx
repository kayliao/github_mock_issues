import styled from "styled-components";
import { SyncIcon } from "@primer/octicons-react";
import Button from "../../stories/Iconsstories/Button";
import LabelActionBox from "../Label/LabelActionBox";
import { useState } from "react";

export default function NewLabel({ show, cancelAction }) {
	return show ? (
		<WrapperBox>
			<LabelActionBox
				show={show}
				cancelAction={cancelAction}
				typeName={"Create Label"}
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
