import CommentBox from "./CommentBox";
import TextAreaBox from "stories/Iconsstories/TextAreaBox";
import { useState } from "react";

export default function CommentItem({ param, showMessage }) {
	const [commentShow, setCommentShow] = useState(true);

	return (
		<div>
			{commentShow ? (
				<CommentBox
					avatar={"https://avatars.githubusercontent.com/u/34449805?v=4"}
					param={{
						boxBlue: param?.boxBlue ? param?.boxBlue : false,
						isFirst: param?.isFirst ? param?.isFirst : false,
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
						editClickFunction: () => setCommentShow(false),
						relation: {
							isOwner: param?.isOwner ? param?.isOwner : false,
							isCollaborator: param?.isCollaborator
								? param?.isCollaborator
								: false,
							isAuthor: param?.isAuthor ? param?.isAuthor : false,
						},
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
						// topTimeline: true,
						// ahook: useGetAssigneeListsQuery,
					}}
				/>
			)}
		</div>
	);
}
