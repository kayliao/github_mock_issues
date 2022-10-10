import "../../stories/storybookStyle.css";
import TextAreaBox from "./TextAreaBox";

export default {
	title: "Example/NewIssue/TextAreaBox",
	component: TextAreaBox,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "TextArea box with custom button and markdown.",
			},
		},
	},
	argTypes: {
		setTextData: {
			description: "get textarea input",
			type: { required: true },
			table: {
				type: { summary: "use state hook" },
			},
		},

		param: {
			description: "The background color of the button.",
			type: { name: "object", required: true },
			table: {
				type: { summary: "object" },
			},
		},
	},
};

const Template = (args) => <TextAreaBox {...args} />;
export const Default = Template.bind({});
Default.args = {
	setTextData: () => {},
	param: {
		closeIssue: { open: false },
		submitIssue: {
			submitAction: () => {},
		},
	},
};
