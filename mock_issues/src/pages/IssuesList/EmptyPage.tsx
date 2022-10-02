import { IssueOpenedIcon } from "@primer/octicons-react";

export default function EmptyPage({ isOrgin }) {
	return (
		<div className="max-w-3xl mx-auto">
			<div className="py-20 px-10 relative text-center">
				<IssueOpenedIcon size={24} fill={"#57606a"} className="mx-1 mb-2" />
				<h3 className="my-4 text-[24px] leading-[1.5] font-semibold">
					{isOrgin
						? "There aren't any open issues."
						: "No results matched your search."}
				</h3>
				<p className="text-[16px] text-[#57606a] mt-[0px] mb-[10px]">
					You could search
					<a className="cursor-pointer text-[#0969da]"> all of GitHub</a> or try
					an
					<a className="cursor-pointer text-[#0969da]"> advanced search</a>.
				</p>
			</div>
		</div>
	);
}
