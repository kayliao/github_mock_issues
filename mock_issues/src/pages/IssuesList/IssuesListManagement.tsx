import FilterDropList from "stories/Iconsstories/FilterDropList";
import { useState, useEffect } from "react";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

import {
	CheckIcon,
	IssueOpenedIcon,
	MilestoneIcon,
	SearchIcon,
	TagIcon,
	CommentIcon,
	XIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	IssueClosedIcon,
	GitPullRequestIcon,
	GitPullRequestClosedIcon,
} from "@primer/octicons-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NormalDropList from "stories/Iconsstories/NormalDropList";
import MidHead from "components/MidHead/MidHead";

const sortItemsQueryTable = [
	{
		sort: "created",
		order: "desc",
	},
	{
		sort: "created",
		order: "asc",
	},
	{
		sort: "comments",
		order: "desc",
	},
	{
		sort: "comments",
		order: "asc",
	},
	{
		sort: "updated",
		order: "desc",
	},
	{
		sort: "updated",
		order: "asc",
	},
];

const filterItemsQueryTable = [
	{
		type: "all",
		state: "open",
	},
	{
		type: "issue",
		state: "open",
		author: "@me ",
	},
	{
		type: "pr",
		state: "open",
		author: "@me",
	},
	{
		type: "all",
		assignee: "@me",
		state: "open",
	},
	{
		type: "all",
		mentions: "@me",
		state: "open",
	},
];

