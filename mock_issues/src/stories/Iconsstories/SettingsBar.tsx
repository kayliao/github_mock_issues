import {
	GearIcon,
	BellSlashIcon,
	BellIcon,
	LockIcon,
	PinIcon,
	InfoIcon,
	ArrowRightIcon,
	TrashIcon,
} from "@primer/octicons-react";
import { useState, useEffect } from "react";
import SideBarDropList from "./SideBarDropList";
import Label from "./Label";
import { useNavigate } from "react-router-dom";

export default function SettingsBar({
	param,
	username,
	reponame,
	assigneeList,
	labelList,
	setBarData,
}) {
	const navigate = useNavigate();

	const [assigneesOnClick, setAssigneesOnClick] = useState(false);
	const [assigneeSelected, setAssigneeSelected] = useState([]);
	const [labelsOnClick, setLabelsOnClick] = useState(false);
	const [labelsSelected, setLabelsSelected] = useState([]);

	useEffect(() => {
		setBarData({ assignees: assigneeSelected, labels: labelsSelected });
	}, [assigneeSelected, labelsSelected]);

	return (
		<div>
			<div className="w-[100%] md:w-[240px] lg:w-[256px]">
				<div className="pt-4 relative">
					<div
						onClick={() => setAssigneesOnClick((prev) => !prev)}
						className="group cursor-pointer flex items-center justify-between py-1 mt-[-4px] mb-1"
					>
						<span className="group-hover:text-[#0969da] text-[12px] text-[#57606a] font-semibold">
							Assignees
						</span>
						<GearIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
					</div>

					<SideBarDropList
						param={{
							subtitle: "Suggestions",
							openItemClose: false,
							allClearTitle: "Clear assignees",
						}}
						inputTitle={"Type or choose a user"}
						title={"Assign up to 10 people to this issue"}
						isDisplayDropDown={assigneesOnClick}
						listData={assigneeList}
						settingSelectData={setAssigneeSelected}
					/>

					{assigneeSelected?.length != 0 ? (
						assigneeList.map((element) => {
							if (assigneeSelected.includes(element.name)) {
								return (
									<div className="flex items-center mb-[10px]">
										<img
											src={element.avatar_url}
											className={`shadow-[0_0px_0px_1px_rgba(27,31,36,0.15)] rounded-[2em] w-[20px] h-[20px] mr-1 text-[14px]`}
										/>
										<span className="text-[#24292f] text-[12px] font-semibold">
											{element.name}
										</span>
									</div>
								);
							}
							return <></>;
						})
					) : (
						<div className="flex items-center text-[12px]">
							<span className="text-[#24292f]">No one—</span>
							<button className="text-[#57606a] hover:text-[#0969da]">
								assign yourself
							</button>
						</div>
					)}
				</div>

				<div className="relative pt-4 mt-4 border-t-[1px] border-solid border-[hsla(210,18%,87%,1)]">
					<div
						className="group cursor-pointer flex items-center justify-between py-1 mt-[-4px] mb-1"
						onClick={() => setLabelsOnClick((prev) => !prev)}
					>
						<span className="group-hover:text-[#0969da] text-[12px] text-[#57606a] font-semibold">
							Labels
						</span>
						<GearIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
					</div>

					<SideBarDropList
						param={{
							openItemClose: true,
							linkTitle: "Edit labels",
							linkFunction: () => navigate(`/${username}/${reponame}/labels`),
						}}
						inputTitle={"Filter labels"}
						title={"Apply labels to this issue"}
						isDisplayDropDown={labelsOnClick}
						listData={labelList}
						settingSelectData={setLabelsSelected}
					/>

					{labelsSelected?.length != 0 ? (
						<div className="flex flex-wrap">
							{labelList.map((element) => {
								if (labelsSelected.includes(element.name)) {
									return (
										<div className="mr-1 mb-1">
											<Label
												backgroundColor={element.color}
												labelName={element.name}
											/>
										</div>
									);
								}
								return <></>;
							})}
						</div>
					) : (
						<div className="flex items-center text-[12px]">
							<span className="text-[#24292f]">None yet</span>
						</div>
					)}
				</div>

				<div className="pt-4 mt-4 border-t-[1px] border-solid border-[hsla(210,18%,87%,1)]">
					<div className="group cursor-pointer flex items-center justify-between py-1 mt-[-4px] mb-1">
						<span className="group-hover:text-[#0969da] text-[12px] text-[#57606a] font-semibold">
							Projects
						</span>
						<GearIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
					</div>
					<div className="flex items-center text-[12px]">
						<span className="text-[#24292f]">None yet</span>
					</div>
				</div>

				<div className="pt-4 mt-4 border-t-[1px] border-solid border-[hsla(210,18%,87%,1)]">
					<div className="group cursor-pointer flex items-center justify-between py-1 mt-[-4px] mb-1">
						<span className="group-hover:text-[#0969da] text-[12px] text-[#57606a] font-semibold">
							Milestone
						</span>
						<GearIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
					</div>
					<div className="flex items-center text-[12px]">
						<span className="text-[#24292f]">No milestone</span>
					</div>
				</div>

				{param?.openDevelop ? (
					<div className="pt-4 mt-4 border-t-[1px] border-solid border-[hsla(210,18%,87%,1)]">
						<div className="group cursor-pointer flex items-center justify-between py-1 mt-[-4px] mb-1">
							<span className="group-hover:text-[#0969da] text-[12px] text-[#57606a] font-semibold">
								Development
							</span>
							<GearIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
						</div>
						<div className="flex items-center text-[12px] flex-wrap">
							<button className="text-[#0969da] hover:underline hover:decoration-[#0969da]">
								Create a branch&nbsp;
							</button>
							<span className="text-[#24292f] break-words">
								for this issue or link a pull request.
							</span>
						</div>
					</div>
				) : (
					<div className="pt-4 mt-4 border-t-[1px] border-solid border-[hsla(210,18%,87%,1)]">
						<div className=" flex items-center justify-between py-1 mt-[-4px] mb-1">
							<span className=" text-[12px] text-[#57606a] font-semibold">
								Development
							</span>
						</div>
						<div className="flex items-center text-[12px]">
							<span className="text-[#24292f]">
								Shows branches and pull requests linked to this issue.
							</span>
						</div>
					</div>
				)}

				{param?.Notifications.open ? (
					<div className="pt-4 mt-4 border-t-[1px] border-solid border-[hsla(210,18%,87%,1)]">
						<div className="group cursor-pointer flex items-center justify-between py-1 mt-[-4px] mb-1">
							<span className="group-hover:text-[#0969da] text-[12px] text-[#57606a] font-semibold">
								Notifications
							</span>
							<span className="group-hover:text-[#0969da] text-[12px] text-[#57606a]">
								Customize
							</span>
						</div>
						<div className="flex items-center text-[12px] ">
							<button className="border border-solid border-[#rgba(27,31,36,0.15)] leading-5 rounded-md text-[#24292f] whitespace-nowrap font-medium px-[12px] py-[3px] text-center w-[100%] bg-[#f6f8fa] shadow-[0_1px_0_rgba(27,31,36,0.04),inset_0_1px_0_rgba(255,255,255,0.25)]">
								{param?.Notifications?.subscribe ? (
									<BellSlashIcon className="fill-[#24292f] mr-2" />
								) : (
									<BellIcon className="fill-[#24292f] mr-2" />
								)}
								{param?.Notifications?.subscribe ? "Unsubscribe" : "Subscribe"}
							</button>
						</div>
						<div className="mt-1">
							<span className="text-[#57606a] text-[12px]">
								{param?.Notifications?.subscribe
									? "You're receiving notifications because you're watching this repository."
									: "You're not receiving notifications from this thread."}
							</span>
						</div>
					</div>
				) : (
					<></>
				)}

				{param?.Participant?.open ? (
					<div className="pt-4 mt-4 border-t-[1px] border-solid border-[hsla(210,18%,87%,1)]">
						<div className="flex items-center justify-between py-1 mt-[-4px] mb-1">
							<span className=" text-[12px] text-[#57606a] font-semibold">
								1 participant
							</span>
						</div>
						<div className="flex items-center text-[12px]">
							<a className="cursor-pointer">
								<img
									src="https://avatars.githubusercontent.com/u/105163825?s=52&v=4"
									className="shadow-[0_0_0_1px_rgba(27,31,36,0.15)] mt-[4px] ml-[4px] w-[26px] h-[26px] rounded-[50%]"
								/>
							</a>
						</div>
					</div>
				) : (
					<></>
				)}
				{param?.IssueActions?.open ? (
					<div>
						<div className="pt-4 mt-4 border-t-[1px] border-solid border-[hsla(210,18%,87%,1)]">
							<div>
								<div className="group cursor-pointer">
									<LockIcon className="group-hover:fill-[#0969da] mr-1 fill-[#24292f]" />
									<span className="group-hover:text-[#0969da] text-[12px] font-semibold">
										Lock conversation
									</span>
								</div>
							</div>
						</div>
						<div className="pt-4">
							<div>
								<div className="group cursor-pointer">
									<PinIcon className="group-hover:fill-[#0969da] mr-1 fill-[#24292f]" />
									<span className="group-hover:text-[#0969da] text-[12px] font-semibold">
										Pin issue
									</span>
									<InfoIcon className="ml-1 fill-[#24292f]" />
								</div>
							</div>
						</div>
						<div className="pt-4">
							<div>
								<div className="group cursor-pointer">
									<ArrowRightIcon className="group-hover:fill-[#0969da] mr-1 fill-[#24292f]" />
									<span className="group-hover:text-[#0969da] text-[12px] font-semibold">
										Transfer issue
									</span>
								</div>
							</div>
						</div>
						<div className="pt-4">
							<div>
								<div className="group cursor-pointer">
									<TrashIcon className="group-hover:fill-[#0969da] mr-1 fill-[#24292f]" />
									<span className="group-hover:text-[#0969da] text-[12px] font-semibold">
										Delete issue
									</span>
								</div>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
