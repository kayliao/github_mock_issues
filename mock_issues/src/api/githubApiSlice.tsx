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
			headers.set("If-None-Match", "");

			return headers;
		},
	}),
	tagTypes: ["Labels", "Issue", "Comment", "Reactions", "IssueReactions"],
	endpoints: (builder) => ({}),
});
