import { githubApiSlice } from "./githubApiSlice";

const assigneeApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAssigneeLists: builder.query({
			query: (repoInfo) => ({
				url: `/repos/${repoInfo.username}/${repoInfo.reponame}/assignees`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetAssigneeListsQuery } = assigneeApiExtend;
