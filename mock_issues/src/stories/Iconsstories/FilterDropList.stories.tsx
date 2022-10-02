import FilterDropList from "./FilterDropList";
import "../../index.css";

export default {
	title: "Example/IssuesList/FilterDropList",
	component: FilterDropList,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"DropList with filter function. User can customize the list.",
			},
		},
	},
	argTypes: {
		type: {
			description: "The type of the droplist.",
			type: { required: true },
			table: {
				type: { summary: "string" },
			},
		},

		Lists: {
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

		setSelectedList: {
			description: "Function to save the selected items.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},

		selectedList: {
			description: "The items that is selected.",
			type: { name: "string or array", required: true },
			table: {
				type: { summary: "string or array" },
			},
		},

		cancelActions: {
			description: "The function that close the display.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},
	},
};

const Template = (args) => (
	<div className="ml-2">
		<FilterDropList {...args} />
	</div>
);
export const Default = Template.bind({});
Default.args = {
	type: "label",
	Lists: [
		{ name: "abc", color: "acacac" },
		{ name: "ddd", color: "000000" },
	],
	isDisplayDropDown: true,
	setSelectedList: () => {},
	selectedList: ["abc"],
	cancelActions: () => {},
};