export default function IssuesListManagement() {
	const navigate = useNavigate();
	const [noQueryHover, setNoQueryHover] = useState(false);
	const [labelButtonClick, setLabelButtonClick] = useState(false);
	const [assigneeButtonClick, setAssigneeButtonClick] = useState(false);
	const [sortButtonClick, setSortButtonClick] = useState(false);
	const [filterButtonClick, setFilterButtonClick] = useState(false);
	const [IssueListData, setIssueList] = useState(null);
	const [LabelListData, setLabelListData] = useState(null);
	const [AssigneeListData, setAssigneeListData] = useState(null);
	const [selectedLabelList, setSelectedLabelList] = useState([]);
	const [selectedAssignee, setSelectedAssignee] = useState("");
	const [resetQuery, setResetQuery] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [paginationPageSet, setPaginationPageSet] = useState({
		prePages: [],
		middle: [],
		nextPages: [],
	});

	//for large media query, not yet used
	const [paginationPageSetLarge, setPaginationPageSetLarge] = useState({
		prePages: [],
		middle: [],
		nextPages: [],
	});

	const { username, reponame } = useParams();
	const visibility = useSelector(
		(state: RootState) => state.currentRepoInfo.repoInfo.visibility
	);
	const loginAvatar = useSelector(
		(state: RootState) =>
			state.supaBaseInfo.user.identities[0].identity_data.avatar_url
	);
	const loginName = useSelector(
		(state: RootState) =>
			state.supaBaseInfo.user.identities[0].identity_data.user_name
	);

	const [sortOnClickItem, setSortOnClickItem] = useState(0);
	const [filterOnClickItem, setFilterOnClickItem] = useState(-1);

	type queryType = {
		state: string;
		repo: string;
		type: string;
		assignee?: string;
		label?: string[];
		noassignee?: string;
		nolabel?: string;
	};
	const token = useSelector((state: RootState) => state.supaBaseInfo.token);
	const [queryString, setQueryString] = useState<queryType>({
		state: "open",
		repo: `${username}/${reponame}`,
		type: "issue",
	});
	type searchInfoType = {
		q?: string;
		sort?: string;
		order?: string;
		page?: number;
	};
	const [searchInfoObjectPack, setSearchInfoObjectPack] =
		useState<searchInfoType>({
			q: makeQueryString(queryString),
			sort: "created",
			order: "desc",
			page: 1,
		});

	function makeQueryString(stringObjects) {
		let result = "";
		for (let [key, value] of Object.entries(stringObjects)) {
			if (key === "noassignee") result = result + `+no:assignee`;
			else if (key === "nolabel") result = result + `+no:label`;
			else if (key === "label")
				(value as []).forEach((element) => {
					result = result + `+label:${element}`;
				});
			else result = result + `+${key}:${value}`;
		}
		result = result.substring(1);
		return result;
	}

	useEffect(() => {
		async function getAssigneeLists(username, reponame) {
			const res = await fetch(
				`https://api.github.com/repos/${username}/${reponame}/assignees`,
				{
					headers: new Headers({
						Authorization: `Bearer ${token}`,
					}),
				}
			);
			const data = await res.json();
			data?.unshift({
				login: loginName,
				avatar_url: loginAvatar,
			});
			setAssigneeListData(data);
		}
		getAssigneeLists(username, reponame);
	}, []);

	useEffect(() => {
		async function getIssuesLists(searchInfo) {
			const res = await fetch(
				`https://api.github.com/search/issues?per_page=25${
					searchInfo?.page ? `&page=${searchInfo.page}` : ""
				}${searchInfo?.sort ? `&sort=${searchInfo.sort}` : ""}${
					searchInfo?.order ? `&order=${searchInfo.order}` : ""
				}${searchInfo?.q ? `&q=${searchInfo.q}` : ""}`,
				{
					headers: new Headers({
						Authorization: `Bearer ${token}`,
					}),
				}
			);
			const data = await res.json();
			setIssueList(data.items);
			setTotalPages(Math.ceil(data.total_count / 25));
		}
		getIssuesLists(searchInfoObjectPack);
	}, [searchInfoObjectPack, queryString]);

	useEffect(() => {
		const middlePage = Math.ceil(totalPages / 2);

		const pagingSet: {
			prePages: number[];
			middle: number[];
			nextPages: number[];
		} = { prePages: [1], middle: [], nextPages: [totalPages] };
		if (currentPage < middlePage && currentPage > 1) {
			pagingSet.prePages.push(currentPage);
		} else if (
			totalPages % 2 === 0 &&
			(currentPage === middlePage || currentPage === middlePage + 1) &&
			currentPage > 1 &&
			currentPage < totalPages
		) {
			pagingSet.middle.push(currentPage);
		} else if (totalPages % 2 === 1 && currentPage === middlePage) {
			pagingSet.middle.push(currentPage);
		} else if (currentPage > middlePage && currentPage != totalPages) {
			pagingSet.nextPages.unshift(currentPage);
		}
		setPaginationPageSet(pagingSet);
		setSearchInfoObjectPack({ ...searchInfoObjectPack, page: currentPage });
	}, [currentPage, totalPages]);

	useEffect(() => {
		setQueryString({
			state: "open",
			repo: `${username}/${reponame}`,
			type: "issue",
		});
		setSearchInfoObjectPack({
			q: makeQueryString({
				state: "open",
				repo: `${username}/${reponame}`,
				type: "issue",
			}),
			sort: sortItemsQueryTable[0].sort,
			order: sortItemsQueryTable[0].order,
			page: 1,
		});
		setSortOnClickItem(0);
		setFilterOnClickItem(-1);
		setSelectedAssignee("");
		setSelectedLabelList([]);
		setCurrentPage(1);
	}, [resetQuery]);

	useEffect(() => {
		async function getLabelLists(username, reponame) {
			const res = await fetch(
				`https://api.github.com/repos/${username}/${reponame}/labels`,
				{
					headers: new Headers({
						Authorization: `Bearer ${token}`,
					}),
				}
			);
			const data = await res.json();
			setLabelListData(data);
		}
		getLabelLists(username, reponame);
	}, []);

	useEffect(() => {
		setSearchInfoObjectPack({
			...searchInfoObjectPack,
			sort: sortItemsQueryTable[sortOnClickItem].sort,
			order: sortItemsQueryTable[sortOnClickItem].order,
			page: 1,
		});
		setCurrentPage(1);
	}, [sortOnClickItem]);

	useEffect(() => {
		if (filterOnClickItem != -1) {
			setQueryString({
				...filterItemsQueryTable[filterOnClickItem],
				repo: `${username}/${reponame}`,
			});
			setSearchInfoObjectPack({
				...searchInfoObjectPack,
				q: makeQueryString({
					...filterItemsQueryTable[filterOnClickItem],
					repo: `${username}/${reponame}`,
				}),
				page: 1,
			});
			setSortOnClickItem(0);
			setSelectedAssignee("");
			setSelectedLabelList([]);
			setCurrentPage(1);
		}
	}, [filterOnClickItem]);

	useEffect(() => {
		if (
			selectedAssignee != null &&
			selectedAssignee != undefined &&
			selectedAssignee != "Assigned to nobody"
		) {
			const changeQuery = {
				...queryString,
				assignee: selectedAssignee,
			};

			if (changeQuery?.noassignee === "assignee") {
				delete changeQuery.noassignee;
			}

			setQueryString(changeQuery);
			setSearchInfoObjectPack({
				...searchInfoObjectPack,
				q: makeQueryString(changeQuery),
				page: 1,
			});
		}

		if (selectedAssignee === "Assigned to nobody") {
			const changeQuery = {
				...queryString,
				noassignee: "assignee",
			};
			delete changeQuery.assignee;
			setQueryString(changeQuery);
			setSearchInfoObjectPack({
				...searchInfoObjectPack,
				q: makeQueryString(changeQuery),
				page: 1,
			});
		}

		setCurrentPage(1);
	}, [selectedAssignee]);

	useEffect(() => {
		const stringSelectedLabel = JSON.stringify(selectedLabelList);
		if (
			stringSelectedLabel != null &&
			stringSelectedLabel != undefined &&
			stringSelectedLabel != JSON.stringify(["Unlabeled"])
		) {
			const changeQuery = {
				...queryString,
				label: selectedLabelList,
			};

			if (changeQuery?.nolabel === "label") {
				delete changeQuery.nolabel;
			}

			setQueryString(changeQuery);
			setSearchInfoObjectPack({
				...searchInfoObjectPack,
				q: makeQueryString(changeQuery),
				page: 1,
			});
		}

		if (stringSelectedLabel == JSON.stringify(["Unlabeled"])) {
			const changeQuery = {
				...queryString,
				nolabel: "label",
			};
			delete changeQuery.label;
			setQueryString(changeQuery);
			setSearchInfoObjectPack({
				...searchInfoObjectPack,
				q: makeQueryString(changeQuery),
				page: 1,
			});
		}

		setCurrentPage(1);
	}, [selectedLabelList]);

	function countRestTime(timeString) {
		const time = new Date(timeString);
		const timeNow = Date.now();
		const diffTime = timeNow - time.getTime();

		const diffDays = Math.floor(diffTime / (24 * 3600 * 1000));
		let hours, minutes, seconds;
		if (diffDays <= 0) {
			const leave1 = diffTime % (24 * 3600 * 1000);
			hours = Math.floor(leave1 / (3600 * 1000));
			if (hours <= 0) {
				const leave2 = leave1 % (3600 * 1000);
				minutes = Math.floor(leave2 / (60 * 1000));
				if (minutes <= 0) {
					const leave3 = leave2 % (60 * 1000);
					seconds = Math.round(leave3 / 1000);
					return `${seconds} seconds ago`;
				} else {
					return `${minutes} minutes ago`;
				}
			} else {
				return `${hours} hours ago`;
			}
		} else if (diffDays <= 30) {
			return `${diffDays} days ago`;
		} else {
			time.toLocaleString("default", { month: "short" });

			time.toLocaleString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
			});
			return `on ${time.toLocaleString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
			})}`;
		}
	}

	return (
		<>
			<MidHead
				username={username}
				reponame={reponame}
				visibility={visibility}
			/>
			{labelButtonClick ||
			assigneeButtonClick ||
			sortButtonClick ||
			filterButtonClick ? (
				<div
					onClick={() => {
						setLabelButtonClick(false);
						setAssigneeButtonClick(false);
						setSortButtonClick(false);
						setFilterButtonClick(false);
					}}
					className="fixed z-[12] top-0 left-0 right-0 bottom-0 bg-[#1B1F2480] sm:bg-transparent"
				></div>
			) : (
				<></>
			)}
			<div className="mt-6 px-4 flex flex-wrap justify-between text-[14px] leading-[20px] max-w-7xl mx-auto md:px-6 lg:px-8">
				<div className="flex flex-wrap w-full md:flex-nowrap md:h-8 md:mb-4">
					<div className="flex w-full justify-between md:flex-nowrap md:w-auto">
						<div className="flex text-[#24292f] md:ml-auto  md:ml-2 md:pl-2">
							<div>
								<button
									className="py-[4px] px-4 border border-solid borderrounded-l-md border-[#d0d7de] rounded-l-md flex items-center border-r-0 hover:bg-[#f3f4f6]"
									onClick={() => navigate(`/${username}/${reponame}/labels`)}
								>
									<TagIcon size={16} className="left-2 top-[9px]" />
									<span className="mx-[3px]">Labels</span>
									{/* <span className="px-1.5 pt-[2px] bg-[rgba(175,184,193,0.2)] border border-solid border-[rgba(0,0,0,0)] rounded-[2em] text-xs font-medium	leading-[18px] text-[#24292f] text-center hidden md:block">
										{LabelListData?.length}
									</span> */}
								</button>
							</div>
							<div>
								<button className="py-[4px] px-4 border border-solid borderrounded-l-md border-[#d0d7de] rounded-r-md flex items-center flex-nowrap hover:bg-[#f3f4f6]">
									<MilestoneIcon size={16} className="left-2 top-[9px]" />
									<span className="mx-[3px]">MileStones</span>
									{/* <span className="px-1.5 pt-[2px] bg-[rgba(175,184,193,0.2)] border border-solid border-[rgba(0,0,0,0)] rounded-[2em] text-xs font-medium	leading-[18px] text-[#24292f] text-center hidden md:block">
										0
									</span> */}
								</button>
							</div>
						</div>
						<button className="bg-[#2da44e] text-white border border-solid border-[rgba(27,31,36,0.15)] py-[5px] px-4 font-medium whitespace-nowrap rounded-md ml-4 hover:bg-[#2c974b]">
							<span className="hidden md:block">New issue</span>
							<span className="md:hidden">New</span>
						</button>
					</div>
					<div className="flex w-full my-6 md:order-first md:w-auto md:mt-0 md:grow">
						<div onClick={() => setFilterButtonClick((prev) => !prev)}>
							<button className="flex items-center h-8 text-[#24292f] bg-[#f6f8fa] border border-solid border-[rgba(27,31,36,0.15)] shadow-[0 1px 0 rgba(27,31,36,0.04), inset 0 1px 0rgba(255,255,255,0.25)] py-[5px] px-16px  font-medium py-[5px] px-4 rounded-l-md border-r-0 hover:bg-[#f3f4f6]">
								Filters
								<span className="inline-block w-0 h-0 ml-1 mt-1 border-transparent border-t-[#24292f] border-solid border-4 border-b-0 content-['']"></span>
							</button>
							<NormalDropList
								isDisplayDropDown={filterButtonClick}
								title={"Filter Issues"}
								lists={[
									"Open issues and pull requests",
									"Your issues",
									"Your pull requests",
									"Everything assigned to you",
									"Everything mentioning you",
								]}
								position="right"
								isCenter={true}
								clickItemActions={setFilterOnClickItem}
								currentItemIndex={filterOnClickItem}
								cancelActions={() => {
									setFilterButtonClick(true); // weird! need to check
								}}
							/>
						</div>
						<div className="relative w-full">
							<SearchIcon
								size={16}
								className="absolute left-2 top-[9px] fill-[#57606a]"
							/>
							<input
								type="text"
								placeholder="Search all issues"
								defaultValue="is:issue is:open"
								value={makeQueryString(queryString)}
								className="bg-[#f6f8fa] py-[5px] pl-8 pr-3 outline-none border border-solid border-[rgba(27,31,36,0.15)] rounded-r-md focus:border-[#0969da] focus:shadow-[0_0_0_1px_#0969da] w-full text-[#57606a]"
							/>
						</div>
					</div>
				</div>
				{makeQueryString({
					state: "open",
					repo: `${username}/${reponame}`,
					type: "issue",
				}) === makeQueryString(queryString) &&
				sortOnClickItem === 0 &&
				filterOnClickItem === -1 ? (
					<></>
				) : (
					<div
						onMouseEnter={() => setNoQueryHover(true)}
						onMouseLeave={() => setNoQueryHover(false)}
						onClick={() => {
							setResetQuery((prev) => !prev);
						}}
						className="flex cursor-pointer items-center text-[#57606a] font-semibold mb-[16px] w-full hover:text-[#0969da] w-[780px]"
					>
						<div
							className={`h-[18px] w-[18px] ${
								noQueryHover ? "bg-[#0969da]" : "bg-[#617781]"
							} flex justify-center items-center rounded-md p-px mr-[8px]`}
						>
							<XIcon fill={"#ffffff"} />
						</div>
						Clear current search query, filters, and sorts
					</div>
				)}
				<div className="lg:hidden flex items-center cursor-pointer">
					<div
						onClick={() => {
							setQueryString({
								...queryString,
								state: "open",
							});
							setSearchInfoObjectPack({
								...searchInfoObjectPack,
								q: makeQueryString({
									...queryString,
									state: "open",
								}),
								page: 1,
							});
							setFilterOnClickItem(-1);
							setCurrentPage(1);
						}}
					>
						<IssueOpenedIcon
							size={16}
							className={`${
								queryString?.state === "open"
									? "fill-[#000000]"
									: "fill-[#57606a]"
							} mr-1`}
						/>
						<span
							className={
								queryString?.state === "open" ? "font-semibold" : "font-normal"
							}
						>
							Open
						</span>
					</div>
					<div
						className="ml-2.5 cursor-pointer"
						onClick={() => {
							setQueryString({
								...queryString,
								state: "closed",
							});
							setSearchInfoObjectPack({
								...searchInfoObjectPack,
								q: makeQueryString({
									...queryString,
									state: "closed",
								}),
								page: 1,
							});
							setFilterOnClickItem(-1);
							setCurrentPage(1);
						}}
					>
						<CheckIcon
							size={16}
							className={`${
								queryString?.state === "closed"
									? "fill-[#000000]"
									: "fill-[#57606a]"
							} mr-1`}
						/>
						<span
							className={
								queryString?.state === "closed"
									? "font-semibold"
									: "font-normal"
							}
						>
							Closed
						</span>
					</div>
				</div>
			</div>

			<div className="sm:px-4 md:px-6 lg:px-8 xl:max-w-7xl xl:mx-auto ">
				<div className="mt-4 rounded-none sm:rounded-md border border-solid border-[#d0d7de] lg:mt-0">
					<div className="border-b border-solid border-[#d0d7de]">
						<div className="rounded-tl-md rounded-tr-md bg-[#f6f8fa] p-[16px] flex justify-between items-center">
							<h2 className="hidden lg:block">
								<div className="flex items-center cursor-pointer">
									<div
										onClick={() => {
											setQueryString({
												...queryString,
												state: "open",
											});
											setSearchInfoObjectPack({
												...searchInfoObjectPack,
												q: makeQueryString({
													...queryString,
													state: "open",
												}),
												page: 1,
											});
											setFilterOnClickItem(-1);
											setCurrentPage(1);
										}}
									>
										<IssueOpenedIcon
											size={16}
											className={`mb-[2px] mr-1 ${
												queryString?.state === "open"
													? "fill-[#000000]"
													: "fill-[#57606a]"
											}`}
										/>
										<span
											className={
												queryString?.state === "open"
													? "font-semibold"
													: "font-normal"
											}
										>
											Open
										</span>
									</div>
									<div
										className="ml-2.5 cursor-pointer"
										onClick={() => {
											setQueryString({
												...queryString,
												state: "closed",
											});
											setSearchInfoObjectPack({
												...searchInfoObjectPack,
												q: makeQueryString({
													...queryString,
													state: "closed",
												}),
												page: 1,
											});
											setFilterOnClickItem(-1);
											setCurrentPage(1);
										}}
									>
										<CheckIcon
											size={16}
											className={`mb-[2px] ${
												queryString?.state === "closed"
													? "fill-[#000000]"
													: "fill-[#57606a]"
											} mr-1`}
										/>
										<span
											className={
												queryString?.state === "closed"
													? "font-semibold"
													: "font-normal"
											}
										>
											Closed
										</span>
									</div>
								</div>
							</h2>
							<div className="flex justify-between sm:justify-start lg:justify-end grow text-sm text-[#57606a]">
								<div className="px-[16px] cursor-pointer">
									Author
									<span className="hidden sm:inline-block align-middle border-solid border-x-4 border-t-4 border-x-transparent border-b-transparent ml-1" />
								</div>
								<div className="px-[16px] cursor-pointer">
									<div onClick={() => setLabelButtonClick((prev) => !prev)}>
										Label
										<span className="hidden sm:inline-block align-middle border-solid border-x-4 border-t-4 border-x-transparent border-b-transparent ml-1" />
									</div>
									<FilterDropList
										type={"label"}
										Lists={LabelListData}
										isDisplayDropDown={labelButtonClick}
										setSelectedList={setSelectedLabelList}
										cancelActions={() => setLabelButtonClick(false)}
										selectedList={selectedLabelList}
									/>
								</div>
								<div className="px-[16px] hidden md:block cursor-pointer">
									Projects
									<span className="hidden sm:inline-block align-middle border-solid border-x-4 border-t-4 border-x-transparent border-b-transparent ml-1" />
								</div>
								<div className="px-[16px] hidden md:block cursor-pointer">
									Milestones
									<span className="hidden sm:inline-block align-middle border-solid border-x-4 border-t-4 border-x-transparent border-b-transparent ml-1" />
								</div>
								<div className="px-[16px] cursor-pointer">
									<div onClick={() => setAssigneeButtonClick((prev) => !prev)}>
										Assignee
										<span className="hidden sm:inline-block align-middle border-solid border-x-4 border-t-4 border-x-transparent border-b-transparent ml-1" />
									</div>
									<FilterDropList
										type={"assignee"}
										Lists={AssigneeListData}
										isDisplayDropDown={assigneeButtonClick}
										setSelectedList={setSelectedAssignee}
										cancelActions={() => setAssigneeButtonClick(false)}
										selectedList={selectedAssignee}
									/>
								</div>
								<div className="px-[16px] cursor-pointer">
									<div
										onClick={() => {
											setSortButtonClick((prev) => !prev);
										}}
									>
										Sort
										<span className="hidden sm:inline-block align-middle border-solid border-x-4 border-t-4 border-x-transparent border-b-transparent ml-1" />
									</div>
									<NormalDropList
										isDisplayDropDown={sortButtonClick}
										title={"Sort by"}
										lists={[
											"Newest",
											"Oldest",
											"Most commented",
											"Least commented",
											"Recently updated",
											"Least recently updated",
										]}
										position={"left"}
										isCenter={false}
										clickItemActions={setSortOnClickItem}
										currentItemIndex={sortOnClickItem}
										cancelActions={() => setSortButtonClick(false)}
									/>
								</div>
							</div>
						</div>
					</div>
					{IssueListData?.length != 0 ? (
						IssueListData?.map((element, index) => {
							return (
								<>
									<div>
										<div
											className={` px-[16px] py-[8px] flex border-solid border-[#d0d7de] ${
												index === IssueListData.length - 1
													? "border-b-0"
													: "border-b"
											} hover:bg-[rgba(234,238,242,0.5)]`}
										>
											{element?.pull_request ? (
												element.state === "open" ? (
													<GitPullRequestIcon
														className="fill-primary"
														fill="#127f37"
													/>
												) : (
													<GitPullRequestClosedIcon
														className="fill-primary"
														fill={"#cf222e"}
													/>
												)
											) : element.state === "open" ? (
												<IssueOpenedIcon
													className="fill-primary"
													fill="#127f37"
												/>
											) : (
												<IssueClosedIcon
													className="fill-primary"
													fill={"#8250df"}
												/>
											)}

											<div className="px-2 mt-[-3px]">
												<span className="text-[16px] font-semibold leading-[21.6px] mr-[5px] ">
													{element.title}
												</span>
												<span className="block lg:inline">
													{element.labels.map((label) => {
														return (
															<div
																style={{ backgroundColor: `#${label.color}` }}
																className="font-normal text-[12px] inline-block h-[20px] bg-[#dcb5ac] leading-[20px] px-[7px] rounded-[10px] mr-[5px]  "
															>
																{label.name}
															</div>
														);
													})}
												</span>
												{element.state === "open" ? (
													<div className="text-text text-sm mt-2">
														{`#${element.number} opened ${countRestTime(
															element.created_at
														)} by `}
														<a className="cursor-pointer hover:text-[#0969da]">
															{element.user.login}
														</a>
													</div>
												) : (
													<div className="text-text text-sm mt-2">
														{`#${element.number} by `}
														<a className="cursor-pointer hover:text-[#0969da]">
															{element.user.login}
														</a>
														{` ${countRestTime(element.closed_at)} was closed `}
													</div>
												)}
											</div>
											<div className="min-w-[20%] hidden sm:flex ml-auto ">
												<div className="flex-1"></div>

												<span className=" relative ml-auto flex flex-1 min-w-[30%] h-[20px] flex-wrap flex-row-reverse">
													{element.assignees.map((assignee, index) => {
														const value =
															index === 0 ? 0 : index === 1 ? 9 : 9 + index * 2;
														return (
															<img
																className={`absolute rounded-[50%] w-[20px] h-[20px] border`}
																style={{
																	right: `${value}px`,
																	zIndex: element.assignees.length - index,
																}}
																src={assignee.avatar_url}
																alt=""
															/>
														);
													})}
												</span>

												<span className="ml-[15px] flex-nowrap flex-1 flex justify-end">
													<CommentIcon size={16} fill={"#57606a"} />
													<span className="ml-[3px] text-[#57606a] text-[8px]">
														{element.comments}
													</span>
												</span>
											</div>
										</div>
									</div>
								</>
							);
						})
					) : (
						<div className="max-w-3xl mx-auto">
							<div className="py-20 px-10 relative text-center">
								<IssueOpenedIcon
									size={24}
									fill={"#57606a"}
									className="mx-1 mb-2"
								/>
								<h3 className="my-4 text-[24px] leading-[1.5] font-semibold">
									No results matched your search.
								</h3>
								<p className="text-[16px] text-[#57606a] mt-[0px] mb-[10px]">
									You could search
									<a className="cursor-pointer text-[#0969da]">
										{" "}
										all of GitHub
									</a>{" "}
									or try an
									<a className="cursor-pointer text-[#0969da]">
										{" "}
										advanced search
									</a>
									.
								</p>
							</div>
						</div>
					)}
				</div>
				{totalPages > 1 ? (
					<div className="flex justify-center items-center text-sm my-4 px-1">
						<button
							disabled={currentPage === 1 ? true : false}
							className={`grid place-items-center grid-flow-col ${
								currentPage === 1 ? "text-[#8c959f]" : "text-[#0969da]"
							} flex items-center py-5px px-2.5 border border-solid border-transparent hover:border-primary-border hover:rounded-md ${
								currentPage === 1 ? "" : "cursor-pointer"
							}`}
							onClick={() => setCurrentPage((prev) => prev - 1)}
						>
							<ChevronLeftIcon size={16} className="mr-1" />
							<span>Previous</span>
						</button>
						{paginationPageSet.prePages.map((page) => {
							return (
								<div
									className={`grid rounded-md place-items-center text-primary-text h-[32px] py-5px px-2.5 min-w-[32px] border border-solid border-transparent hover:border-[#d0d7de] hover:rounded-md cursor-pointer ${
										page === currentPage
											? "text-[#ffffff] border-[#0969da] bg-[#0969da]"
											: "text-[#000000]"
									}`}
									onClick={() => setCurrentPage(page)}
								>
									{page}
								</div>
							);
						})}
						{totalPages > 2 ? (
							<span className="py-5px px-2.5 min-w-[32px] text-[#8c959f]">
								...
							</span>
						) : (
							<></>
						)}
						{paginationPageSet.middle.map((page) => {
							return (
								<div
									className={`cursor-pointer rounded-md grid place-items-center text-primary-text py-5px px-2.5 min-w-[32px] h-[32px] border border-solid border-transparent hover:border-[#d0d7de] hover:rounded-md cursor-pointer ${
										page === currentPage
											? "text-[#ffffff] border-[#0969da] bg-[#0969da]"
											: "text-[#000000]"
									}`}
									onClick={() => setCurrentPage(page)}
								>
									{page}
								</div>
							);
						})}
						{JSON.stringify(paginationPageSet.middle) != JSON.stringify([]) ? (
							<span className="py-5px px-2.5 min-w-[32px] text-[#8c959f]">
								...
							</span>
						) : (
							<></>
						)}
						{paginationPageSet.nextPages.map((page) => {
							return (
								<div
									className={`grid rounded-md place-items-center text-primary-text h-[32px] py-5px px-2.5 min-w-[32px] border border-solid border-transparent hover:border-[#d0d7de] hover:rounded-md cursor-pointer ${
										page === currentPage
											? "text-[#ffffff] border-[#0969da] bg-[#0969da]"
											: "text-[#000000]"
									}`}
									onClick={() => setCurrentPage(page)}
								>
									{page}
								</div>
							);
						})}
						<button
							disabled={currentPage === totalPages ? true : false}
							className={`grid place-items-center grid-flow-col ${
								currentPage === totalPages ? "text-[#8c959f]" : "text-[#0969da]"
							} flex items-center py-5px px-2.5 border border-solid border-transparent hover:border-primary-border hover:rounded-md ${
								currentPage === totalPages ? "" : "cursor-pointer"
							}`}
							onClick={() => setCurrentPage((prev) => prev + 1)}
						>
							<span>Next</span>
							<ChevronRightIcon size={16} className="ml-1" />
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	);
}
