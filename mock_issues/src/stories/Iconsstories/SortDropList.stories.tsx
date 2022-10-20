import "../../stories/storybookStyle.css";
import SortDropList from "./SortDropList";

export default {
	title: "Example/Shared/SortDropList",
	component: SortDropList,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Sort button with dropdown list.",
			},
		},
	},
	argTypes: {
		isDrop: {
			description: "Determine if drop list",
			type: { required: true },
			table: {
				type: { summary: "boolean" },
			},
		},

		onClickFunc: {
			description: "The background color of the button.",
			type: { name: "function", required: true },
			table: {
				type: { summary: "function" },
			},
		},
	},
};

const Template = (args) => <SortDropList {...args} />;
export const Default = Template.bind({});
Default.args = {
	isDrop: true,
	onClickFunc: () => {},
};
