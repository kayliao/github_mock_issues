import React from "react";
import "../../stories/storybookStyle.css";

import LabelItem from "./LabelItem";

export default {
	title: "Example/LabelItem",
	component: LabelItem,
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
		gitLabelData: {
			description:
				"The data get from inputs. Its an object include name, description, color.",
			type: { name: "object", required: true },
			table: {
				type: { summary: "object" },
			},
		},

		deleteAction: {
			description: "Action that happened when click on delete.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},

		gitInfo: {
			description: "A object contain username and reponame of the git",
			type: { name: "object", required: true },
			table: {
				type: { summary: "object" },
			},
		},

		updateAction: {
			description: "Action that happened when click on edit.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},
	},
};

const Template = (args) => <LabelItem {...args} />;
export const Default = Template.bind({});
Default.args = {
	gitLabelData: { name: "abc", description: "aaa", color: "000000" },
	deleteAction: () => {},
	gitInfo: { username: "kay", reponame: "reponame" },
	updateAction: () => {},
};
