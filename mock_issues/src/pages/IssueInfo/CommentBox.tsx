import { KebabHorizontalIcon, SmileyIcon } from "@primer/octicons-react";
import { marked } from "marked";
import "../../prose.css";
import { useRef } from "react";

export default function CommentBox({
	avatar,
	showMessage,
	param,
	authorName,
	createTime,
}) {
	const commentBoxActionsRef = useRef(null);
	const topSmileListRef = useRef(null);
	const bottomSmileListRef = useRef(null);

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

	const renderer = {
		listitem(text: string, booleantask: boolean, checked: boolean) {
			if (checked !== undefined) {
				return `<li class='check'>${text}</li>`;
			}
			return `<li>${text}</li>`;
		},
		paragraph(text: string) {
			const mentionText = text.match(/^\@/g);
			const hashText = text.match(/^\#/g);
			if (!hashText && !mentionText) {
				return `<p>${text}</p>`;
			}
			return `<button ${
				mentionText ? "class=mention" : "class=hash"
			}>${text}</button>`;
		},
	};

	marked.use({ renderer });

	marked.setOptions({ breaks: true, gfm: true, langPrefix: "hljs language-" });

	return (
		<div className="w-[inherit]">
			<div
				className={`relative flex before:absolute before:top-0 before:bottom-0 before:left-5 md:before:left-20 before:z-[-1] before:content-[''] before:w-[2px] before:bg-[#d8dee4] ${
					param?.isFirst ? "pb-[16px]" : "py-[16px]"
				}`}
			>
				<div className="hidden mr-4 shrink-0 md:block">
					<span>
						<a className="cursor-pointer">
							<img
								src={avatar}
								className="w-[40px] h-[40px] rounded-[50%] overflow-hidden shadow-[0_0_0_1px_rgba(27,31,36,0.15)]"
							/>
						</a>
					</span>
				</div>
				<div className="grow">
					<div
						className={` md:relative border border-solid ${
							param?.boxBlue
								? "border-[rgba(84,174,255,0.4)]"
								: "border-[#d0d7de]"
						} md:rounded-md md:before:absolute md:before:top-[11px] md:before:right-[100%] md:before:left-[-14px] md:before:block md:before:w-[8px] md:before:h-[16px] md:before:content-[''] md:before:border-[7px] md:before:border-solid md:before:border-[transparent] ${
							param?.boxBlue
								? "md:before:border-r-[rgba(84,174,255,0.4)]"
								: "md:before:border-r-[#d0d7de]"
						}
        md:after:absolute md:after:top-[11px] md:after:right-[100%] md:after:left-[-13px] md:after:block md:after:w-[8px] md:after:h-[16px] md:after:content-[''] md:after:border-[7px] md:after:border-solid md:after:border-[transparent] 
        ${
					param?.boxBlue
						? "md:after:border-r-[#ddf4ff]"
						: "md:after:border-r-[#f6f8fa]"
				} rounded-[6px] bg-[#ffffff]
        `}
					>
						<div
							className={`${
								param?.boxBlue
									? "bg-[#ddf4ff] border-b border-solid border-[rgba(84,174,255,0.4)]"
									: "bg-[#f6f8fa] border-b border-solid border-[#d0d7de]"
							} px-4 h-[37px] flex items-center rounded-t-md`}
						>
							<h3 className="flex flex-auto font-normal text-[14px] text-[#57606a] whitespace-pre flex-wrap">
								<strong>
									<a className="truncate max-w-[125px] font-semibold hover:underline hover:text-[#0969da] text-[#000000] whitespace-pre">
										{`${authorName} `}
									</a>
								</strong>
								commented{" "}
								<a className="truncate hover:underline hover:text-[#0969da]">
									{countRestTime(createTime)}
								</a>
							</h3>
							<div className="sm:flex items-center">
								{param?.relation?.isOwner ? (
									<span
										className={`hidden sm:block border border-solid ${
											param?.boxBlue
												? "border-[rgba(84,174,255,0.4)]"
												: "border-[#d0d7de]"
										} py-0 px-[7px] rounded-[2em] ml-1 font-medium text-[#57606a] text-[12px]`}
									>
										Owner
									</span>
								) : (
									<></>
								)}
								{param?.relation?.isCollaborator ? (
									<span
										className={`hidden sm:block border border-solid ${
											param?.boxBlue
												? "border-[rgba(84,174,255,0.4)]"
												: "border-[#d0d7de]"
										} py-0 px-[7px] rounded-[2em] ml-1 font-medium text-[#57606a] text-[12px]`}
									>
										Collaborator
									</span>
								) : (
									<></>
								)}
								{param?.relation?.isAuthor ? (
									<span
										className={`hidden sm:block border border-solid ${
											param?.boxBlue
												? "border-[rgba(84,174,255,0.4)]"
												: "border-[#d0d7de]"
										} py-0 px-[7px] rounded-[2em] ml-1 font-medium text-[#57606a] text-[12px]`}
									>
										Author
									</span>
								) : (
									<></>
								)}
								<details
									ref={topSmileListRef}
									className="relative hidden md:inline-block cursor-pointer py-2 px-1"
								>
									<summary className="inline-block">
										<SmileyIcon className="fill-[#57606a] ml-1" />
									</summary>
									<div className="absolute flex z-[15] mr-2 left-[auto] top-[10px] right-full w-[auto] py-0 px-[2px] rounded-[6px] border border-solid border-[#d0d7de] shadow-[0_8px_24px_rgba(140,149,159,0.2)] bg-[#ffffff]">
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.good?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.good?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.good?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "+1" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											👍
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.bad?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.bad?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.bad?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "-1" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											👎
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.laugh?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.laugh?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.laugh?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "laugh" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											😄
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.hooray?.isClicked
													? "bg-[#ddf4ff]"
													: ""
											}`}
											onClick={() => {
												if (param?.reactions?.hooray?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.hooray?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "hooray" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											🎉
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.confused?.isClicked
													? "bg-[#ddf4ff]"
													: ""
											}`}
											onClick={() => {
												if (param?.reactions?.confused?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.confused?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "confused" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											😕
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.heart?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.heart?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.heart?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "heart" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											❤️
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.rocket?.isClicked
													? "bg-[#ddf4ff]"
													: ""
											}`}
											onClick={() => {
												if (param?.reactions?.rocket?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.rocket?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "rocket" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											🚀
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.eyes?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.eyes?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.eyes?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "eyes" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											👀
										</button>
									</div>
								</details>
								<details
									ref={commentBoxActionsRef}
									className="inline-block cursor-pointer relative"
								>
									<summary className="inline-flex py-2 px-1">
										<KebabHorizontalIcon className="fill-[#57606a] ml-1" />
									</summary>
									<div className="w-[185px] right-[-6px] mt-[-4px] left-[auto] absolute top-[110%] z-[15] py-1 bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[6px] shadow-[0_8px_24px_rgba(140,149,159,0.2)]">
										<button className="w-[100%] cursor-pointer text-[14px] py-1 pr-2 pl-4 text-[#24292f] text-left hover:bg-[#0969da] hover:text-[#ffffff]">
											Copy link
										</button>
										<button className="w-[100%] cursor-pointer text-[14px] py-1 pr-2 pl-4 text-[#24292f] text-left hover:bg-[#0969da] hover:text-[#ffffff]">
											Quote reply
										</button>
										<div
											className={`${param?.isAuthorized ? "block" : "hidden"}`}
										>
											{param?.isFirst ? (
												<></>
											) : (
												<button className="w-[100%] cursor-pointer text-[14px] py-1 pr-2 pl-4 text-[#24292f] text-left hover:bg-[#0969da] hover:text-[#ffffff]">
													Reference in new issue
												</button>
											)}
										</div>
										{param?.isAuthorized ? (
											<>
												<div className="h-[0px] my-2 mx-0 border-t border-solid border-[#d0d7de]"></div>
												<button
													className="w-[100%] cursor-pointer text-[14px] py-1 pr-2 pl-4 text-[#24292f] text-left hover:bg-[#0969da] hover:text-[#ffffff]"
													onClick={() => {
														param?.editClickFunction();
													}}
												>
													Edit
												</button>
												{param?.isFirst ? (
													<></>
												) : (
													<button className="w-[100%] cursor-pointer text-[14px] py-1 pr-2 pl-4 text-[#24292f] text-left hover:bg-[#0969da] hover:text-[#ffffff]">
														Hide
													</button>
												)}
												{param?.isFirst ? (
													<></>
												) : (
													<button
														className="w-[100%] cursor-pointer text-[14px] py-1 pr-2 pl-4 text-[#cf222e] text-left hover:bg-[#cf222e] hover:text-[#ffffff]"
														onClick={() => {
															param?.deleteItemAction?.();
															commentBoxActionsRef.current.open = false;
														}}
													>
														Delete
													</button>
												)}
												<div className="h-[0px] my-2 mx-0 border-t border-solid border-[#d0d7de]"></div>
												<button className="w-[100%] cursor-pointer text-[14px] py-1 pr-2 pl-4 text-[#24292f] text-left hover:bg-[#0969da] hover:text-[#ffffff]">
													Report content
												</button>
											</>
										) : (
											<></>
										)}
									</div>
								</details>
							</div>
						</div>
						<div>
							<div className="p-4 bg-[#ffffff] rounded-b-md">
								<div
									className="prose"
									dangerouslySetInnerHTML={{
										__html: marked(showMessage),
									}}
								></div>
							</div>
						</div>
						<div>
							<div className="mb-4 ml-4 bg-[#ffffff] flex">
								<details
									ref={bottomSmileListRef}
									className={`${
										param?.reactions?.total_count ? "block" : "hidden"
									}`}
								>
									<summary className="inline-flex bg-[#f6f8fa] w-[26px] h-[26px] border border-solid border-[hsla(210,18%,87%,1)] rounded-[50%] flex items-center cursor-pointer">
										<SmileyIcon className="fill-[#57606a] ml-1" />
									</summary>
									<div className="absolute flex z-[15] left-[16px] top-[auto] bottom-[45px] my-2 right-[auto] w-[auto] py-0 px-[2px] rounded-[6px] border border-solid border-[#d0d7de] shadow-[0_8px_24px_rgba(140,149,159,0.2)] bg-[#ffffff]">
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.good?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.good?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.good?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "+1" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											👍
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.bad?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.bad?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.bad?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "-1" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											👎
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.laugh?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.laugh?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.laugh?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "laugh" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											😄
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.hooray?.isClicked
													? "bg-[#ddf4ff]"
													: ""
											}`}
											onClick={() => {
												if (param?.reactions?.hooray?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.hooray?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "hooray" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											🎉
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.confused?.isClicked
													? "bg-[#ddf4ff]"
													: ""
											}`}
											onClick={() => {
												if (param?.reactions?.confused?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.confused?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "confused" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											😕
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.heart?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.heart?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.heart?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "heart" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											❤️
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.rocket?.isClicked
													? "bg-[#ddf4ff]"
													: ""
											}`}
											onClick={() => {
												if (param?.reactions?.rocket?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.rocket?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "rocket" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											🚀
										</button>
										<button
											className={`w-[32px] h-[32px] p-1 my-1 mx-[2px] truncate flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] ${
												param?.reactions?.eyes?.isClicked ? "bg-[#ddf4ff]" : ""
											}`}
											onClick={() => {
												if (param?.reactions?.eyes?.isClicked) {
													param?.deleteReaction?.hook?.({
														...param?.deleteReaction?.apiParam,
														reactionid: param?.reactions?.eyes?.id,
													});
												} else {
													param?.createReaction?.hook?.({
														...param?.createReaction?.apiParam,
														editData: { content: "eyes" },
													});
												}
												topSmileListRef.current.open = false;
												bottomSmileListRef.current.open = false;
											}}
										>
											👀
										</button>
									</div>
								</details>
								<div className="flex flex-wrap mt-[-2px]">
									<button
										className={`${
											param?.reactions?.good?.number ? "flex" : "hidden"
										} h-[26px] py-0 px-1 leading-[26px] text-[12px] ${
											param?.reactions?.good?.isClicked
												? "bg-[#ddf4ff] border border-solid border-[#0969da] rounded-[100px]"
												: "bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[100px]"
										} ml-2 mt-[2px]`}
										onClick={() => {
											if (param?.reactions?.good?.isClicked) {
												param?.deleteReaction?.hook?.({
													...param?.deleteReaction?.apiParam,
													reactionid: param?.reactions?.good?.id,
												});
											} else {
												param?.createReaction?.hook?.({
													...param?.createReaction?.apiParam,
													editData: { content: "+1" },
												});
											}
											topSmileListRef.current.open = false;
											bottomSmileListRef.current.open = false;
										}}
									>
										<div className="w-4 h-4 text-[1em] ">👍</div>
										<span
											className={`h-6 py-0 px-1 ml-[2px] ${
												param?.reactions?.good?.isClicked
													? "text-[#0969da]"
													: "text-[#57606a]"
											}`}
										>
											{param?.reactions?.good?.number}
										</span>
									</button>
									<button
										className={`${
											param?.reactions?.bad?.number ? "flex" : "hidden"
										} h-[26px] py-0 px-1 leading-[26px] text-[12px] ${
											param?.reactions?.bad?.isClicked
												? "bg-[#ddf4ff] border border-solid border-[#0969da] rounded-[100px]"
												: "bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[100px]"
										} ml-2 mt-[2px]`}
										onClick={() => {
											if (param?.reactions?.bad?.isClicked) {
												param?.deleteReaction?.hook?.({
													...param?.deleteReaction?.apiParam,
													reactionid: param?.reactions?.bad?.id,
												});
											} else {
												param?.createReaction?.hook?.({
													...param?.createReaction?.apiParam,
													editData: { content: "-1" },
												});
											}
											topSmileListRef.current.open = false;
											bottomSmileListRef.current.open = false;
										}}
									>
										<div className="w-4 h-4 text-[1em] ">👎</div>
										<span
											className={`h-6 py-0 px-1 ml-[2px] ${
												param?.reactions?.bad?.isClicked
													? "text-[#0969da]"
													: "text-[#57606a]"
											}`}
										>
											{param?.reactions?.bad?.number}
										</span>
									</button>
									<button
										className={`${
											param?.reactions?.laugh?.number ? "flex" : "hidden"
										} h-[26px] py-0 px-1 leading-[26px] text-[12px] ${
											param?.reactions?.laugh?.isClicked
												? "bg-[#ddf4ff] border border-solid border-[#0969da] rounded-[100px]"
												: "bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[100px]"
										} ml-2 mt-[2px]`}
										onClick={() => {
											if (param?.reactions?.laugh?.isClicked) {
												param?.deleteReaction?.hook?.({
													...param?.deleteReaction?.apiParam,
													reactionid: param?.reactions?.laugh?.id,
												});
											} else {
												param?.createReaction?.hook?.({
													...param?.createReaction?.apiParam,
													editData: { content: "laugh" },
												});
											}
											topSmileListRef.current.open = false;
											bottomSmileListRef.current.open = false;
										}}
									>
										<div className="w-4 h-4 text-[1em] ">😄</div>
										<span
											className={`h-6 py-0 px-1 ml-[2px] ${
												param?.reactions?.laugh?.isClicked
													? "text-[#0969da]"
													: "text-[#57606a]"
											}`}
										>
											{param?.reactions?.laugh?.number}
										</span>
									</button>
									<button
										className={`${
											param?.reactions?.hooray?.number ? "flex" : "hidden"
										} h-[26px] py-0 px-1 leading-[26px] text-[12px] ${
											param?.reactions?.hooray?.isClicked
												? "bg-[#ddf4ff] border border-solid border-[#0969da] rounded-[100px]"
												: "bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[100px]"
										} ml-2 mt-[2px]`}
										onClick={() => {
											if (param?.reactions?.hooray?.isClicked) {
												param?.deleteReaction?.hook?.({
													...param?.deleteReaction?.apiParam,
													reactionid: param?.reactions?.hooray?.id,
												});
											} else {
												param?.createReaction?.hook?.({
													...param?.createReaction?.apiParam,
													editData: { content: "hooray" },
												});
											}
											topSmileListRef.current.open = false;
											bottomSmileListRef.current.open = false;
										}}
									>
										<div className="w-4 h-4 text-[1em] ">🎉</div>
										<span
											className={`h-6 py-0 px-1 ml-[2px] ${
												param?.reactions?.hooray?.isClicked
													? "text-[#0969da]"
													: "text-[#57606a]"
											}`}
										>
											{param?.reactions?.hooray?.number}
										</span>
									</button>
									<button
										className={`${
											param?.reactions?.confused?.number ? "flex" : "hidden"
										} h-[26px] py-0 px-1 leading-[26px] text-[12px] ${
											param?.reactions?.confused?.isClicked
												? "bg-[#ddf4ff] border border-solid border-[#0969da] rounded-[100px]"
												: "bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[100px]"
										} ml-2 mt-[2px]`}
										onClick={() => {
											if (param?.reactions?.confused?.isClicked) {
												param?.deleteReaction?.hook?.({
													...param?.deleteReaction?.apiParam,
													reactionid: param?.reactions?.confused?.id,
												});
											} else {
												param?.createReaction?.hook?.({
													...param?.createReaction?.apiParam,
													editData: { content: "confused" },
												});
											}
											topSmileListRef.current.open = false;
											bottomSmileListRef.current.open = false;
										}}
									>
										<div className="w-4 h-4 text-[1em] ">😕</div>
										<span
											className={`h-6 py-0 px-1 ml-[2px] ${
												param?.reactions?.confused?.isClicked
													? "text-[#0969da]"
													: "text-[#57606a]"
											}`}
										>
											{param?.reactions?.confused?.number}
										</span>
									</button>
									<button
										className={`${
											param?.reactions?.heart?.number ? "flex" : "hidden"
										} h-[26px] py-0 px-1 leading-[26px] text-[12px] ${
											param?.reactions?.heart?.isClicked
												? "bg-[#ddf4ff] border border-solid border-[#0969da] rounded-[100px]"
												: "bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[100px]"
										} ml-2 mt-[2px]`}
										onClick={() => {
											if (param?.reactions?.heart?.isClicked) {
												param?.deleteReaction?.hook?.({
													...param?.deleteReaction?.apiParam,
													reactionid: param?.reactions?.heart?.id,
												});
											} else {
												param?.createReaction?.hook?.({
													...param?.createReaction?.apiParam,
													editData: { content: "heart" },
												});
											}
											topSmileListRef.current.open = false;
											bottomSmileListRef.current.open = false;
										}}
									>
										<div className="w-4 h-4 text-[1em] ">❤️</div>
										<span
											className={`h-6 py-0 px-1 ml-[2px] ${
												param?.reactions?.heart?.isClicked
													? "text-[#0969da]"
													: "text-[#57606a]"
											}`}
										>
											{param?.reactions?.heart?.number}
										</span>
									</button>
									<button
										className={`${
											param?.reactions?.rocket?.number ? "flex" : "hidden"
										} h-[26px] py-0 px-1 leading-[26px] text-[12px] ${
											param?.reactions?.rocket?.isClicked
												? "bg-[#ddf4ff] border border-solid border-[#0969da] rounded-[100px]"
												: "bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[100px]"
										} ml-2 mt-[2px]`}
										onClick={() => {
											if (param?.reactions?.rocket?.isClicked) {
												param?.deleteReaction?.hook?.({
													...param?.deleteReaction?.apiParam,
													reactionid: param?.reactions?.rocket?.id,
												});
											} else {
												param?.createReaction?.hook?.({
													...param?.createReaction?.apiParam,
													editData: { content: "rocket" },
												});
											}
											topSmileListRef.current.open = false;
											bottomSmileListRef.current.open = false;
										}}
									>
										<div className="w-4 h-4 text-[1em] ">🚀</div>
										<span
											className={`h-6 py-0 px-1 ml-[2px] ${
												param?.reactions?.rocket?.isClicked
													? "text-[#0969da]"
													: "text-[#57606a]"
											}`}
										>
											{param?.reactions?.rocket?.number}
										</span>
									</button>
									<button
										className={`${
											param?.reactions?.eyes?.number ? "flex" : "hidden"
										} h-[26px] py-0 px-1 leading-[26px] text-[12px] ${
											param?.reactions?.eyes?.isClicked
												? "bg-[#ddf4ff] border border-solid border-[#0969da] rounded-[100px]"
												: "bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[100px]"
										} ml-2 mt-[2px]`}
										onClick={() => {
											if (param?.reactions?.eyes?.isClicked) {
												param?.deleteReaction?.hook?.({
													...param?.deleteReaction?.apiParam,
													reactionid: param?.reactions?.eyes?.id,
												});
											} else {
												param?.createReaction?.hook?.({
													...param?.createReaction?.apiParam,
													editData: { content: "eyes" },
												});
											}
											topSmileListRef.current.open = false;
											bottomSmileListRef.current.open = false;
										}}
									>
										<div className="w-4 h-4 text-[1em] ">👀</div>
										<span
											className={`h-6 py-0 px-1 ml-[2px] ${
												param?.reactions?.eyes?.isClicked
													? "text-[#0969da]"
													: "text-[#57606a]"
											}`}
										>
											{param?.reactions?.eyes?.number}
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
