import React from "react";

import Label from "./Label";

export default {
	title: "Example/Label",
	component: Label,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Button. User can customize the background color and text.",
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
