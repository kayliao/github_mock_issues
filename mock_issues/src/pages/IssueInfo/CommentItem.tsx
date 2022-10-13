import CommentBox from "./CommentBox";
import TextAreaBox from "stories/Iconsstories/TextAreaBox";
import { useState } from "react";

export default function CommentItem() {
	const [commentShow, setCommentShow] = useState(true);

	return (
		<div>
			{commentShow ? (
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
						editClickFunction: () => setCommentShow(false),
					}}
					showMessage={"abcd"}
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
						},
						submitIssue: {
							submitAction: () => {},
						},
						closeMarkdownSupportTag: true,
						closeContributionsGuideline: true,
						closeTitleInput: true,
						timeline: {
							open: true,
							isFirst: false,
						},
						// topTimeline: true,
						// ahook: useGetAssigneeListsQuery,
					}}
				/>
			)}
		</div>
	);
}
