import ButtonShare from "stories/Iconsstories/ButtonShare";
import {
	IssueOpenedIcon,
	IssueClosedIcon,
	SkipIcon,
	CodeSquareIcon,
} from "@primer/octicons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem";
import SettingsBar from "stories/Iconsstories/SettingsBar";
import { useGetAssigneeListsQuery } from "api/assigneeApiSlice";
import CommentBox from "./CommentBox";
import TextAreaBox from "stories/Iconsstories/TextAreaBox";
import Label from "stories/Iconsstories/Label";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	useGetIssueInfoQuery,
	useUpdateIssueMutation,
} from "../../api/issueInfoApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useGetLabelListsQuery } from "api/labelApiSlice";
import { useGetIssueTimelineQuery } from "api/issueTimelineApiSlice";
import {
	useGetCommentInfoQuery,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
	useCreateCommentMutation,
} from "api/issueCommentApiSlice";

type MyProps = {};
type MyState = { editOnClick: boolean };

export default function IssueInfo() {
	const navigate = useNavigate();
	const [editOnClick, setEditOnClick] = useState(false);
	const { username, reponame, issuenumber } = useParams();
	const [barData, setBarData] = useState(null);
	const inputTitleRef = useRef(null);
	const [stateUpdateInfo, setStateUpdateInfo] = useState({
		state: "",
		state_reason: "",
	});

	const { data: issueInformation } = useGetIssueInfoQuery({
		username,
		reponame,
		issuenumber,
	});

	const { data: issueCommentInformation } = useGetCommentInfoQuery({
		username,
		reponame,
		issuenumber,
	});

	console.log(issueCommentInformation);

	const [updateIssue, { isLoading: isIssueUpdating }] =
		useUpdateIssueMutation();

	const [updateIssueComment, { isLoading: isUpdateCommentLoading }] =
		useUpdateCommentMutation();

	const [createIssueComment, { isLoading: isCreateCommentLoading }] =
		useCreateCommentMutation();

	const { data: labelListData } = useGetLabelListsQuery({
		username: username,
		reponame: reponame,
	});

	const { data: assigneeListData } = useGetAssigneeListsQuery({
		username: username,
		reponame: reponame,
	});

	const { data: timelineData } = useGetIssueTimelineQuery({
		username,
		reponame,
		issuenumber,
	});

	const loginName = useSelector(
		(state: RootState) =>
			state?.supaBaseInfo?.user?.identities[0].identity_data.user_name
	);

	const observer = useRef<IntersectionObserver | null>(null);
	const headerBottom = useCallback((node: HTMLDivElement) => {
		if (node) {
			const options = {
				rootMargin: "0px",
				threshold: 0,
			};
			const callback = (entries: IntersectionObserverEntry[]) => {
				if (entries[0].isIntersecting) {
					console.log("in");
				} else {
					console.log("out");
				}
			};
			observer.current = new IntersectionObserver(callback, options);
			observer.current.observe(node);
		}
	}, []);

	console.log("info", issueInformation);

	useEffect(() => {
		if (barData != null) {
			updateIssue({
				username,
				reponame,
				issuenumber,
				editData: {
					assignees: barData.assignees,
				},
			});
		}
	}, [barData?.assignees]);

	useEffect(() => {
		if (barData != null) {
			updateIssue({
				username,
				reponame,
				issuenumber,
				editData: {
					labels: barData.labels,
				},
			});
		}
	}, [barData?.labels]);

	useEffect(() => {
		if (!isIssueUpdating) setEditOnClick(false);
	}, [isIssueUpdating]);

	useEffect(() => {
		console.log(stateUpdateInfo);
		if (stateUpdateInfo?.state != "" && stateUpdateInfo?.state_reason != "")
			updateIssue({
				username,
				reponame,
				issuenumber,
				editData: {
					state: stateUpdateInfo.state,
					state_reason: stateUpdateInfo.state_reason,
				},
			});
	}, [stateUpdateInfo]);

	function countRestTime(timeString) {
		const time = new Date(timeString);
		const timeNow = Date.now();
		const diffTime = timeNow - time.getTime();

		const diffDays = Math.floor(diffTime / (24 * 3600 * 1000));
		let hours, minutes, seconds;
		if (diffDays <= 0) {
			const leave1 = diffTime % (24 * 3600 * 1000);
			hours = Math.floor(leave1 / (3600 * 1000));
			if (hours <= 0) {
				const leave2 = leave1 % (3600 * 1000);
				minutes = Math.floor(leave2 / (60 * 1000));
				if (minutes <= 0) {
					const leave3 = leave2 % (60 * 1000);
					seconds = Math.round(leave3 / 1000);
					return `${seconds} seconds ago`;
				} else {
					return `${minutes} minutes ago`;
				}
			} else {
				return `${hours} hours ago`;
			}
		} else if (diffDays <= 30) {
			return `${diffDays} days ago`;
		} else {
			time.toLocaleString("default", { month: "short" });

			time.toLocaleString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
			});
			return `on ${time.toLocaleString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
			})}`;
		}
	}

	return (
		<div>
			<div className="pr-4 pl-4 mt-6 xl:max-w-[1280px] xl:mx-auto">
				<div>
					<div className="mb-4 bg-[#ffffff]">
						<div className={`${editOnClick ? "hidden" : "block"}`}>
							<div className="flex flex-col md:flex-row md:justify-between">
								<div className="flex mb-4 ml-[0px] mt-[0px] mb-4 items-start shrink-0 float-right md:mt-2 md:order-1 md:mb-0">
									<ButtonShare
										textColor="#24292f"
										backgroundColor="#f6f8fa"
										textSize="12px"
										displayText="Edit"
										borderColor="rgba(27,31,36,0.15)"
										hoverColor="#f3f4f6"
										hoverBorderColor="rgba(27,31,36,0.15)"
										isAble={true}
										onClickFunc={() => {
											inputTitleRef.current.focus();
											setEditOnClick(true);
										}}
										param={{ padding: "3px 12px" }}
									/>
									<div className="ml-2 float-left">
										<ButtonShare
											textColor="#ffffff"
											backgroundColor="#2da44e"
											textSize="12px"
											displayText="New Issue"
											borderColor="rgba(27,31,36,0.15)"
											hoverColor="#2c974b"
											hoverBorderColor="rgba(27,31,36,0.15)"
											isAble={true}
											onClickFunc={() => {
												navigate(`/${username}/${reponame}/issues/new`);
											}}
											param={{ padding: "3px 12px" }}
										/>
									</div>
									<div className="flex-auto text-right md:hidden">
										<a
											href="#jumpToNewComment"
											className="py-1 text-[#0969da] cursor-pointer"
										>
											Jump to bottom
										</a>
									</div>
								</div>
								<h1 className="font-normal break-words mb-2 ">
									<span className="text-[26px] md:text-[32px]">
										{issueInformation?.title}
									</span>
									<span className="font-light ml-2 text-[26px] text-[#57606a] md:text-[32px]">
										{`#${issuenumber}`}
									</span>
								</h1>
							</div>
						</div>
						<div className={`${editOnClick ? "block" : "hidden"}`}>
							<div className="mb-2 relative">
								<div className="flex flex-col md:flex-row md:items-center">
									<div className="flex flex-auto">
										<input
											ref={inputTitleRef}
											autoComplete="off"
											type={"text"}
											className="flex flex-auto leading-[20px] text-[16px] py-[5px] px-[12px] border border-solid border-[#d0d7de] rounded-[6px] shadow-[inset_0_1px_0_rgba(208,215,222,0.2)] bg-[#f6f8fa] focus:bg-[#ffffff] focus:border-[#0969da] focus:outline-0 focus:shadow-[inset_0_0_0_1px_#0969da]"
										/>
									</div>
									<div className="mt-2 flex items-center md:mt-0 md:ml-4">
										<ButtonShare
											textColor="#24292f"
											backgroundColor="#f6f8fa"
											textSize="14px"
											displayText={isIssueUpdating ? "Updating" : "Save"}
											borderColor="rgba(27,31,36,0.15)"
											hoverColor="#f3f4f6"
											hoverBorderColor="rgba(27,31,36,0.15)"
											isAble={isIssueUpdating ? false : true}
											onClickFunc={() => {
												updateIssue({
													username,
													reponame,
													issuenumber,
													editData: {
														title: inputTitleRef.current.value,
													},
												});
											}}
											param={{
												disableTextColor: "#24292f",
												disableBackgroundColor: "rgba(175,184,193,0.2)",
											}}
										/>
										<button
											className="ml-2 text-[14px] leading-[21px] text-[#0969da] hover:underline"
											onClick={() => {
												inputTitleRef.current.value = "";
												setEditOnClick(false);
											}}
										>
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
						<div
							className="flex text-[14px] pb-2 mb-4 items-center flex-wrap border-b border-solid border-[#d0d7de]"
							ref={headerBottom}
						>
							<div className="mb-2 shrink-0 self-start flex">
								{issueInformation?.state === "open" ? (
									<span className="mr-2 text-[#ffffff] text-[14px] leading-5 bg-[#2da44e] border border-solid border-[transparent] py-[5px] px-[12px] rounded-[2em]">
										<IssueOpenedIcon /> Open{" "}
									</span>
								) : issueInformation?.state_reason === "not_planned" ? (
									<span className="mr-2 text-[#ffffff] text-[14px] leading-5 bg-[#6e7781] border border-solid border-[transparent] py-[5px] px-[12px] rounded-[2em]">
										<SkipIcon /> Closed{" "}
									</span>
								) : (
									<span className="mr-2 text-[#ffffff] text-[14px] leading-5 bg-[#8250df] border border-solid border-[transparent] py-[5px] px-[12px] rounded-[2em]">
										<IssueClosedIcon /> Closed{" "}
									</span>
								)}
							</div>
							<div className="flex flex-auto mb-2 text-[#57606a] font-normal whitespace-pre">
								<div className="font-semibold text-[#57606a] text-[14px] cursor-pointer">
									{`${issueInformation?.user?.login} `}
								</div>{" "}
								opened this issue{" "}
								<div className="">
									{`${countRestTime(issueInformation?.created_at)}`}
								</div>
								{` · ${issueInformation?.comments} comments`}
							</div>
						</div>
					</div>
					<div>
						{/* <header
            className={`${
              fixedHeaderStatus ? 'block' : 'hidden'
            } fixed top-0 left-0 right-0 z-[200] flex border-b border-solid border-borderGray bg-white px-2 py-1`}>
            <div className='mr-1 flex whitespace-nowrap'>
              <LabelItem
                labelName={issueData.state === 'open' ? 'Open' : 'Closed'}
                colorCode={
                  issueData.state === 'open'
                    ? '#2DA44E'
                    : issueData.state_reason === 'completed'
                    ? '#8250df'
                    : '#57606a'
                }
                textColor={'white'}
                icon={
                  issueData.state === 'open' ? (
                    <IssueOpenedIcon />
                  ) : issueData.state_reason === 'completed' ? (
                    <IssueClosedIcon />
                  ) : (
                    <SkipIcon />
                  )
                }
                padding={'8px 12px'}
              />
            </div>
            <div className='flex flex-col justify-between truncate'>
              <h1 className='text-[14px] font-medium leading-[1.3]'>
                {issueData.title}{' '}
                <span className='text-textGray'>#{issueId}</span>
              </h1>
              <p className='text-[12px]'>
                <button className='mr-[4px] font-medium text-textGray'>
                  {issueData.user.login}
                </button>
                <span className='text-textGray'>
                  opened this issue {calculateTime(issueData.created_at)} ago ·{' '}
                  {issueData.comments} comments
                </span>
              </p>
            </div>
          </header> */}
					</div>
				</div>
				<div className="block md:hidden text-[12px] mb-6 border-b border-solid border-[#d0d7de]">
					<div className="flex items-center mb-4">
						<span className="font-semibold text-[#57606a] w-[24.99%] sm:w-[16.99%]">
							Assignees
						</span>
						<div className="flex flex-wrap">
							<a className="mr-1">
								<img
									src="https://avatars.githubusercontent.com/u/34449805?s=40&v=4"
									className="w-[20px] h-[20px] rounded-[50%] shadow-[0_0_0_1px_rgba(27,31,36,0.15)]"
								/>
							</a>
							<a className="mr-1">
								<img
									src="https://avatars.githubusercontent.com/u/34449805?s=40&v=4"
									className="w-[20px] h-[20px] rounded-[50%] shadow-[0_0_0_1px_rgba(27,31,36,0.15)]"
								/>
							</a>
						</div>
					</div>
					<div className="flex items-center mb-4">
						<span className="font-semibold text-[#57606a] w-[24.99%] sm:w-[16.99%]">
							Labels
						</span>
						<div className="flex flex-wrap">
							<div className="mr-1 mb-1">
								<Label backgroundColor={"#ffffff"} labelName={"abcded"} />
							</div>
							<div className="mr-1 mb-1">
								<Label backgroundColor={"#ffffff"} labelName={"abcded"} />
							</div>
						</div>
					</div>
				</div>
				<div className="hidden">
					{/* <div>
						<CommentBox
							avatar={"https://avatars.githubusercontent.com/u/34449805?v=4"}
							param={{
								boxBlue: false,
								isFirst: false,
								reactions: {
									good: { number: 1, isClicked: true },
									bad: { number: 1, isClicked: true },
									confused: { number: 5, isClicked: false },
									eyes: { number: 1, isClicked: true },
									heart: { number: 1, isClicked: true },
									hooray: { number: 1, isClicked: true },
									laugh: { number: 1, isClicked: true },
									rocket: { number: 1, isClicked: true },
									total_count: 5,
								},
							}}
							showMessage={"abcd"}
						/>
						<TextAreaBox
							setTextData={() => {}}
							avatar={"https://avatars.githubusercontent.com/u/34449805?v=4"}
							param={{
								closeIssue: { open: false, state: 2 },
								editComment: { open: true },
								submitIssue: {
									submitAction: () => {},
								},
								closeMarkdownSupportTag: true,
								closeTitleInput: true,
								timeline: {
									open: false,
									isFirst: true,
								},
								topTimeline: true,
								// ahook: useGetAssigneeListsQuery,
							}}
						/>
					</div> */}
				</div>
				<div className=" mt-6 md:flex md:w-[100%] md:justify-between ">
					<div className="w-[inherit]">
						<CommentItem
							authorName={issueInformation?.user.login}
							createTime={issueInformation?.created_at}
							param={{
								isFirst: true,
								isOwner:
									issueInformation?.author_association === "OWNER"
										? true
										: false,
								isCollaborator:
									issueInformation?.author_association === "Collaborator"
										? true
										: false,
								boxBlue:
									issueInformation?.user.login === loginName ? true : false,
								// updateCommentActionApiHook:updateIssue
								updateIssueActionApiHook: updateIssue,
								editApiData: { username, reponame, issuenumber },
							}}
							showMessage={issueInformation?.body ? issueInformation?.body : ""}
						/>

						{issueCommentInformation?.map((element) => {
							return (
								<CommentItem
									authorName={element?.user.login}
									createTime={element?.created_at}
									param={{
										isFirst: false,
										isOwner:
											element?.author_association === "OWNER" ? true : false,
										isCollaborator:
											element?.author_association === "Collaborator"
												? true
												: false,
										isAuthor:
											element?.user?.login === issueInformation?.user?.login
												? true
												: false,
										boxBlue: element?.user?.login === loginName ? true : false,
										updateCommentActionApiHook: updateIssueComment,

										editApiData: {
											username,
											reponame,
											commentid: element?.id,
										},
									}}
									showMessage={element?.body ? element?.body : ""}
								/>
							);
						})}

						<a id="jumpToNewComment">
							<TextAreaBox
								setTextData={() => {}}
								avatar={"https://avatars.githubusercontent.com/u/34449805?v=4"}
								param={{
									closeIssue: {
										open: true,
										state:
											issueInformation?.state === "open"
												? 0
												: issueInformation?.state_reason === "not_planned"
												? 1
												: 2,
										setStateInfoFunction: (info) => setStateUpdateInfo(info),
										commentActionHook: createIssueComment,
										editApiData: {
											username,
											reponame,
											issuenumber,
										},
									},
									editComment: {
										open: false,
									},
									submitIssue: {
										submitAction: () => {},
									},
									closeMarkdownSupportTag: true,
									closeContributionsGuideline: false,
									closeTitleInput: true,
									timeline: {
										open: false,
										isFirst: false,
									},
									topTimeline: true,
									// ahook: useGetAssigneeListsQuery,
								}}
							/>
						</a>
					</div>
					<div className="ml-4">
						{issueInformation?.labels && issueInformation?.assignees ? (
							<SettingsBar
								setBarData={setBarData}
								param={{
									openDevelop: true,
									Notifications: { open: true, subscribe: false },
									Participant: {
										open: true,
										participantList: Array.from(
											assigneeListData
												?.map((element) => {
													return {
														avatar_url: element.avatar_url,
														name: element.login,
													};
												})
												.concat(
													timelineData?.map((element) => {
														if (element.event === "mentioned")
															return {
																avatar_url: element.actor.avatar_url,
																name: element.actor.login,
															};
														return;
													})
												)
												.filter((element) => {
													return element != undefined;
												})
												.reduce((map, obj) => map.set(obj.name, obj), new Map())
												.values()
										),
									},
									IssueActions: { open: true },
									initialLabels: issueInformation?.labels?.map((element) => {
										return element.name;
									}),
									initialAssignees: issueInformation?.assignees?.map(
										(element) => {
											return element.login;
										}
									),
								}}
								username={username}
								reponame={reponame}
								assigneeList={Array.from(
									assigneeListData
										?.map((element) => {
											return {
												avatar_url: element.avatar_url,
												name: element.login,
											};
										})
										.concat(
											timelineData?.map((element) => {
												if (element.event === "mentioned")
													return {
														avatar_url: element.actor.avatar_url,
														name: element.actor.login,
													};
												return;
											})
										)
										.filter((element) => {
											return element != undefined;
										})
										.reduce((map, obj) => map.set(obj.name, obj), new Map())
										.values()
								)}
								labelList={labelListData?.map((element) => {
									return {
										color: `#${element.color}`,
										name: element.name,
										des: element.description,
									};
								})}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
