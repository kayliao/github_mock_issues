import { githubApiSlice } from "./githubApiSlice";

const issueCommentApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCommentInfo: builder.query({
			query: (issueInfo) => ({
				url: `/repos/${issueInfo.username}/${issueInfo.reponame}/issues/${issueInfo.issuenumber}/comments?per_page=100`,
			}),
			providesTags: ["Comment"],
		}),
		updateComment: builder.mutation({
			query: (updateInfo) => ({
				url: `/repos/${updateInfo.username}/${updateInfo.reponame}/issues/comments/${updateInfo.commentid}`,
				method: "PATCH",
				body: updateInfo.editData,
			}),
			invalidatesTags: ["Comment"],
		}),
		deleteComment: builder.mutation({
			query: (deleteInfo) => ({
				url: `/repos/${deleteInfo.username}/${deleteInfo.reponame}/issues/comments/${deleteInfo.commentid}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Comment"],
		}),
		createComment: builder.mutation({
			query: (createInfo) => ({
				url: `/repos/${createInfo.username}/${createInfo.reponame}/issues/${createInfo.issuenumber}/comments`,
				method: "POST",
				body: createInfo.editData,
			}),
			invalidatesTags: ["Comment"],
		}),
	}),

	overrideExisting: false,
});

export const {
	useGetCommentInfoQuery,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
	useCreateCommentMutation,
} = issueCommentApiExtend;
