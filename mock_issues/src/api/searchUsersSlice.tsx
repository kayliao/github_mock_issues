import { githubApiSlice } from "./githubApiSlice";

const searchUsersApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSearchUsersLists: builder.query({
			query: (searchname) => ({
				url: `/search/users?q=${searchname}&per_page=25`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetSearchUsersListsQuery } = searchUsersApiExtend;
