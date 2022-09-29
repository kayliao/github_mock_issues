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
		// 	getLabelLists: builder.query({
		// 		query: (repoInfo) => ({
		// 			url: `/repos/${repoInfo.username}/${repoInfo.reponame}/labels`,
		// 		}),
		// 		providesTags: ["Labels"],
		// 	}),
		// 	deleteLabel: builder.mutation({
		// 		query: (deleteInfo) => ({
		// 			url: `/repos/${deleteInfo.username}/${deleteInfo.reponame}/labels/${deleteInfo.labelname}`,
		// 			method: "DELETE",
		// 		}),
		// 		invalidatesTags: ["Labels"],
		// 	}),
		// 	updateLabel: builder.mutation({
		// 		query: (updateInfo) => ({
		// 			url: `/repos/${updateInfo.username}/${updateInfo.reponame}/labels/${updateInfo.labelname}`,
		// 			method: "PATCH",
		// 			body: updateInfo.editData,
		// 		}),
		// 		invalidatesTags: ["Labels"],
		// 	}),
		// 	createLabel: builder.mutation({
		// 		query: (createInfo) => ({
		// 			url: `/repos/${createInfo.username}/${createInfo.reponame}/labels`,
		// 			method: "POST",
		// 			body: createInfo.createLabelData,
		// 		}),
		// 		invalidatesTags: ["Labels"],
		// 	}),
		// 	getIssueLists: builder.query({
		// 		query: (repoInfo) => ({
		// 			url: `/repos/${repoInfo.username}/${
		// 				repoInfo.reponame
		// 			}/issues?per_page=25&page=${repoInfo.page}${
		// 				repoInfo?.milestone ? `&milestone=${repoInfo.milestone}` : ""
		// 			}${repoInfo?.state ? `&state=${repoInfo.state}` : ""}${
		// 				repoInfo?.assignee ? `&assignee=${repoInfo.assignee}` : ""
		// 			}${repoInfo?.creator ? `&creator=${repoInfo.creator}` : ""}${
		// 				repoInfo?.mentioned ? `&mentioned=${repoInfo.mentioned}` : ""
		// 			}${repoInfo?.issuelabels ? `&labels=${repoInfo.issuelabels}` : ""}${
		// 				repoInfo?.issuesortby ? `&sort=${repoInfo.issuesortby}` : ""
		// 			}${repoInfo?.direction ? `&direction=${repoInfo.direction}` : ""}${
		// 				repoInfo?.since ? `&since=${repoInfo.since}` : ""
		// 			}`,
		// 		}),
		// 	}),
		// }),
	}),
});

// export const {
// 	useGetIssueListsQuery,
// } = githubApiSlice;
