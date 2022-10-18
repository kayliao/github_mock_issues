import NormalDropList from "./NormalDropList";
import "../../index.css";

export default {
	title: "Example/IssuesList/NormalDropList",
	component: NormalDropList,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Simple dropList. User can customize the list.",
			},
		},
	},
	argTypes: {
		title: {
			description: "The title of the droplist.",
			type: { required: "string" },
			table: {
				type: { summary: "string" },
			},
		},

		lists: {
			description: "The items to show in the droplist.",
			type: { name: "array", required: true },
			table: {
				type: { summary: "array" },
			},
		},

		isDisplayDropDown: {
			description: "Whether to show the droplist.",
			type: { name: "boolean", required: true },
			table: {
				type: { summary: "boolean" },
			},
		},

		position: {
			description:
				"Position to show the drop relative to the connect button.'right' or 'left'.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		isCenter: {
			description:
				"In small screen, whether to show the droplist in the center.",
			type: { name: "boolean", required: true },
			table: {
				type: { summary: "boolean" },
			},
		},

		cancelActions: {
			description: "The function that close the display.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},

		clickItemActions: {
			description: "The function that trigger when item is clicked.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},

		currentItemIndex: {
			description: "The item that is selected.",
			type: { name: "number", required: true },
			table: {
				type: { summary: "number" },
			},
		},
	},
};

const Template = (args) => (
	<div className="ml-2">
		<NormalDropList {...args} />
	</div>
);
export const Default = Template.bind({});
Default.args = {
	isDisplayDropDown: true,
	cancelActions: () => {},
	title: "Sort by",
	lists: [
		"Newest",
		"Oldest",
		"Most commented",
		"Least commented",
		"Recently updated",
		"Least recently updated",
	],
	position: "right",
	isCenter: false,
	clickItemActions: () => {},
	currentItemIndex: 1,
};
