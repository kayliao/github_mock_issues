import "../../stories/storybookStyle.css";
import SettingsBar from "./SettingsBar";
import { BrowserRouter } from "react-router-dom";

export default {
	title: "Example/NewIssue/SettingsBar",
	component: SettingsBar,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Setting Bar.",
			},
		},
	},
	argTypes: {
		username: {
			description: "Username of the issue",
			type: { required: true },
			table: {
				type: { summary: "string" },
			},
		},

		reponame: {
			description: "Repo name of the issue",
			type: { required: true },
			table: {
				type: { summary: "string" },
			},
		},

		assigneeList: {
			description:
				"List data for assignee. Object array include name and avatar_url key",
			type: { required: true },
			table: {
				type: { summary: "array" },
			},
		},

		labelList: {
			description:
				"List data for labels. Object array include name, color and des key",
			type: { required: true },
			table: {
				type: { summary: "array" },
			},
		},

		setBarData: {
			description: "useState hook to get the selected data.",
			type: { required: true },
			table: {
				type: { summary: "set state hook" },
			},
		},

		param: {
			description: "Optional parameters settings.",
			type: { name: "object", required: true },
			table: {
				type: { summary: "object" },
			},
		},
	},
};

const Template = (args) => (
	<BrowserRouter>
		<div className="ml-[200px]">
			<SettingsBar {...args} />
		</div>
	</BrowserRouter>
);
export const Default = Template.bind({});
Default.args = {
	param: {
		openDevelop: true,
		Notifications: { open: false, subscribe: false },
		Participant: { open: false },
		IssueActions: { open: false },
	},
	username: "kay",
	reponame: "repo",
	assigneeList: [{ name: "kay", avatar_url: "" }],
	labelList: [{ name: "kay", color: "#000000", des: "abc" }],
	setBarData: () => {},
};
