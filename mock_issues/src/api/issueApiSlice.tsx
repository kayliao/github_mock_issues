import { githubApiSlice } from "./githubApiSlice";

const issueApiExtend = githubApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getIssueLists: builder.query({
			query: (repoInfo) => ({
				url: `/repos/${repoInfo.username}/${
					repoInfo.reponame
				}/issues?per_page=25&page=${repoInfo.page}${
					repoInfo?.milestone ? `&milestone=${repoInfo.milestone}` : ""
				}${repoInfo?.state ? `&state=${repoInfo.state}` : ""}${
					repoInfo?.assignee ? `&assignee=${repoInfo.assignee}` : ""
				}${repoInfo?.creator ? `&creator=${repoInfo.creator}` : ""}${
					repoInfo?.mentioned ? `&mentioned=${repoInfo.mentioned}` : ""
				}${repoInfo?.issuelabels ? `&labels=${repoInfo.issuelabels}` : ""}${
					repoInfo?.issuesortby ? `&sort=${repoInfo.issuesortby}` : ""
				}${repoInfo?.direction ? `&direction=${repoInfo.direction}` : ""}${
					repoInfo?.since ? `&since=${repoInfo.since}` : ""
				}`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetIssueListsQuery } = issueApiExtend;
