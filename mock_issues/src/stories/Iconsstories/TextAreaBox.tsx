import { useState } from "react";
import ButtonShare from "./ButtonShare";
import {
	TypographyIcon,
	ChevronUpIcon,
	ChevronDownIcon,
	QuoteIcon,
	CodeIcon,
	LinkIcon,
	MentionIcon,
	ImageIcon,
	CrossReferenceIcon,
	ReplyIcon,
	HeadingIcon,
	BoldIcon,
	ItalicIcon,
	ListUnorderedIcon,
	ListOrderedIcon,
	TasklistIcon,
	InfoIcon,
	MarkdownIcon,
} from "@primer/octicons-react";

export default function TextAreaBox({ param }) {
	const [writeOnClick, setWriteOnClick] = useState(true);
	const [smallScreenMarkItemShowOnClick, setSmallScreenMarkItemShowOnClick] =
		useState(true);

	function autoAdjustTextArea(target) {
		target.style.height = "1px";
		target.style.height = target.scrollHeight + "px";
		// console.log(o.target.style.height);
	}

	return (
		<div className="w-[inherit] flex">
			<div className="hidden mr-4 shrink-0 md:block">
				<span>
					<a className="cursor-pointer">
						<img
							src="https://avatars.githubusercontent.com/u/34449805?s=80&v=4"
							className="w-[40px] h-[40px] rounded-[50%] overflow-hidden shadow-[0_0_0_1px_rgba(27,31,36,0.15)]"
						/>
					</a>
				</span>
			</div>
			<div>
				<div
					className="md:relative md:border md:border-solid md:border-[#d0d7de] md:rounded-md md:before:absolute md:before:top-[11px] md:before:right-[100%] md:before:left-[-14px] md:before:block md:before:w-[8px] md:before:h-[16px] md:before:content-[''] md:before:border-[7px] md:before:border-solid md:before:border-[transparent] md:before:border-r-[#d0d7de]
        md:after:absolute md:after:top-[11px] md:after:right-[100%] md:after:left-[-13px] md:after:block md:after:w-[8px] md:after:h-[16px] md:after:content-[''] md:after:border-[7px] md:after:border-solid md:after:border-[transparent] md:after:border-r-[#ffffff]
        "
				>
					<div className="mb-4 md:p-2 md:mb-2">
						<input
							autoComplete="off"
							placeholder="Title"
							className="py-[5px] px-[12px] text-[16px] leading-5 bg-no-repeat border border-solid border-[#d0d7de] rounded-[6px] shadow-[inset_0_1px_0_rgba(208,215,222,0.2)] text-[#24292f] w-[100%] bg-[#f6f8fa] focus:bg-[#ffffff] focus:border-[#0969da] focus:outline-0 focus:shadow-[inset_0_0_0_1px_#0969da]"
						/>
					</div>
					<div className="flex flex-wrap w-[100%] mb-2">
						<div className="w-[100%] md:px-2 md:border-b md:border-solid md:border-[#d0d7de] lg:flex lg:justify-between">
							<div className="lg:flex">
								<button
									className={`text-[14px] ${
										writeOnClick ? "text-[#24292f]" : "text-[#57606a]"
									} font-normal px-[40px] py-[8px] border border-solid border-[#d0d7de] w-[50%] ${
										writeOnClick
											? "border-b-[0px] md:rounded-t-md"
											: "md:border-none"
									} ${
										writeOnClick
											? "bg-[#ffffff]"
											: "bg-[#f6f8fa] md:bg-[#ffffff]"
									} md:w-[auto]`}
									onClick={() => setWriteOnClick(true)}
								>
									Write
								</button>
								<button
									className={`text-[14px] ${
										!writeOnClick ? "text-[#24292f]" : "text-[#57606a]"
									} font-normal px-[40px] py-[8px] border border-solid border-[#d0d7de] border-l-0 flex-1 ${
										!writeOnClick
											? "bg-[#ffffff]"
											: "bg-[#f6f8fa] md:bg-[#ffffff]"
									} w-[50%] ${
										!writeOnClick
											? "border-b-[0px] md:rounded-t-md md:border-l-[1px]"
											: "md:border-none"
									} md:w-[auto]`}
									onClick={() => setWriteOnClick(false)}
								>
									Preview
								</button>
							</div>
							<div className="hidden whitespace-nowrap px-2 pt-2 flex-wrap items-start justify-between w-[100%] lg:flex">
								<div className="w-[100%] flex flex-wrap">
									<button className="group p-1 ml-[5px]">
										<HeadingIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 ml-[5px]">
										<BoldIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 ml-[5px]">
										<ItalicIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 ml-[5px]">
										<QuoteIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 ml-[5px]">
										<CodeIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 ml-[5px]">
										<LinkIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 ml-[5px]">
										<ListUnorderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 ml-[5px]">
										<ListOrderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 ml-[5px]">
										<TasklistIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 mx-1">
										<MentionIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 mx-1">
										<CrossReferenceIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-1 mx-1">
										<ReplyIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
								</div>
							</div>
						</div>
						<div className="flex whitespace-nowrap px-2 pt-2 flex-wrap items-start justify-between w-[100%] md:hidden">
							<button
								onClick={() =>
									setSmallScreenMarkItemShowOnClick((prev) => !prev)
								}
								className="group py-2 px-1 ml-[5px] mr-[4px]"
							>
								<TypographyIcon className="group-hover:fill-[#0969da] fill-[#57606a] mr-1" />
								{smallScreenMarkItemShowOnClick ? (
									<ChevronDownIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								) : (
									<ChevronUpIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								)}
							</button>
							<div>
								<button className="group p-2 ml-[5px]">
									<QuoteIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-2 ml-[5px]">
									<CodeIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-2 ml-[5px]">
									<LinkIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<div className="hidden xs:inline-block">
									<button className="group p-2 mx-1">
										<MentionIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-2 mx-1">
										<ImageIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-2 mx-1">
										<CrossReferenceIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-2 mx-1">
										<ReplyIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
								</div>
							</div>
							<div className="w-[100%] xs:hidden">
								<button className="group p-2 mx-1">
									<MentionIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-2 mx-1">
									<ImageIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-2 mx-1">
									<CrossReferenceIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-2 mx-1">
									<ReplyIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
							</div>
							{smallScreenMarkItemShowOnClick ? (
								<div className="w-[100%] flex flex-wrap">
									<button className="group p-2 pl-[4px] mx-1 ml-[5px]">
										<HeadingIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-2 ml-[5px]">
										<BoldIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-2 ml-[5px]">
										<ItalicIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-2 ml-[5px]">
										<ListUnorderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-2 ml-[5px]">
										<ListOrderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
									<button className="group p-2 ml-[5px]">
										<TasklistIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
									</button>
								</div>
							) : (
								<></>
							)}
						</div>
						<div className="hidden whitespace-nowrap px-2 pt-2 flex-wrap items-start justify-between w-[100%] md:flex lg:hidden">
							<div className="w-[100%] flex flex-wrap">
								<button className="group p-1 ml-[5px]">
									<HeadingIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 ml-[5px]">
									<BoldIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 ml-[5px]">
									<ItalicIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 ml-[5px]">
									<QuoteIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 ml-[5px]">
									<CodeIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 ml-[5px]">
									<LinkIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 ml-[5px]">
									<ListUnorderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 ml-[5px]">
									<ListOrderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 ml-[5px]">
									<TasklistIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 mx-1">
									<MentionIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 mx-1">
									<CrossReferenceIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
								<button className="group p-1 mx-1">
									<ReplyIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
								</button>
							</div>
						</div>
					</div>
					<div className="w-[100%]">
						<div className="break-words text-[14px] w-[100%] md:p-2 md:pt-0">
							<div
								tabIndex={0}
								className="md:border md:border-solid md:border-[#d0d7de] md:shadow-[inset_0_1px_0_rgba(208,215,222,0.2)] md:rounded-t-md md:border-b-0"
							>
								<textarea
									placeholder="Leave a comment"
									onKeyUp={(e) => autoAdjustTextArea(e.target)}
									className="block max-h-[100%] h-auto resize-none overflow-hidden p-2 rounded-md text-[14px] bg-[#f6f8fa] h-[200px] min-h-[200px] border border-solid border-[#d0d7de] shadow-[inset_0_1px_0_rgba(208,215,222,0.2)] bg-no-repeat w-[100%] outline-0 focus:border-[#0969da] focus:shadow-[inset_0_0_0_1px_#0969da] focus:bg-[#ffffff] md:border-0 md:border-b-[1px] md:border-dashed md:rounded-none md:focus:shadow-none md:focus:border-b-[1px] md:focus:border-dashed md:focus:border-[#0969da]"
								></textarea>
							</div>
							<label
								htmlFor="uploadFile"
								className="hidden cursor-pointer bg-[#f6f8fa] md:relative md:flex md:border md:border-solid md:border-[#d0d7de] md:justify-between md:font-normal md:py-[7px] md:px-[10px] md:rounded-b-md md:border-t-[0px]"
							>
								<input
									id="uploadFile"
									type="file"
									title=" "
									accept=".gif,.jpeg,.jpg,.mov,.mp4,.png,.svg,.webm,.csv,.docx,.fodg,.fodp,.fods,.fodt,.gz,.log,.md,.odf,.odg,.odp,.ods,.odt,.pdf,.pptx,.tgz,.txt,.xls,.xlsx,.zip"
									className="hidden bg-[#f6f8fa] overflow-hidden md:absolute md:min-h-[0px] md:ml-0 md:w-[100%] md:inset-0 md:p-[5px] "
								></input>
								<span className="relative pr-2">
									<span className="font-normal text-[13px] text-[#57606a]">
										Attach files by dragging & dropping, selecting or pasting
										them.
									</span>
								</span>
								<a
									href="https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
									className="relative"
								>
									<MarkdownIcon className="fill-[#57606a] hover:fill-[#0969da]" />
								</a>
							</label>
						</div>
					</div>
					<div className="hidden md:flex mx-2 mb-2">
						<div className="group flex flex-auto items-center">
							<a
								href="https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
								className="group-hover:text-[#0969da] text-[12px] text-[#57606a]"
							>
								<MarkdownIcon className="group-hover:fill-[#0969da] inline-block mr-[6px] overflow-visible align-bottom" />
								Styling with Markdown is supported
							</a>
						</div>
						<ButtonShare
							textColor={"#ffffff"}
							backgroundColor={"#2da44e"}
							textSize={"14px"}
							displayText={"Submit new issue"}
							borderColor={"rgba(27,31,36,0.15)"}
							hoverColor={"#2c974b"}
							hoverBorderColor={"rgba(27,31,36,0.15)"}
							isAble={false}
							onClickFunc={() => {}}
						/>
					</div>
					{param?.closeIssue?.open ? (
						<div>
							<div className="flex justify-end break-words">
								<div className="flex justify-center mr-1">
									<button className="text-[14px] text-[#24292f] bg-[#f6f8fa] py-[5px] px-[16px] rounded-l-md border border-solid border-[rgba(27,31,36,0.15)]">
										Close issue
									</button>
									<button className="text-center bg-[#f6f8fa] py-[5px] px-[16px] rounded-r-md  border border-solid border-[rgba(27,31,36,0.15)] border-l-[0px]">
										<span className=" text-[14px] inline-block w-0 h-0 mb-[2px] border-transparent border-t-[#24292f] border-solid border-4 border-b-0 content-['']"></span>
									</button>
								</div>
								<ButtonShare
									textColor={"#ffffff"}
									backgroundColor={"#2da44e"}
									textSize={"14px"}
									displayText={"Comment"}
									borderColor={"rgba(27,31,36,0.15)"}
									hoverColor={"#2c974b"}
									hoverBorderColor={"rgba(27,31,36,0.15)"}
									isAble={false}
									onClickFunc={() => {}}
								/>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
				<div className="text-[12px] mt-[12px] mb-6 text-[#57606a] md:m-2">
					<InfoIcon className="fill-[#57606a] mr-1" />
					Remember, contributions to this repository should follow our
					<a
						href="https://docs.github.com/articles/github-community-guidelines"
						className="text-[#0969da] hover:underline"
					>
						{" "}
						GitHub Community Guidelines
					</a>
					.
				</div>
			</div>
		</div>
	);
}
