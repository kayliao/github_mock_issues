import { githubApiSlice } from "./githubApiSlice";

const issueTimelineApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getIssueTimeline: builder.query({
			query: (issueInfo) => ({
				url: `/repos/${issueInfo.username}/${issueInfo.reponame}/issues/${issueInfo.issuenumber}/timeline?per_page=100`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetIssueTimelineQuery } = issueTimelineApiExtend;
