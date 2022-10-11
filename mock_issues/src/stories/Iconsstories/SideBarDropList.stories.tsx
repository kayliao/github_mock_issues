import "../../stories/storybookStyle.css";
import SideBarDropList from "./SideBarDropList";

export default {
	title: "Example/NewIssue/SideBarDropList",
	component: SideBarDropList,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "A droplist for sidebar.",
			},
		},
	},
	argTypes: {
		isDisplayDropDown: {
			description: "whether to show the droplist",
			type: { required: true },
			table: {
				type: { summary: "boolean" },
			},
		},

		param: {
			description: "optional parameters",
			type: { name: "object", required: true },
			table: {
				type: { summary: "object" },
			},
		},

		title: {
			description: "title of the droplist",
			type: { required: true },
			table: {
				type: { summary: "string" },
			},
		},

		inputTitle: {
			description: "title of the input box",
			type: { required: true },
			table: {
				type: { summary: "string" },
			},
		},

		listData: {
			description:
				"data for the drop list. Must include name, color or avatar_url, des(optional)",
			type: { required: true },
			table: {
				type: { summary: "object" },
			},
		},

		settingSelectData: {
			description: "useState hook to save selected data.",
			type: { required: true },
			table: {
				type: { summary: "set state hook" },
			},
		},
	},
};

const Template = (args) => (
	<div className="ml-[50px]">
		<SideBarDropList {...args} />
	</div>
);
export const Default = Template.bind({});
Default.args = {
	isDisplayDropDown: true,
	title: "Assign up to 10 people",
	inputTitle: "select assignee",
	param: {
		subtitle: "Suggestions",
		openItemClose: false,
		allClearTitle: "Clear assignees",
	},
	listData: [{ name: "kay", color: "#fffff", des: "abc", avatar_url: "" }],
	settingSelectData: () => {},
};
