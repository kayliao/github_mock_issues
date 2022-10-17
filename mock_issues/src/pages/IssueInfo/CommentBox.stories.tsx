import "../../stories/storybookStyle.css";
import CommentBox from "./CommentBox";

export default {
	title: "Example/IssueInfo/CommentBox",
	component: CommentBox,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "CommentBox shows comment data with reactions.",
			},
		},
	},
	argTypes: {
		showMessage: {
			description: "message to show in the comment box",
			type: { required: true },
			table: {
				type: { summary: "string" },
			},
		},

		avatar: {
			description: "user image",
			type: { required: true },
			table: {
				type: { summary: "string" },
			},
		},

		createTime: {
			description: "the time when the comment is created",
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

const Template = (args) => (
	<div className="mx-5 my-5">
		<CommentBox {...args} />
	</div>
);
export const Default = Template.bind({});
Default.args = {
	avatar: "https://avatars.githubusercontent.com/u/34449805?v=4",
	showMessage: "storybook comment data show message",
	param: {},
	authorName: "kayliao",
	createTime: "2022-10-16T03:21:41Z",
};
