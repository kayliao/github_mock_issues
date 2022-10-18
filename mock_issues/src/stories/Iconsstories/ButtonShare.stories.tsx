import ButtonShare from "./ButtonShare";

export default {
	title: "Example/ButtonShare",
	component: ButtonShare,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Button. User can customize the background color and text.",
			},
		},
	},
	argTypes: {
		textColor: {
			description: "The text color of the button.",
			type: { required: true },
			table: {
				type: { summary: "string" },
			},
		},

		backgroundColor: {
			description: "The background color of the button.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		textSize: {
			description: "The text size of the button.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		displayText: {
			description: "The text display on the button.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		borderColor: {
			description: "The border color of the button.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		hoverColor: {
			description: "The background color of the button when hover.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		hoverBorderColor: {
			description: "The border color of the button when hover.",
			type: { name: "string", required: true },
			table: {
				type: { summary: "string" },
			},
		},

		isAble: {
			description: "Enable / Disable the button.",
			type: { name: "boolean", required: true },
			table: {
				type: { summary: "boolean" },
			},
		},

		onClickFunc: {
			description: "The action to do when click the button.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},
	},
};

const Template = (args) => <ButtonShare {...args} />;
export const Default = Template.bind({});
Default.args = {
	textColor: "#000000",
	backgroundColor: "ffffff",
	textSize: "12px",
	displayText: "Button",
	borderColor: "#d0d7de",
	hoverColor: "#d0d7de",
	hoverBorderColor: "#d0d7de",
	isAble: true,
	onClickFunc: () => {},
};
