import SettingsBar from "stories/Iconsstories/SettingsBar";
import TextAreaBox from "stories/Iconsstories/TextAreaBox";
import MidHead from "components/MidHead/MidHead";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

import { useNewIssueMutation } from "api/issueApiSlice";
import { useGetAssigneeListsQuery } from "api/assigneeApiSlice";
import { useGetLabelListsQuery } from "api/labelApiSlice";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export default function NewIssuePage() {
	const { username, reponame } = useParams();
	const navigate = useNavigate();

	const visibility = useSelector(
		(state: RootState) => state?.currentRepoInfo?.repoInfo?.visibility
	);
	const userAvatar = useSelector(
		(state: RootState) =>
			state.supaBaseInfo.user.identities[0].identity_data.avatar_url
	);

	const loginName = useSelector(
		(state: RootState) =>
			state?.supaBaseInfo?.user?.identities[0].identity_data.user_name
	);
	const [textData, setTextData] = useState({ title: "", body: "" });
	const [barData, setBarData] = useState({ assignees: [], labels: [] });
	const { data: assigneeListData, error: getAssigneeListError } =
		useGetAssigneeListsQuery({
			username: username,
			reponame: reponame,
		});

	if (getAssigneeListError) {
		navigate(
			`/error/${(getAssigneeListError as FetchBaseQueryError).status}/${
				(getAssigneeListError as FetchBaseQueryError).data?.["message"]
			}`
		);
	}

	const { data: labelListData, error: getLabelListError } =
		useGetLabelListsQuery({
			username: username,
			reponame: reponame,
		});

	if (getLabelListError) {
		navigate(
			`/error/${(getLabelListError as FetchBaseQueryError).status}/${
				(getLabelListError as FetchBaseQueryError).data?.["message"]
			}`
		);
	}

	const [newIssue, { isSuccess: isNewIssueSuccess }] = useNewIssueMutation();

	useEffect(() => {
		function sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}

		async function nav() {
			if (isNewIssueSuccess) {
				await sleep(5000);
				navigate(`/${username}/${reponame}/issues`);
			}
		}

		nav();
	}, [isNewIssueSuccess]);

	return (
		<>
			<MidHead
				username={username}
				reponame={reponame}
				visibility={visibility}
			/>
			<div className="px-4 mt-6 md:flex md:w-[100%] md:justify-between md:px-6">
				<TextAreaBox
					setTextData={setTextData}
					avatar={userAvatar}
					param={{
						closeIssue: { open: false },
						submitIssue: {
							submitAction: () => {
								newIssue({
									username: username,
									reponame: reponame,
									createIssueData: {
										title: textData.title,
										body: textData.body,
										assignees: barData.assignees,
										labels: barData.labels,
									},
								});
							},
						},
					}}
				/>
				<div className="ml-4">
					<SettingsBar
						setBarData={setBarData}
						param={{
							isAuthorized: loginName === username ? true : false,
							openDevelop: true,
							Notifications: { open: false, subscribe: false },
							Participant: { open: false },
							IssueActions: { open: false },
						}}
						username={username}
						reponame={reponame}
						assigneeList={assigneeListData?.map((element) => {
							return {
								avatar_url: element.avatar_url,
								name: element.login,
							};
						})}
						labelList={labelListData?.map((element) => {
							return {
								color: `#${element.color}`,
								name: element.name,
								des: element.description,
							};
						})}
					/>
				</div>

				<button
					disabled={
						textData.title != null && textData.title != "" ? false : true
					}
					className={` ${
						textData.title != null && textData.title != ""
							? "cursor-pointer"
							: "cursor-not-allowed"
					} mt-[24px] w-[100%] ${
						textData.title != null && textData.title != ""
							? "bg-[#2da44e] hover:bg-[#2c974b] hover:border-[rgba(27,31,36,0.15)]"
							: "bg-[#94d3a2]"
					} text-[#ffffff] rounded-md py-[5px] px-[16px] bg-[#2da44e] text-[14px] border border-solid border-[rgba(27,31,36,0.15)]
					 smd:hidden`}
					onClick={() => {
						newIssue({
							username: username,
							reponame: reponame,
							createIssueData: {
								title: textData.title,
								body: textData.body,
								assignees: barData.assignees,
								labels: barData.labels,
							},
						});
					}}
				>
					Submit new issue
				</button>
			</div>
		</>
	);
}
