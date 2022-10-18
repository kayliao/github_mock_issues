import { githubApiSlice } from "./githubApiSlice";

const githubApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLabelLists: builder.query({
			query: (repoInfo) => ({
				url: `/repos/${repoInfo.username}/${repoInfo.reponame}/labels`,
			}),
			providesTags: ["Labels"],
		}),
		deleteLabel: builder.mutation({
			query: (deleteInfo) => ({
				url: `/repos/${deleteInfo.username}/${deleteInfo.reponame}/labels/${deleteInfo.labelname}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Labels"],
		}),
		updateLabel: builder.mutation({
			query: (updateInfo) => ({
				url: `/repos/${updateInfo.username}/${updateInfo.reponame}/labels/${updateInfo.labelname}`,
				method: "PATCH",
				body: updateInfo.editData,
			}),
			invalidatesTags: ["Labels"],
		}),
		createLabel: builder.mutation({
			query: (createInfo) => ({
				url: `/repos/${createInfo.username}/${createInfo.reponame}/labels`,
				method: "POST",
				body: createInfo.createLabelData,
			}),
			invalidatesTags: ["Labels"],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetLabelListsQuery,
	useDeleteLabelMutation,
	useUpdateLabelMutation,
	useCreateLabelMutation,
} = githubApiExtend;
