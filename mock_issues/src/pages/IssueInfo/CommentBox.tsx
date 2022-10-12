import { KebabHorizontalIcon, SmileyIcon } from "@primer/octicons-react";
import { marked } from "marked";

export default function CommentBox({ avatar, showMessage, param }) {
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
							<h3 className="flex flex-auto font-normal text-[14px] text-[#57606a] whitespace-pre">
								<strong>
									<a className="truncate max-w-[125px] font-semibold hover:underline hover:text-[#0969da] text-[#000000] whitespace-pre">
										kayliao{" "}
									</a>
								</strong>
								commented{" "}
								<a className="truncate hover:underline hover:text-[#0969da]">
									29 minutes ago
								</a>
							</h3>
							<div className="sm:flex items-center">
								<span
									className={`hidden sm:block border border-solid ${
										param?.boxBlue
											? "border-[rgba(84,174,255,0.4)]"
											: "border-[#d0d7de]"
									} py-0 px-[7px] rounded-[2em] ml-1 font-medium text-[#57606a] text-[12px]`}
								>
									Owner
								</span>
								<span
									className={`hidden sm:block border border-solid ${
										param?.boxBlue
											? "border-[rgba(84,174,255,0.4)]"
											: "border-[#d0d7de]"
									} py-0 px-[7px] rounded-[2em] ml-1 font-medium text-[#57606a] text-[12px]`}
								>
									Author
								</span>
								<div className="hidden md:block cursor-pointer py-2 px-1">
									<SmileyIcon className="fill-[#57606a] ml-1" />
								</div>
								<details className="inline-block cursor-pointer relative">
									<summary className="inline-flex py-2 px-1">
										<KebabHorizontalIcon className="fill-[#57606a] ml-1" />
									</summary>
									<div className="w-[185px] right-[-6px] mt-[-4px] left-[auto] absolute top-[110%] z-[15] py-1 bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[6px] shadow-[0_8px_24px_rgba(140,149,159,0.2)]">
										<button className="w-[100%] cursor-pointer text-[14px] py-1 pr-2 pl-4 text-[#24292f] text-left hover:bg-[#0969da] hover:text-[#ffffff]">
											Copy link
										</button>
									</div>
								</details>
							</div>
						</div>
						<div>
							<div className="p-4 bg-[#ffffff] rounded-b-md">
								<div
									className=""
									dangerouslySetInnerHTML={{
										__html: marked(showMessage),
									}}
								></div>
							</div>
						</div>
						<div>
							<div className="mb-4 ml-4 bg-[#ffffff] flex">
								<details
									className={`${
										param?.reactions?.total_count ? "block" : "hidden"
									}`}
								>
									<summary className="inline-flex bg-[#f6f8fa] w-[26px] h-[26px] border border-solid border-[hsla(210,18%,87%,1)] rounded-[50%] flex items-center cursor-pointer">
										<SmileyIcon className="fill-[#57606a] ml-1" />
									</summary>
									<div>aaaa</div>
								</details>
								<div className="flex flex-wrap">
									<button
										className={`${
											param?.reactions?.good?.number ? "flex" : "hidden"
										} h-[26px] py-0 px-1 leading-[26px] text-[12px] ${
											param?.reactions?.good?.isClicked
												? "bg-[#ddf4ff] border border-solid border-[#0969da] rounded-[100px]"
												: "bg-[#ffffff] border border-solid border-[#d0d7de] rounded-[100px]"
										} ml-2`}
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
										} ml-2`}
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
										} ml-2`}
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
										} ml-2`}
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
										} ml-2`}
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
										} ml-2`}
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
										} ml-2`}
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
										} ml-2`}
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
