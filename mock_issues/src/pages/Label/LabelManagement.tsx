import styled from "styled-components";
import MidHead from "../../components/MidHead/MidHead";
import NewLabel from "./NewLabel";
import SearchBox from "../../stories/Iconsstories/SearchBox";
import LabelItem from "./LabelItem";
import SortDropList from "stories/Iconsstories/SortDropList";
import ButtonShare from "../../stories/Iconsstories/ButtonShare";
import { TagIcon, MilestoneIcon } from "@primer/octicons-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import {
	useGetLabelListsQuery,
	useDeleteLabelMutation,
	useUpdateLabelMutation,
	useCreateLabelMutation,
} from "../../api/labelApiSlice";

export default function LabelManagement() {
	const [newLabelClick, setNewLabelClick] = useState(false);
	const [sortClick, setSortClick] = useState(false);
	const { username, reponame } = useParams();
	const visibility = useSelector(
		(state: RootState) => state?.currentRepoInfo?.repoInfo?.visibility
	);

	const {
		data: labelListData,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetLabelListsQuery({
		username: username,
		reponame: reponame,
	});

	const [deleteLabel] = useDeleteLabelMutation();
	const [updateLabel] = useUpdateLabelMutation();
	const [createLabel] = useCreateLabelMutation();

	if (isLoading) {
		return (
			<LoadingWrapper>
				<p>...loading</p>
			</LoadingWrapper>
		);
	}

	return (
		<>
			<MidHead
				username={username}
				reponame={reponame}
				visibility={visibility}
			/>
			<WrapperBox>
				<OtherNavBox>
					<LabelMileStoneBox>
						<ButtonIconLink isSelected={true}>
							<TagIcon />
							<ButtonIconText isSelected={true}>Labels</ButtonIconText>
						</ButtonIconLink>
						<ButtonIconLink isSelected={false}>
							<MilestoneIcon />
							<ButtonIconText isSelected={false}>MileStones</ButtonIconText>
						</ButtonIconLink>
					</LabelMileStoneBox>
					<SearchLabelWrapper>
						<SearchBox />
					</SearchLabelWrapper>
					<ButtonCompoStyle>
						<ButtonShare
							param={{}}
							textColor="#fff"
							backgroundColor="#2da44e"
							textSize="14px"
							displayText="New label"
							borderColor="rgba(27,31,36,0.15)"
							hoverColor="#2c974b"
							hoverBorderColor="rgba(27,31,36,0.15)"
							isAble={true}
							onClickFunc={() => setNewLabelClick(true)}
						/>
					</ButtonCompoStyle>
				</OtherNavBox>
				<NewLabel
					show={newLabelClick}
					cancelAction={() => setNewLabelClick(false)}
					createAction={createLabel}
					gitInfo={{ reponame: reponame, username: username }}
				/>
				<LabelListBox>
					<LabelListBoxHeader>
						<LabelListBoxHeaderSpan>{`${labelListData.length} labels`}</LabelListBoxHeaderSpan>
						<SortDropList
							isDrop={sortClick}
							onClickFunc={() => setSortClick((prev) => !prev)}
						/>
					</LabelListBoxHeader>

					{labelListData?.map((element) => {
						return (
							<ListItemBox>
								<LabelItem
									gitLabelData={element}
									deleteAction={() =>
										deleteLabel({
											username: username,
											reponame: reponame,
											labelname: element.name,
										})
									}
									gitInfo={{
										username: username,
										reponame: reponame,
										labelname: element.name,
									}}
									updateAction={updateLabel}
								/>
							</ListItemBox>
						);
					})}
				</LabelListBox>
			</WrapperBox>
		</>
	);
}

type GitLabelDataType = {
	color?: string;
	default?: boolean;
	description?: boolean;
	id?: number;
	name?: string;
	node_id?: string;
	url?: string;
};

const LoadingWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 40px;
	font-weight: 600;
	font-size: 14px;
`;

const WrapperBox = styled.div`
	margin-top: 24px;
	padding-left: 16px;
	padding-right: 16px;
	width: 100%;
	@media screen and (min-width: 768px) {
		padding-left: 24px;
		padding-right: 24px;
	}
	@media screen and (min-width: 1012px) {
		padding-left: 32px;
		padding-right: 32px;
	}
	@media screen and (min-width: 1280px) {
		width: 1216px;
		padding-left: 0px;
		padding-right: 0px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const OtherNavBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	position: relative;
`;

const LabelMileStoneBox = styled.div`
	display: flex;
	float: left;
	white-space: nowrap;
`;

const ButtonIconLink = styled.a`
	display: flex;
	align-items: center;
	text-decoration: none;
	font-weight: 500;
	line-height: 20px;
	border: 1px solid #d0d7de;
	border-color: ${(props: isSelectedProps) =>
		props.isSelected ? "#0969da" : "#d0d7de"};
	background-color: ${(props: isSelectedProps) =>
		props.isSelected ? "#0969da" : "#fff"};

	color: ${(props: isSelectedProps) => (props.isSelected ? "#fff" : "#24292f")};
	padding: 5px 16px;

	&:first-child {
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
		border-right-color: transparent;
	}
	&:last-child {
		border-top-right: 1px solid #000;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
	}
`;

const ButtonIconText = styled.span`
	color: ${(props: isSelectedProps) => (props.isSelected ? "#fff" : "#24292f")};
	padding: 0px 6px;
	padding-top: 2px;
`;

type isSelectedProps = {
	isSelected: boolean;
};

const SearchLabelWrapper = styled.div`
	flex-basis: 100%;
	margin-left: 0px;
	margin-right: 24px;
	margin-top: 16px;
	@media screen and (min-width: 768px) {
		flex-basis: 0%;
		margin-left: 8px;
		margin-top: 0px;
	}
`;

const LabelListBox = styled.div`
	background-color: #fff;
	border-color: #d0d7de;
	border-style: solid;
	border-width: 1px;
	border-radius: 6px;
	margin-top: 20px;
`;

const LabelListBoxHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 16px;
	margin: -1px -1px 0;
	background-color: #f6f8fa;
	border-color: #d0d7de;
	border-style: solid;
	border-width: 1px;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
	border-bottom: none;
`;

const LabelListBoxHeaderSpan = styled.span`
	color: #24292f;
	font-size: 14px;
	font-weight: 600;
`;

const ListItemBox = styled.div`
	border-top-color: transparent;
	//display: flex;
	padding: 16px;
	// justify-content: space-between;
	border-color: #d0d7de;
	border-style: solid;
	border-top-width: 1px;
	// align-items: center;
	&:first-child {
		border-top-width: 0px;
		border: none;
	}
`;

const ButtonCompoStyle = styled.div`
	position: absolute;
	right: 0px;
`;
