import EmptyPage from "./EmptyPage";

export default {
	title: "Example/IssuesList/EmptyPage",
	component: EmptyPage,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Search Box.",
			},
		},
	},
	argTypes: {
		isOrgin: {
			description: "Check if it's search empty or orginal empty.",
			type: { name: "boolean", required: true },
			table: {
				type: { summary: "boolean" },
			},
		},
	},
};

const Template = (args) => <EmptyPage {...args} />;
export const Default = Template.bind({});
Default.args = {
	isOrgin: true,
};
