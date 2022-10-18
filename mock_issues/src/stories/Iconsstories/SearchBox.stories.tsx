import React from "react";

import SearchBox from "./SearchBox";

export default {
	title: "Example/SearchBox",
	component: SearchBox,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Search Box.",
			},
		},
	},
	argTypes: {},
};

const Template = (args) => <SearchBox {...args} />;
export const Default = Template.bind({});
Default.args = {};
