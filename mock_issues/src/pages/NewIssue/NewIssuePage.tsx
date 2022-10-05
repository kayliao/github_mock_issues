import SettingsBar from "stories/Iconsstories/SettingsBar";
import TextAreaBox from "stories/Iconsstories/TextAreaBox";

export default function NewIssuePage() {
	return (
		<div className="px-4 mt-6 md:flex md:w-[100%] md:justify-between md:px-6">
			<TextAreaBox param={{ closeIssue: { open: false } }} />
			<div className="ml-4">
				<SettingsBar
					param={{
						openDevelop: true,
						Notifications: { open: true, subscribe: false },
						Participant: { open: true },
					}}
				/>
			</div>
		</div>
	);
}
