import Label from "./Label";

export default {
	title: "Example/Shared/Label",
	component: Label,
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
		backgroundColor: {
			description: "The text color of the button.",
			type: { required: true },
			table: {
				type: { summary: "string" },
			},
		},

		labelName: {
			description: "The background color of the button.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},
	},
};

const Template = (args) => <Label {...args} />;
export const Default = Template.bind({});
Default.args = {
	backgroundColor: "#bbbbbb",
	labelName: "label preview",
};
