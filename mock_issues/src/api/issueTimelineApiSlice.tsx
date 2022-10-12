import { githubApiSlice } from "./githubApiSlice";

const issueTimelineApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getIssueTimeline: builder.query({
			query: (issueInfo) => ({
				url: `/repos/${issueInfo.username}/${issueInfo.reponame}/issues/${issueInfo.issuenumber}/timeline`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetIssueTimelineQuery } = issueTimelineApiExtend;
