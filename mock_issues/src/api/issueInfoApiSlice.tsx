import { githubApiSlice } from "./githubApiSlice";

const issueInfoApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getIssueInfo: builder.query({
			query: (issueInfo) => ({
				url: `/repos/${issueInfo.username}/${issueInfo.reponame}/issues/${issueInfo.issuenumber}`,
			}),
			providesTags: ["Issue"],
		}),
		updateIssue: builder.mutation({
			query: (updateInfo) => ({
				url: `/repos/${updateInfo.username}/${updateInfo.reponame}/issues/${updateInfo.issuenumber}`,
				method: "PATCH",
				body: updateInfo.editData, //issue_number,title,body,assignees,state(open,closed),state_reason(completed,not_planned,reopend),labels
			}),
			invalidatesTags: ["Issue"],
		}),
	}),

	overrideExisting: false,
});

export const { useGetIssueInfoQuery, useUpdateIssueMutation } =
	issueInfoApiExtend;
