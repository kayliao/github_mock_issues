import { githubApiSlice } from "./githubApiSlice";

const issueReactionApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getIssueReactionInfo: builder.query({
			query: (reactionInfo) => ({
				url: `/repos/${reactionInfo.username}/${reactionInfo.reponame}/issues/${reactionInfo.issuenumber}/reactions`,
			}),
			providesTags: ["IssueReactions"],
		}),
		deleteIssueReaction: builder.mutation({
			query: (deleteInfo) => ({
				url: `/repos/${deleteInfo.username}/${deleteInfo.reponame}/issues/${deleteInfo.issuenumber}/reactions/${deleteInfo.reactionid}`,
				method: "DELETE",
			}),
			invalidatesTags: ["IssueReactions"],
		}),
		createIssueReaction: builder.mutation({
			query: (createInfo) => ({
				url: `/repos/${createInfo.username}/${createInfo.reponame}/issues/${createInfo.issuenumber}/reactions`,
				method: "POST",
				body: createInfo.editData, //content:'heart(+1,-1,laugh,confused,heart,hooray,rocket,eyes)'
			}),
			invalidatesTags: ["IssueReactions"],
		}),
	}),

	overrideExisting: false,
});

export const {
	useGetIssueReactionInfoQuery,
	useDeleteIssueReactionMutation,
	useCreateIssueReactionMutation,
} = issueReactionApiExtend;
