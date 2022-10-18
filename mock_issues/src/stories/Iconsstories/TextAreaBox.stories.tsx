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

		avatar: {
			description: "user image",
			type: { required: true },
			table: {
				type: { summary: "string" },
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
	avatar: "https://avatars.githubusercontent.com/u/34449805?v=4",
	param: {
		closeIssue: { open: false },
		submitIssue: {
			submitAction: () => {},
		},
	},
};
