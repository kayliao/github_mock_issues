import CommentBox from "./CommentBox";
import TextAreaBox from "stories/Iconsstories/TextAreaBox";
import {
	useGetReactionInfoQuery,
	useDeleteReactionMutation,
	useCreateReactionMutation,
} from "api/issueCommentReactionApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

export default function CommentItem({
	param,
	showMessage,
	authorName,
	createTime,
	avatar,
}) {
	const [commentShow, setCommentShow] = useState(true);
	const { data: commentReactionsData } = useGetReactionInfoQuery(
		param?.reactions?.commentReactionApiParam
	);
	const [deleteCommentReaction] = useDeleteReactionMutation();
	const [createCommentReaction] = useCreateReactionMutation();

	const loginName = useSelector(
		(state: RootState) =>
			state?.supaBaseInfo?.user?.identities[0].identity_data.user_name
	);

	function getReactionsObject() {
		return commentReactionsData?.reduce(
			(previous, current) => {
				if (current.content === "+1") {
					if (current.user.login === loginName) {
						return {
							...previous,
							good: {
								...previous.good,
								number: ++previous.good.number,
								isClicked: true,
								id: current.id,
							},
							total_count: ++previous.total_count,
						};
					} else {
						return {
							...previous,
							good: {
								...previous.good,
								number: ++previous.good.number,
							},
							total_count: ++previous.total_count,
						};
					}
				} else if (current.content === "-1") {
					if (current.user.login === loginName) {
						return {
							...previous,
							bad: {
								...previous.bad,
								number: ++previous.bad.number,
								isClicked: true,
								id: current.id,
							},
							total_count: ++previous.total_count,
						};
					} else {
						return {
							...previous,
							bad: {
								...previous.bad,
								number: ++previous.bad.number,
							},
							total_count: ++previous.total_count,
						};
					}
				} else if (current.content === "laugh") {
					if (current.user.login === loginName) {
						return {
							...previous,
							laugh: {
								...previous.laugh,
								number: ++previous.laugh.number,
								isClicked: true,
								id: current.id,
							},
							total_count: ++previous.total_count,
						};
					} else {
						return {
							...previous,
							laugh: {
								...previous.laugh,
								number: ++previous.laugh.number,
							},
							total_count: ++previous.total_count,
						};
					}
				} else if (current.content === "hooray") {
					if (current.user.login === loginName) {
						return {
							...previous,
							hooray: {
								...previous.hooray,
								number: ++previous.hooray.number,
								isClicked: true,
								id: current.id,
							},
							total_count: ++previous.total_count,
						};
					} else {
						return {
							...previous,
							hooray: {
								...previous.hooray,
								number: ++previous.hooray.number,
							},
							total_count: ++previous.total_count,
						};
					}
				} else if (current.content === "confused") {
					if (current.user.login === loginName) {
						return {
							...previous,
							confused: {
								...previous.confused,
								number: ++previous.confused.number,
								isClicked: true,
								id: current.id,
							},
							total_count: ++previous.total_count,
						};
					} else {
						return {
							...previous,
							confused: {
								...previous.confused,
								number: ++previous.confused.number,
							},
							total_count: ++previous.total_count,
						};
					}
				} else if (current.content === "heart") {
					if (current.user.login === loginName) {
						return {
							...previous,
							heart: {
								...previous.heart,
								number: ++previous.heart.number,
								isClicked: true,
								id: current.id,
							},
							total_count: ++previous.total_count,
						};
					} else {
						return {
							...previous,
							heart: {
								...previous.heart,
								number: ++previous.heart.number,
							},
							total_count: ++previous.total_count,
						};
					}
				} else if (current.content === "rocket") {
					if (current.user.login === loginName) {
						return {
							...previous,
							rocket: {
								...previous.rocket,
								number: ++previous.rocket.number,
								isClicked: true,
								id: current.id,
							},
							total_count: ++previous.total_count,
						};
					} else {
						return {
							...previous,
							rocket: {
								...previous.rocket,
								number: ++previous.rocket.number,
							},
							total_count: ++previous.total_count,
						};
					}
				} else if (current.content === "eyes") {
					if (current.user.login === loginName) {
						return {
							...previous,
							eyes: {
								...previous.eyes,
								number: ++previous.eyes.number,
								isClicked: true,
								id: current.id,
							},
							total_count: ++previous.total_count,
						};
					} else {
						return {
							...previous,
							eyes: {
								...previous.eyes,
								number: ++previous.eyes.number,
							},
							total_count: ++previous.total_count,
						};
					}
				}
			},

			{
				good: { number: 0, isClicked: false },
				bad: { number: 0, isClicked: false },
				confused: { number: 0, isClicked: false },
				eyes: { number: 0, isClicked: false },
				heart: { number: 0, isClicked: false },
				hooray: { number: 0, isClicked: false },
				laugh: { number: 0, isClicked: false },
				rocket: { number: 0, isClicked: false },
				total_count: 0,
			}
		);
	}

	return (
		<div>
			{commentShow ? (
				<CommentBox
					avatar={avatar}
					authorName={authorName}
					createTime={createTime}
					param={{
						boxBlue: param?.boxBlue ? param?.boxBlue : false,
						isFirst: param?.isFirst ? param?.isFirst : false,
						isAuthorized: param?.isAuthorized ? param?.isAuthorized : false,
						reactions: param?.reactions?.content
							? param?.reactions?.content
							: commentReactionsData
							? getReactionsObject()
							: {
									good: { number: 0, isClicked: false },
									bad: { number: 0, isClicked: false },
									confused: { number: 0, isClicked: false },
									eyes: { number: 0, isClicked: false },
									heart: { number: 0, isClicked: false },
									hooray: { number: 0, isClicked: false },
									laugh: { number: 0, isClicked: false },
									rocket: { number: 0, isClicked: false },
									total_count: 0,
							  },
						createReaction: {
							hook: param?.reactions?.issueCreateReaction
								? param?.reactions?.issueCreateReaction
								: createCommentReaction,
							apiParam: param?.reactions?.reactionApiData
								? param?.reactions?.reactionApiData
								: param?.reactions?.commentReactionApiParam,
						},
						deleteReaction: {
							hook: param?.reactions?.issueCreateReaction
								? param?.reactions?.issueDeleteReaction
								: deleteCommentReaction,
							apiParam: param?.reactions?.reactionApiData
								? param?.reactions?.reactionApiData
								: param?.reactions?.commentReactionApiParam,
						},
						editClickFunction: () => setCommentShow(false),
						relation: {
							isOwner: param?.isOwner ? param?.isOwner : false,
							isCollaborator: param?.isCollaborator
								? param?.isCollaborator
								: false,
							isAuthor: param?.isAuthor ? param?.isAuthor : false,
						},
						deleteItemAction: param?.deleteItemAction,
					}}
					showMessage={showMessage}
				/>
			) : (
				<TextAreaBox
					setTextData={() => {}}
					avatar={"https://avatars.githubusercontent.com/u/34449805?v=4"}
					param={{
						closeIssue: { open: false, state: 2 },
						editComment: {
							open: true,
							cancelClickFunction: () => setCommentShow(true),
							updateCommentActionApiHook: param?.updateCommentActionApiHook,
							updateIssueActionApiHook: param?.updateIssueActionApiHook,
							editApiData: param?.editApiData ? param?.editApiData : {},
						},
						submitIssue: {
							submitAction: () => {},
						},
						closeMarkdownSupportTag: true,
						closeContributionsGuideline: true,
						closeTitleInput: true,
						timeline: {
							open: true,
							isFirst: param?.isFirst ? param?.isFirst : false,
						},
						inputData: showMessage,
					}}
				/>
			)}
		</div>
	);
}
