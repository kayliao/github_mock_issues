import { githubApiSlice } from "./githubApiSlice";

const issueCommentReactionApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getReactionInfo: builder.query({
			query: (reactionInfo) => ({
				url: `/repos/${reactionInfo.username}/${reactionInfo.reponame}/issues/comments/${reactionInfo.commentid}/reactions`,
			}),
			providesTags: ["Reactions"],
		}),
		deleteReaction: builder.mutation({
			query: (deleteInfo) => ({
				url: `/repos/${deleteInfo.username}/${deleteInfo.reponame}/issues/comments/${deleteInfo.commentid}/reactions/${deleteInfo.reactionid}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Reactions"],
		}),
		createReaction: builder.mutation({
			query: (createInfo) => ({
				url: `/repos/${createInfo.username}/${createInfo.reponame}/issues/comments/${createInfo.commentid}/reactions`,
				method: "POST",
				body: createInfo.editData, //content:'heart(+1,-1,laugh,confused,heart,hooray,rocket,eyes)'
			}),
			invalidatesTags: ["Reactions"],
		}),
	}),

	overrideExisting: false,
});

export const {
	useGetReactionInfoQuery,
	useDeleteReactionMutation,
	useCreateReactionMutation,
} = issueCommentReactionApiExtend;
