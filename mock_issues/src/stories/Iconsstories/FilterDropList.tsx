import { TriangleDownIcon, XIcon, CheckIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
// import { useGetLabelListsQuery } from "../../api/githubApiSlice";

export default function FilterDropList({
	type,
	Lists,
	isDisplayDropDown,
	setSelectedList,
	selectedList,
	cancelActions,
}) {
	const [inputFilterLists, setInputFilterLists] = useState(Lists);

	useEffect(() => {
		setInputFilterLists(Lists);
	}, [Lists]);

	return (
		<div className="sm:relative">
			<div className="text-[14px] sm:text-[12px]">
				{/* <button className=" text-[#57606a] cursor-pointer flex justify-center items-center text-sm hover:text-[#24292f]">
					<span>Label</span>
					<TriangleDownIcon />
				</button> */}
				<div
					className={`${
						isDisplayDropDown ? "block" : "hidden"
					} fixed top-0 left-0 right-0 bottom-0 flex p-4 flex-col z-[15] sm:z-[15] sm:absolute sm:top-auto sm:right-auto sm:left-auto sm:bottom-auto sm:p-0 lg:right-0 z-[15]`}
				>
					<div className="h-4/5 mt-0 bg-[#ffffff] border border-solid border-[rgba(0,0,0,0)] rounded-xl sm:border-[hsla(210,18%,87%,1)] sm:h-auto sm:max-h-[480px] sm:mt-2 sm:w-[300px]">
						<header className="flex p-4 items-center border-b border-solid border-b-[hsla(210,18%,87%,1)] sm:pt-[7px] sm:pr-[7px] sm:pb-[7px]">
							<span className="font-semibold flex-1">
								{type === "label"
									? "Filter by Label"
									: "Filter by who’s assigned"}
							</span>
							<button
								className="cursor-pointer p-4 m-[-16px] leading-none rounded-none"
								onClick={cancelActions}
							>
								<XIcon fill={"#57606a"} />
							</button>
						</header>
						<div className="p-4 m-0 border-b border-solid border-b-[hsla(210,18%,87%,1)] sm:p-2">
							<input
								placeholder="Filter labels"
								className="block w-full py-[5px] px-[12px] text-sm leading-5 rounded-md border border-solid border-[#d0d7de] focus:border focus:border-solid focus:border-[#0969da] focus:outline-none focus:shadow-innerblue"
								onChange={(e) => {
									if (type === "label") {
										if (e.target.value === "" || e.target.value === null) {
											setInputFilterLists(Lists);
											return;
										}
										const newList = Lists.filter((element) => {
											return (
												element?.name?.includes(e.target.value) ||
												element?.description?.includes(e.target.value)
											);
										});
										setInputFilterLists(newList);
									} else {
										if (e.target.value === "" || e.target.value === null) {
											setInputFilterLists(Lists);
											return;
										}
										const newList = Lists.filter((element) => {
											return element?.login?.includes(e.target.value);
										});
										setInputFilterLists(newList);
									}
								}}
							/>
						</div>
						<div className="overflow-y-auto max-h-[calc(100%-126px)] sm:max-h-[calc(485px-89px)]">
							<div
								className="flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-solid border-b-[hsla(210,18%,87%,1)] sm:pt-[7px] sm:pb-[7px] hover:bg-[rgba(234,238,242,0.5)]"
								onClick={() => {
									type === "label"
										? setSelectedList(["no:label"])
										: setSelectedList("Assigned to nobody");
									cancelActions();
								}}
							>
								<div className="flex items-start mr-2">
									<CheckIcon
										className={`${
											type === "label"
												? "fill-[#00000]"
												: selectedList === "Assigned to nobody"
												? "fill-[#000000]"
												: "fill-[#ffffff]"
										}`}
									/>
								</div>
								<span className="font-semibold">
									{type === "label" ? "Unlabeled" : "Assigned to nobody"}
								</span>
							</div>
							{inputFilterLists ? (
								inputFilterLists.map((element, index) => {
									return (
										<div
											className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b ${
												inputFilterLists.length - 1 != index
													? "border-solid"
													: "border-none"
											} hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] sm:pt-[7px] sm:pb-[7px]`}
											onClick={() => {
												type === "label"
													? setSelectedList((prev) => [...prev, element.name])
													: setSelectedList(element.login);
												cancelActions();
											}}
										>
											{type === "label" ? (
												<div className="flex items-start mr-2">
													<CheckIcon fill={"#000000"} />
												</div>
											) : (
												<div className="flex items-start mr-2">
													<CheckIcon
														className={`${
															selectedList === element.login
																? "fill-[#000000]"
																: "fill-[#ffffff]"
														}`}
													/>
												</div>
											)}
											{type === "label" ? (
												<span
													style={{ backgroundColor: `#${element?.color}` }}
													className={`mt-px rounded-[2em] w-[1em] h-[1em] mr-2 text-[14px]`}
												/>
											) : (
												<img
													src={element.avatar_url}
													className={`shadow-[0_0px_0px_1px_rgba(27,31,36,0.15)] mt-px rounded-[2em] w-[1em] h-[1em] mr-2 text-[14px]`}
												/>
											)}
											<div className="leading-tight min-w-0">
												<div className="flex items-center">
													<div className="font-semibold text-[#24292f] truncate sm:pt-[2px]">
														{type === "label" ? element.name : element.login}
													</div>
													{/* {element?.usercustomname != "" ? (
													<div className="font-normal text-[#57606a] ml-2 truncate sm:pt-[2px]">
														{element?.des}
													</div>
												) : (
													<></>
												)} */}
												</div>
												{element?.description != "" ? (
													<div className="font-medium text-[#57606a] mt-1 truncate sm:w-[210px]">
														{element?.description}
													</div>
												) : (
													<></>
												)}
											</div>
										</div>
									);
								})
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
