import LabelActionBox from "./LabelActionBox";

export default {
	title: "Example/LabelList/LabelActionBox",
	component: LabelActionBox,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Label. User can customize the background color and text to display.",
			},
		},
	},
	argTypes: {
		show: {
			description: "Whether to show the box.",
			type: { required: true },
			table: {
				type: { summary: "boolean" },
			},
		},

		cancelAction: {
			description: "Action that happened when click on cancel.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},

		typeName: {
			description:
				"The type of the box. Should be 'Save Changes' or 'Create Label'",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		gitInfo: {
			description: "A object contain username and reponame of the git",
			type: { name: "object", required: true },
			table: {
				type: { summary: "object" },
			},
		},

		typeAction: {
			description: "Action that happened when click on type button.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},

		labelName: {
			description: "labelname input.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		labeldescription: {
			description: "labeldescription input.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		labelcolor: {
			description: "labelcolor input.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},
	},
};

const Template = (args) => <LabelActionBox {...args} />;
export const Default = Template.bind({});
Default.args = {
	show: true,
	cancelAction: () => {},
	typeName: "Test",
	gitInfo: { username: "kay", reopname: "testrepo" },
	typeAction: () => {},
	labelName: "Testing",
	labeldescription: "test test",
	labelcolor: "#ffffff",
};
