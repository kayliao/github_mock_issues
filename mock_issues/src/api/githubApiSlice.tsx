import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const githubApiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.github.com",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).supaBaseInfo.token;

			// If we have a token set in state, let's assume that we should be passing it.
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			headers.set("Accept", "application/vnd.github+json");

			return headers;
		},
	}),
	tagTypes: ["Labels"],
	endpoints: (builder) => ({
		getLabelLists: builder.query({
			query: (repoInfo) => ({
				url: `/repos/${repoInfo.username}/${repoInfo.reponame}/labels`,
				// headers: {
				// 	Accept: "application/vnd.github+json",
				// 	Authorization: `Bearer ${token}`,
				// },
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
});

export const {
	useGetLabelListsQuery,
	useDeleteLabelMutation,
	useUpdateLabelMutation,
	useCreateLabelMutation,
} = githubApiSlice;
