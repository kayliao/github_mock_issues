import {
	IssueOpenedIcon,
	CommentIcon,
	SkipIcon,
	IssueClosedIcon,
	GitPullRequestIcon,
	GitPullRequestClosedIcon,
} from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";

export default function IssuesListItem({
	issuesItemData,
	currentItemIndex,
	totalItemsCount,
	param,
}) {
	const navigate = useNavigate();

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

	function lightOrDark(bgcolor) {
		if (bgcolor.length === 7) {
			const r = parseInt(bgcolor.slice(1, 3), 16);
			const g = parseInt(bgcolor.slice(3, 5), 16);
			const b = parseInt(bgcolor.slice(5, 7), 16);
			const hsp = r * 0.3 + g * 0.6 + b * 0.1;
			if (hsp > 127.5) {
				return "#000000";
			} else {
				return "#ffffff";
			}
		} else if (bgcolor.length === 4) {
			const r = parseInt(bgcolor.slice(1, 2) + bgcolor.slice(1, 2), 16);
			const g = parseInt(bgcolor.slice(2, 3) + bgcolor.slice(2, 3), 16);
			const b = parseInt(bgcolor.slice(3, 4) + bgcolor.slice(3, 4), 16);
			const hsp = r * 0.3 + g * 0.6 + b * 0.1;
			if (hsp > 127.5) {
				return "#000000";
			} else {
				return "#ffffff";
			}
		}
		if (bgcolor === "#ffff" || "#0000") return "#000000";
	}

	return (
		<>
			<div>
				<div
					className={` px-[16px] py-[8px] flex border-solid border-[#d0d7de] ${
						currentItemIndex === totalItemsCount - 1 ? "border-b-0" : "border-b"
					} hover:bg-[rgba(234,238,242,0.5)] cursor-pointer `}
					onClick={() => {
						navigate(
							`/${param?.username}/${param?.reponame}/issues/${issuesItemData.number}`
						);
					}}
				>
					{issuesItemData?.pull_request ? (
						issuesItemData.state === "open" ? (
							<GitPullRequestIcon className="fill-primary" fill="#127f37" />
						) : (
							<GitPullRequestClosedIcon
								className="fill-primary"
								fill={"#cf222e"}
							/>
						)
					) : issuesItemData.state === "open" ? (
						<IssueOpenedIcon className="fill-primary" fill="#127f37" />
					) : issuesItemData.state_reason === "not_planned" ? (
						<SkipIcon className="fill-primary" fill={"#24292f"} />
					) : (
						<IssueClosedIcon className="fill-primary" fill={"#8250df"} />
					)}

					<div className="px-2 mt-[-3px]">
						<span className="text-[16px] font-semibold leading-[21.6px] mr-[5px] ">
							{issuesItemData.title}
						</span>
						<span className="block lg:inline">
							{issuesItemData.labels.map((label) => {
								return (
									<div
										style={{
											backgroundColor: `#${label.color}`,
											color: `${lightOrDark(`#${label.color}`)}`,
										}}
										className="font-normal text-[12px] inline-block h-[20px] bg-[#dcb5ac] leading-[20px] px-[7px] rounded-[10px] mr-[5px]  "
									>
										{label.name}
									</div>
								);
							})}
						</span>
						{issuesItemData.state === "open" ? (
							<div className="text-text text-sm mt-2">
								{`#${issuesItemData.number} opened ${countRestTime(
									issuesItemData.created_at
								)} by `}
								<a className="cursor-pointer hover:text-[#0969da]">
									{issuesItemData.user.login}
								</a>
							</div>
						) : (
							<div className="text-text text-sm mt-2">
								{`#${issuesItemData.number} by `}
								<a className="cursor-pointer hover:text-[#0969da]">
									{issuesItemData.user.login}
								</a>
								{` ${countRestTime(issuesItemData.closed_at)} was closed `}
							</div>
						)}
					</div>
					<div className="min-w-[20%] hidden sm:flex ml-auto ">
						<div className="flex-1"></div>

						<span className=" relative ml-auto flex flex-1 min-w-[30%] h-[20px] flex-wrap flex-row-reverse">
							{issuesItemData.assignees.map((assignee, index) => {
								const value = index === 0 ? 0 : index === 1 ? 9 : 9 + index * 2;
								return (
									<img
										className={`absolute rounded-[50%] w-[20px] h-[20px] border`}
										style={{
											right: `${value}px`,
											zIndex: issuesItemData.assignees.length - index,
										}}
										src={assignee.avatar_url}
										alt=""
									/>
								);
							})}
						</span>

						<span
							className={`ml-[15px] flex-nowrap flex-1 flex justify-end ${
								issuesItemData.comments === 0 ? "invisible" : "visible"
							}`}
						>
							<CommentIcon size={16} fill={"#57606a"} />
							<span className="ml-[3px] text-[#57606a] text-[8px]">
								{issuesItemData.comments}
							</span>
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
