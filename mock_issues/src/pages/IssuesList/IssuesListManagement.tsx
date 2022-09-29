import FilterDropList from "stories/Iconsstories/FilterDropList";
import { useState } from "react";
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
	TriangleDownIcon,
} from "@primer/octicons-react";
import { useGetIssueListsQuery } from "api/issueApiSlice";
import { useGetLabelListsQuery } from "api/labelApiSlice";
import { useGetAssigneeListsQuery } from "api/assigneeApiSlice";
import { useParams } from "react-router-dom";
import NormalDropList from "stories/Iconsstories/NormalDropList";

export default function IssuesListManagement() {
	const [noQueryHover, setNoQueryHover] = useState(false);
	const [labelButtonClick, setLabelButtonClick] = useState(false);
	const [assigneeButtonClick, setAssigneeButtonClick] = useState(false);
	const [sortButtonClick, setSortButtonClick] = useState(false);
	const [filterButtonClick, setFilterButtonClick] = useState(false);

	const { username, reponame } = useParams();
	const initialSearchInput = ["is:issue", "is:open"];

	const {
		data: IssueListData,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetIssueListsQuery({
		username: username,
		reponame: reponame,
		state: "all",
		page: 2,
	});

	const {
		data: LabelListData,
		isSuccess: labelSuccess,
		isLoading: labelIsLoading,
		isError: labelError,
	} = useGetLabelListsQuery({
		username: username,
		reponame: reponame,
	});

	const { data: AssigneeListData } = useGetAssigneeListsQuery({
		username: username,
		reponame: reponame,
	});

	if (isSuccess) {
		console.log(IssueListData);
	}
	if (labelSuccess) {
		console.log(LabelListData);
	}
	if (labelError) {
		console.log(LabelListData);
	}

	if (isLoading) {
		console.log("why you are loading");
	}

	if (labelIsLoading) {
		console.log("is loading");
	}

	console.log(AssigneeListData);

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
								<button className="py-[4px] px-4 border border-solid borderrounded-l-md border-[#d0d7de] rounded-l-md flex items-center hover:bg-[#f3f4f6]">
									<TagIcon size={16} className="left-2 top-[9px]" />
									<span className="mx-[3px]">Labels</span>
									<span className="px-1.5 pt-[2px] bg-[rgba(175,184,193,0.2)] border border-solid border-[rgba(0,0,0,0)] rounded-[2em] text-xs font-medium	leading-[18px] text-[#24292f] text-center hidden md:block">
										{LabelListData.length}
									</span>
								</button>
							</div>
							<div>
								<button className="py-[4px] px-4 border border-solid borderrounded-l-md border-[#d0d7de] rounded-r-md flex items-center flex-nowrap hover:bg-[#f3f4f6]">
									<MilestoneIcon size={16} className="left-2 top-[9px]" />
									<span className="mx-[3px]">MileStones</span>
									<span className="px-1.5 pt-[2px] bg-[rgba(175,184,193,0.2)] border border-solid border-[rgba(0,0,0,0)] rounded-[2em] text-xs font-medium	leading-[18px] text-[#24292f] text-center hidden md:block">
										0
									</span>
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
							<button className="flex items-center h-8 text-[#24292f] bg-[#f6f8fa] border border-solid border-[rgba(27,31,36,0.15)] shadow-[0 1px 0 rgba(27,31,36,0.04), inset 0 1px 0rgba(255,255,255,0.25)] py-[5px] px-16px  font-medium py-[5px] px-4 rounded-l-md hover:bg-[#f3f4f6]">
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
								value="is:issue is:open"
								className="bg-[#f6f8fa] py-[5px] pl-8 pr-3 border border-solid border-[rgba(27,31,36,0.15)] rounded-r-md shadow-[inset 0 1px 0 rgb(208 215 222 / 20%)] w-full text-[#57606a]"
							/>
						</div>
					</div>
				</div>
				<a
					onMouseEnter={() => setNoQueryHover(true)}
					onMouseLeave={() => setNoQueryHover(false)}
					className="flex items-center text-[#57606a] font-semibold mb-[16px] w-full hover:text-[#0969da] w-[780px]"
				>
					<div
						className={`h-[18px] w-[18px] ${
							noQueryHover ? "bg-[#0969da]" : "bg-[#617781]"
						} flex justify-center items-center rounded-md p-px mr-[8px]`}
					>
						<XIcon fill={"#ffffff"} />
					</div>
					Clear current search query, filters, and sorts
				</a>
				<div className="lg:hidden flex items-center">
					<a href="#/">
						<IssueOpenedIcon size={16} className="mr-1" />
						<span className="font-semibold">Open</span>
					</a>
					<a href="#/" className="ml-2.5">
						<CheckIcon size={16} className="fill-[#57606a] mr-1" />
						<span className="">Closed</span>
					</a>
				</div>
			</div>

			<div className="sm:px-4 md:px-6 lg:px-8 xl:max-w-7xl xl:mx-auto ">
				<div className="mt-4 rounded-none sm:rounded-md border border-solid border-[#d0d7de] lg:mt-0">
					<div className="border-b border-solid border-[#d0d7de]">
						<div className="rounded-tl-md rounded-tr-md bg-[#f6f8fa] p-[16px] flex justify-between items-center">
							<h2 className="hidden lg:block">
								<div className="flex items-center">
									<a href="#/">
										<IssueOpenedIcon size={16} className="mb-[2px] mr-1" />
										<span className="font-semibold">Open</span>
									</a>
									<a href="#/" className="ml-2.5">
										<CheckIcon
											size={16}
											className="mb-[2px] fill-[#57606a] mr-1"
										/>
										<span className="">Closed</span>
									</a>
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
								<div
									onClick={() => setAssigneeButtonClick((prev) => !prev)}
									className="px-[16px] cursor-pointer"
								>
									Assignee
									<span className="hidden sm:inline-block align-middle border-solid border-x-4 border-t-4 border-x-transparent border-b-transparent ml-1" />
									<FilterDropList
										type={"assignee"}
										Lists={AssigneeListData}
										isDisplayDropDown={assigneeButtonClick}
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
									/>
								</div>
							</div>
						</div>
					</div>
					{IssueListData ? (
						IssueListData.map((element, index) => {
							return (
								<>
									<div>
										<div className=" px-[16px] py-[8px] flex border-b border-solid border-[#d0d7de] hover:bg-[rgba(234,238,242,0.5)]">
											{element.state === "open" ? (
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
																className="font-semibold inline-block h-[20px] bg-[#dcb5ac] leading-[20px] px-[7px] rounded-[10px] mr-[5px]  "
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

				<div className="flex justify-center items-center text-sm my-4 px-1">
					<button className="grid place-items-center grid-flow-col	text-[#8c959f] flex items-center py-5px px-2.5 border border-solid border-transparent hover:border-primary-border hover:rounded-md cursor-pointer">
						<ChevronLeftIcon size={16} className="mr-1" />
						<span>Previous</span>
					</button>
					{/* {pagination.prePages.map((page) => {
						return (
							<a className="grid place-items-center text-primary-text py-5px px-2.5 min-w-[32px] border border-solid border-transparent hover:border-primary-border hover:rounded-md cursor-pointer">
								{page}
							</a>
						);
					})} */}
					{/* <span className="py-5px px-2.5 min-w-[32px]">...</span>
					{pagination.middle.map((page) => {
						return (
							<a className="grid place-items-center text-primary-text py-5px px-2.5 min-w-[32px] border border-solid border-transparent hover:border-primary-border hover:rounded-md cursor-pointer">
								{page}
							</a>
						);
					})} */}
					{/* <span className="py-5px px-2.5 min-w-[32px]">...</span> */}
					{/* {pagination.nextPages.map((page) => {
						return (
							<a className="grid place-items-center text-primary-text py-5px px-2.5 min-w-[32px] border border-solid border-transparent hover:border-primary-border hover:rounded-md cursor-pointer">
								{page}
							</a>
						);
					})} */}
					<button className="grid place-items-center grid-flow-col text-[#0969da] flex items-center py-5px px-2.5 border border-solid border-transparent hover:border-primary-border hover:rounded-md cursor-pointer">
						<span>Next</span>
						<ChevronRightIcon size={16} className="ml-1" />
					</button>
				</div>
			</div>
		</>
	);
}
