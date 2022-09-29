import { XIcon, CheckIcon } from "@primer/octicons-react";

export default function NormalDropList({
	isDisplayDropDown,
	title,
	lists,
	position,
	isCenter,
}) {
	return (
		<div className="sm:relative">
			<div className="text-[14px] sm:text-[12px]">
				<div
					className={`${
						isDisplayDropDown ? "block" : "hidden"
					} fixed left-0 right-0 ${
						isCenter ? "top-auto bottom-auto" : "top-0 bottom-auto"
					} flex p-4 flex-col z-[15] sm:z-[15] sm:absolute sm:top-auto sm:right-auto sm:left-auto sm:bottom-auto sm:p-0 ${
						position === "right" ? "sm:left-0" : "sm:right-0"
					} z-[15]`}
				>
					<div className="h-4/5 mt-0 bg-[#ffffff] border border-solid border-[rgba(0,0,0,0)] rounded-xl sm:border-[hsla(210,18%,87%,1)] sm:h-auto sm:max-h-[480px] sm:mt-2 sm:w-[300px]">
						<header className="flex p-4 items-center border-b border-solid border-b-[hsla(210,18%,87%,1)] sm:pt-[7px] sm:pr-[7px] sm:pb-[7px]">
							<span className="font-semibold flex-1">{title}</span>
							<button className="cursor-pointer p-4 m-[-16px] leading-none rounded-none">
								<XIcon fill={"#57606a"} />
							</button>
						</header>
						<div className="overflow-y-auto max-h-[calc(100%-126px)] sm:max-h-[calc(485px-82px)]">
							{lists.map((element, index) => {
								return (
									<a
										className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b ${
											lists.length - 1 != index ? "border-solid" : "border-none"
										} hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] sm:pt-[7px] sm:pb-[7px]`}
									>
										<div className="flex items-start mr-2">
											<CheckIcon fill={"#000000"} />
										</div>
										<div className="leading-tight min-w-0">
											<div className="flex items-center">
												<div className="font-medium text-[14px] text-[#24292f] truncate sm:pt-[2px]">
													{element}
												</div>
											</div>
										</div>
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
