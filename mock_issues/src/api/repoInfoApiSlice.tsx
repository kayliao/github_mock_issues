import { githubApiSlice } from "./githubApiSlice";

const repoInfoApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRepoInfo: builder.query({
			query: (repoInfo) => ({
				url: `/repos/${repoInfo.username}/${repoInfo.reponame}`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetRepoInfoQuery } = repoInfoApiExtend;
