import { XIcon, CheckIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";

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
										? setSelectedList(["Unlabeled"])
										: setSelectedList("Assigned to nobody");
									cancelActions();
								}}
							>
								<div className="flex items-start mr-2">
									<CheckIcon
										className={`${
											type === "label"
												? selectedList.includes("Unlabeled")
													? "fill-[#000000]"
													: "fill-[#ffffff]"
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
								inputFilterLists?.map((element, index) => {
									return (
										<div
											className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b ${
												inputFilterLists.length - 1 != index
													? "border-solid"
													: "border-none"
											} hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] sm:pt-[7px] sm:pb-[7px]`}
											onClick={() => {
												type === "label"
													? setSelectedList((prev) => {
															let newArr = [...prev];
															if (newArr.includes("Unlabeled"))
																newArr = newArr.filter((e) => e != "Unlabeled");
															if (newArr.includes(element.name)) {
																return newArr.filter((e) => e != element.name);
															} else {
																newArr.push(element.name);
																return newArr;
															}
													  })
													: setSelectedList(element.login);
												cancelActions();
											}}
										>
											{type === "label" ? (
												<div className="flex items-start mr-2">
													<CheckIcon
														className={`${
															selectedList.includes(element.name)
																? "fill-[#000000]"
																: "fill-[#ffffff]"
														}`}
													/>
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
								<div className="flex justify-center p-4 ">
									<div role="status">
										<svg
											className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
