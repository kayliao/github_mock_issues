import IssuesListItem from "./IssuesListItem";

export default {
	title: "Example/IssuesList/IssuesListItem",
	component: IssuesListItem,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Search Box.",
			},
		},
	},
	argTypes: {
		issuesItemData: {
			description: "The data of the item. Must include ",
			type: { name: "object", required: true },
			table: {
				type: { summary: "object" },
			},
		},
		currentItemIndex: {
			description: "The index of the item in the list.",
			type: { name: "number", required: true },
			table: {
				type: { summary: "number" },
			},
		},
		totalItemsCount: {
			description: "Total number of list items.",
			type: { name: "number", required: true },
			table: {
				type: { summary: "number" },
			},
		},
	},
};

const Template = (args) => <IssuesListItem {...args} />;
export const Default = Template.bind({});
Default.args = {
	issuesItemData: {
		state: "open",
		title: "abcdefg",
		labels: [{ color: "acacac", name: "labelname" }],
		number: 23,
		create_at: "2022-09-30T17:16:57Z",
		user: { login: "google" },
		assignees: [],
		comments: 1,
	},
	currentItemIndex: 0,
	totalItemsCount: 2,
};
