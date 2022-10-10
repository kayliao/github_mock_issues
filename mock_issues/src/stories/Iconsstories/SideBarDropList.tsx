import { PencilIcon, XIcon, CheckIcon } from "@primer/octicons-react";
import { useState, useEffect } from "react";

export default function SideBarDropList({
	isDisplayDropDown,
	title,
	inputTitle,
	param,
	listData,
	settingSelectData,
}) {
	const [selectedData, setSelectedData] = useState<string[]>([]);
	const [inputFilterLists, setInputFilterLists] = useState(listData);

	// console.log("sidebar data", selectedData);
	useEffect(() => {
		settingSelectData(selectedData);
	}, [isDisplayDropDown]);

	return (
		<div className="smd:relative">
			<div className="text-[14px] smd:text-[12px]">
				<div
					className={`${
						isDisplayDropDown ? "block" : "hidden"
					} fixed top-0 left-0 right-0 bottom-0 flex p-4 flex-col z-[100] smd:z-[1] smd:absolute smd:top-auto smd:left-auto smd:bottom-auto smd:p-0 lg:right-0`}
				>
					<div className="h-4/5 mt-0 bg-[#ffffff] border border-solid border-[rgba(0,0,0,0)] rounded-md smd:border-[hsla(210,18%,87%,1)] smd:h-auto smd:max-h-[480px] smd:mt-[3px] smd:w-[300px]">
						<header className="flex p-4 items-center border-b border-solid border-b-[hsla(210,18%,87%,1)] smd:pt-[7px] smd:pr-[7px] smd:pb-[7px]">
							<span className="font-semibold flex-1">{title}</span>
							<button className="cursor-pointer p-4 m-[-16px] leading-none rounded-none smd:hidden">
								<XIcon fill={"#57606a"} />
							</button>
						</header>
						<div className="p-4 m-0 border-b border-solid border-b-[hsla(210,18%,87%,1)] sm:p-2">
							<input
								placeholder={inputTitle}
								className="block w-full py-[5px] px-[12px] text-sm leading-5 rounded-md border border-solid border-[#d0d7de] focus:border focus:border-solid focus:border-[#0969da] focus:outline-none focus:shadow-innerblue"
								onChange={(e) => {
									if (e.target.value === "" || e.target.value === null) {
										setInputFilterLists(listData);
										return;
									}
									const newList = listData?.filter((element) => {
										return element?.name?.includes(e.target.value);
									});
									setInputFilterLists(newList);
								}}
							/>
						</div>
						<div
							className={`overflow-y-auto max-h-[calc(100%-126px)] ${
								param?.linkTitle
									? "smd:max-h-[calc(485px-124px)]"
									: "smd:max-h-[calc(485px-82px)]"
							}`}
						>
							{selectedData?.length != 0 &&
							param?.allClearTitle != "" &&
							param?.allClearTitle != null ? (
								<div
									className="flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-solid border-b-[hsla(210,18%,87%,1)] smd:pt-[7px] smd:pb-[7px]"
									onClick={() => {
										setSelectedData([]);
									}}
								>
									<div className="flex items-start mr-2">
										<XIcon fill={"#000000"} />
									</div>
									<div>{param.allClearTitle}</div>
								</div>
							) : (
								<></>
							)}

							{listData
								?.filter((element) => {
									return selectedData.includes(element.name);
								})
								.map((element, index) => {
									return (
										<div
											className={`relative flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b ${
												listData.length - 1 != index
													? "border-solid"
													: "border-none"
											} hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] smd:pr-[8px] smd:pt-[8px] smd:pb-[8px]`}
											onClick={() => {
												selectedData.includes(element?.name)
													? setSelectedData(
															selectedData.filter((name) => {
																return element.name != name;
															})
													  )
													: setSelectedData([...selectedData, element.name]);
											}}
											key={element.name}
										>
											<div className="flex items-start mr-2">
												<CheckIcon
													fill={
														selectedData?.includes(element?.name)
															? "#000000"
															: "#ffffff"
													}
												/>
											</div>
											<div>
												<div className="flex">
													{element?.avatar_url ? (
														<img
															src={element.avatar_url}
															className={`shadow-[0_0px_0px_1px_rgba(27,31,36,0.15)] mt-px rounded-[2em] w-[1em] h-[1em] mr-2 text-[14px]`}
														/>
													) : (
														<span
															style={{ backgroundColor: `${element.color}` }}
															className={`mt-px rounded-[2em] w-[1em] h-[1em] mr-2 text-[14px]`}
														/>
													)}
													<div className="leading-tight min-w-0">
														<div className="flex items-center">
															<div
																className={`${
																	param?.openItemClose
																		? "font-normal"
																		: "font-semibold"
																} text-[#24292f] truncate sm:pt-[2px]`}
															>
																{element?.name}
															</div>
															{element?.usercustomname != "" ? (
																<div className="font-normal text-[#57606a] ml-2 truncate sm:pt-[2px]">
																	{element.usercustomname}
																</div>
															) : (
																<></>
															)}
														</div>
													</div>
													{param?.openItemClose ? (
														<button className="absolute cursor-pointer py-4 m-[-16px] leading-none rounded-none right-0 ml-2 mr-[10px]">
															<XIcon fill={"#57606a"} />
														</button>
													) : (
														<></>
													)}
												</div>
												{element?.des != "" ? (
													<div className="max-w-[257px] font-medium text-[#57606a] mt-1 truncate">
														{element.des}
													</div>
												) : (
													<></>
												)}
											</div>
										</div>
									);
								})}
							{param?.subtitle && selectedData?.length != listData?.length ? (
								<div className="flex bg-[#f6f8fa] items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-solid border-b-[hsla(210,18%,87%,1)] smd:pt-[7px] smd:pb-[7px]">
									<span className="font-semibold">{param.subtitle}</span>
								</div>
							) : (
								<></>
							)}

							{inputFilterLists
								?.filter((element) => {
									return !selectedData.includes(element.name);
								})
								.map((element, index) => {
									return (
										<div
											className={`relative flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b ${
												listData.length - 1 != index
													? "border-solid"
													: "border-none"
											} hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] smd:pr-[8px] smd:pt-[8px] smd:pb-[8px]`}
											onClick={() => {
												selectedData.includes(element?.name)
													? setSelectedData(
															selectedData.filter((name) => {
																return element.name != name;
															})
													  )
													: setSelectedData([...selectedData, element.name]);
											}}
											key={element.name}
										>
											<div className="flex items-start mr-2">
												<CheckIcon
													fill={
														selectedData?.includes(element?.name)
															? "#000000"
															: "#ffffff"
													}
												/>
											</div>
											<div>
												<div className="flex">
													{element?.avatar_url ? (
														<img
															src={element.avatar_url}
															className={`shadow-[0_0px_0px_1px_rgba(27,31,36,0.15)] mt-px rounded-[2em] w-[1em] h-[1em] mr-2 text-[14px]`}
														/>
													) : (
														<span
															style={{ backgroundColor: `${element.color}` }}
															className={`mt-px rounded-[2em] w-[1em] h-[1em] mr-2 text-[14px]`}
														/>
													)}
													<div className="leading-tight min-w-0">
														<div className="flex items-center">
															<div
																className={`${
																	param?.openItemClose
																		? "font-normal"
																		: "font-semibold"
																} text-[#24292f] truncate sm:pt-[2px]`}
															>
																{element?.name}
															</div>
															{element?.usercustomname != "" ? (
																<div className="font-normal text-[#57606a] ml-2 truncate sm:pt-[2px]">
																	{element.usercustomname}
																</div>
															) : (
																<></>
															)}
														</div>
													</div>
													{param?.openItemClose ? (
														<button className="absolute cursor-pointer py-4 m-[-16px] leading-none rounded-none right-0 ml-2 mr-[10px]">
															<XIcon fill={"#57606a"} />
														</button>
													) : (
														<></>
													)}
												</div>
												{element?.des != "" ? (
													<div className="max-w-[257px] font-medium text-[#57606a] mt-1 truncate">
														{element.des}
													</div>
												) : (
													<></>
												)}
											</div>
										</div>
									);
								})}
						</div>
						{param?.linkTitle ? (
							<div
								className="flex border-t border-solid border-[hsla(210,18%,87%,1)] rounded-b-md items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer smd:p-2 smd:pl-[39px] hover:bg-[rgba(234,238,242,0.5)]"
								onClick={() => param?.linkFunction()}
							>
								<div className="flex items-center">
									<PencilIcon className="fill-[#57606a] mr-1" />
									<span className="font-normal text-[#57606a]">
										{param.linkTitle}
									</span>
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
