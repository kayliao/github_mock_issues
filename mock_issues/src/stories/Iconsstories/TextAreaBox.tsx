import { useState, useEffect, useRef } from "react";
import ButtonShare from "./ButtonShare";
import {
	IssueClosedIcon,
	CheckIcon,
	SkipIcon,
	IssueReopenedIcon,
} from "@primer/octicons-react";

import { TextareaMarkdown } from "textarea-markdown-editor/dist/TextareaMarkdown";
import { TextareaMarkdownRef } from "textarea-markdown-editor";
import { marked } from "marked";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import "../../prose.css";
import {
	TypographyIcon,
	ChevronUpIcon,
	ChevronDownIcon,
	QuoteIcon,
	CodeIcon,
	LinkIcon,
	MentionIcon,
	ImageIcon,
	CrossReferenceIcon,
	ReplyIcon,
	HeadingIcon,
	BoldIcon,
	ItalicIcon,
	ListUnorderedIcon,
	ListOrderedIcon,
	TasklistIcon,
	InfoIcon,
	MarkdownIcon,
} from "@primer/octicons-react";
import { NormalModuleReplacementPlugin } from "webpack";
import { json } from "react-router-dom";

const firebaseConfig = {
	apiKey: "AIzaSyDImmIiw0sKHNpgRYkUnxDGM1q0W_iykB8",
	authDomain: "kay-webmidterm.firebaseapp.com",
	projectId: "kay-webmidterm",
	storageBucket: "kay-webmidterm.appspot.com",
	messagingSenderId: "871873251584",
	appId: "1:871873251584:web:1040a0e217d91d70c94be5",
};

const closureStates = {
	closeIssue: (
		<>
			<IssueClosedIcon className="fill-[#8250df] mt-px rounded-[2em] w-[16px] h-[16px] mr-2" />
			<div className="text-[14px] font-medium text-[#24292f]truncate sm:pt-[2px]">
				Close issue
			</div>
		</>
	),
	closeComment: (
		<>
			<IssueClosedIcon className="fill-[#8250df] mt-px rounded-[2em] w-[16px] h-[16px] mr-2" />
			<div className="text-[14px] font-medium text-[#24292f]truncate sm:pt-[2px]">
				Close with comment
			</div>
		</>
	),
	closeComplete: (
		<>
			<IssueClosedIcon className="fill-[#8250df] mt-px rounded-[2em] w-[16px] h-[16px] mr-2" />
			<div className="text-[14px] font-medium text-[#24292f]truncate sm:pt-[2px]">
				Close as completed
			</div>
		</>
	),
	closeSkip: (
		<>
			<SkipIcon className="fill-[#57606a] mt-px rounded-[2em] w-[16px] h-[16px] mr-2" />
			<div className="text-[14px] font-medium text-[#24292f]truncate sm:pt-[2px]">
				Close issue
			</div>
		</>
	),
	closeSkipComment: (
		<>
			<SkipIcon className="fill-[#57606a] mt-px rounded-[2em] w-[16px] h-[16px] mr-2" />
			<div className="text-[14px] font-medium text-[#24292f]truncate sm:pt-[2px]">
				Close with comment
			</div>
		</>
	),
	closeNotPlanned: (
		<>
			<SkipIcon className="fill-[#57606a] mt-px rounded-[2em] w-[16px] h-[16px] mr-2" />
			<div className="text-[14px] font-medium text-[#24292f]truncate sm:pt-[2px]">
				Close as not planned
			</div>
		</>
	),
	reopen: (
		<>
			<IssueReopenedIcon className="fill-[#1a7f37] mt-px rounded-[2em] w-[16px] h-[16px] mr-2" />
			<div className="text-[14px] font-medium text-[#24292f]truncate sm:pt-[2px]">
				Reopen
			</div>
		</>
	),
};

export default function TextAreaBox({ setTextData, param, avatar }) {
	const [writeOnClick, setWriteOnClick] = useState(true);
	const [smallScreenMarkItemShowOnClick, setSmallScreenMarkItemShowOnClick] =
		useState(true);
	const [inputData, setInputData] = useState({
		title: "",
		body: param?.inputData ? param?.inputData : "",
	});
	// const textAreaMarkRef = useRef<TextareaMarkdownRef>(null);
	const textAreaMarkRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileUploading, setFileUploading] = useState(false);
	const [filePath, setFilePath] = useState(null);
	const [issueState, setIssueState] = useState(closureStates.closeIssue);
	const [openStateOptions, setOpenStateOptions] = useState(false);

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const storage = getStorage();

	// const { data } = param?.ahook
	// 	? param?.ahook({
	// 			username: "kayliao",
	// 			reponame: "3rd-ML100Days",
	// 	  })
	// 	: { data: null };
	// console.log(data);

	useEffect(() => {
		setTextData(inputData);

		if (inputData.body != null && inputData.body != "") {
			if (
				JSON.stringify(issueState) == JSON.stringify(closureStates.closeIssue)
			)
				setIssueState(closureStates.closeComment);
			else if (
				JSON.stringify(issueState) == JSON.stringify(closureStates.closeSkip)
			)
				setIssueState(closureStates.closeSkipComment);
		} else {
			if (
				JSON.stringify(issueState) == JSON.stringify(closureStates.closeComment)
			)
				setIssueState(closureStates.closeIssue);
			else if (
				JSON.stringify(issueState) ==
				JSON.stringify(closureStates.closeSkipComment)
			)
				setIssueState(closureStates.closeSkip);
		}
	}, [inputData]);

	useEffect(() => {
		autoAdjustTextArea(textAreaMarkRef.current);
	}, [inputData]);

	useEffect(() => {
		if (param?.closeIssue?.state === 0) {
			setIssueState(closureStates.closeIssue);
		} else {
			setIssueState(closureStates.reopen);
		}
	}, [param?.closeIssue?.state]);

	useEffect(() => {
		const uploadFiletoFirebase = async () => {
			let fileUrl = null;
			if (selectedFile != null) {
				const fileRef = ref(storage, `/githubfile/${selectedFile?.name}`);
				const uploadResult = await uploadBytes(fileRef, selectedFile?.file);

				const downloadURLResult = await getDownloadURL(fileRef).then((url) => {
					fileUrl = url;
				});

				setFilePath(fileUrl);
			}
		};
		uploadFiletoFirebase();
	}, [selectedFile]);

	useEffect(() => {
		const result = checkBlockorCaret();
		if (result.bool === true && selectedFile != null) {
			const nextlinePosBack =
				inputData.body
					.substring(result.endPos, inputData.body.length)
					.indexOf("\n") === -1
					? inputData.body.length
					: result.endPos +
					  inputData.body
							.substring(result.endPos, inputData.body.length)
							.indexOf("\n");
			setInputData({
				...inputData,
				body: insert(
					inputData.body,
					`\n![${selectedFile?.name}](${filePath})\n`,
					nextlinePosBack
				),
			});
		}
		setFileUploading(false);
	}, [filePath]);

	function autoAdjustTextArea(target) {
		target.style.height = "1px";
		target.style.height = target.scrollHeight + "px";
	}

	function detectContinue() {
		const result = checkBlockorCaret();
		if (result.bool === true) {
			const nextlinePos =
				inputData.body.substring(0, result.startPos).lastIndexOf("\n") === -1
					? 0
					: inputData.body.substring(0, result.startPos).lastIndexOf("\n") + 1;
			const nextlinePosBack =
				inputData.body
					.substring(result.endPos, inputData.body.length)
					.indexOf("\n") === -1
					? inputData.body.length
					: result.endPos +
					  inputData.body
							.substring(result.endPos, inputData.body.length)
							.indexOf("\n");

			if (inputData.body.substring(nextlinePos, nextlinePos + 6) === "- [ ] ") {
				setTimeout(() => {
					textAreaMarkRef.current?.setSelectionRange(
						result.startPos + 8,
						result.endPos + 8,
						0
					);
				}, 0);
				return {
					bool: true,
					text: insert(inputData.body, "\n\n- [ ] ", result.endPos),
				};
			} else if (
				inputData.body.substring(nextlinePos, nextlinePos + 2) === "- "
			) {
				setTimeout(() => {
					textAreaMarkRef.current?.setSelectionRange(
						result.startPos + 3,
						result.endPos + 3,
						0
					);
				}, 0);
				return {
					bool: true,
					text: insert(inputData.body, "\n- ", result.endPos),
				};
			}
		}
		return { bool: false, text: "" };
	}

	function insert(inputString, insertString, index) {
		return (
			inputString.slice(0, index) + insertString + inputString.slice(index)
		);
	}

	function insertBetween(inputString, insertString, index1, index2) {
		return (
			inputString.slice(0, index1) +
			insertString +
			inputString.slice(index1, index2) +
			insertString +
			inputString.slice(index2)
		);
	}

	function insertBetweenDiff(
		inputString,
		insertString1,
		insertString2,
		index1,
		index2
	) {
		return (
			inputString.slice(0, index1) +
			insertString1 +
			inputString.slice(index1, index2) +
			insertString2 +
			inputString.slice(index2)
		);
	}

	function checkBlockorCaret() {
		const startPosition = textAreaMarkRef.current.selectionStart;
		const endPosition = textAreaMarkRef.current.selectionEnd;
		if (startPosition === endPosition)
			return { bool: true, startPos: startPosition, endPos: endPosition };
		return { bool: false, startPos: startPosition, endPos: endPosition };
	}

	function handleHeading() {
		const result = checkBlockorCaret();
		if (result.bool === false) {
			setInputData({
				...inputData,
				body: insert(inputData.body, "### ", result.startPos),
			});
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.startPos + 4,
					result.endPos + 4,
					0
				);
			}, 0);
		} else {
			const spacePos = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf(" ");

			const nextlinePos = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf("\n");

			if (nextlinePos > spacePos) {
				setInputData({
					...inputData,
					body: insert(inputData.body, "### ", nextlinePos + 1),
				});
			} else {
				setInputData({
					...inputData,
					body: insert(inputData.body, "### ", spacePos + 1),
				});
			}
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.endPos + 4,
					result.endPos + 4,
					0
				);
			}, 0);
		}
	}

	function handleBold() {
		const result = checkBlockorCaret();
		if (result.bool === false) {
			setInputData({
				...inputData,
				body: insertBetween(
					inputData.body,
					"**",
					result.startPos,
					result.endPos
				),
			});
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.startPos + 2,
					result.endPos + 2,
					0
				);
			}, 0);
		} else {
			const spacePosPrev = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf(" ");

			let spacePosBack =
				inputData.body
					.substring(result.startPos, inputData.body.length)
					.indexOf(" ") === -1
					? Infinity
					: result.startPos +
					  inputData.body
							.substring(result.startPos, inputData.body.length)
							.indexOf(" ");

			const nextlinePosPrev = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf("\n");

			let nextlinePosBack =
				inputData.body
					.substring(result.startPos, inputData.body.length)
					.indexOf("\n") === -1
					? Infinity
					: result.startPos +
					  inputData.body
							.substring(result.startPos, inputData.body.length)
							.indexOf("\n");

			if (inputData.body.length === result.endPos) {
				spacePosBack = result.endPos;
				nextlinePosBack = result.endPos;
			}

			if (nextlinePosPrev > spacePosPrev) {
				if (nextlinePosBack < spacePosBack) {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"**",
							nextlinePosPrev + 1,
							nextlinePosBack
						),
					});
				} else {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"**",
							nextlinePosPrev + 1,
							spacePosBack + 1
						),
					});
				}
			} else {
				if (nextlinePosBack < spacePosBack) {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"**",
							spacePosPrev + 1,
							nextlinePosBack - 1
						),
					});
				} else {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"**",
							spacePosPrev + 1,
							spacePosBack
						),
					});
				}
			}
		}
		textAreaMarkRef.current?.focus();
		setTimeout(() => {
			textAreaMarkRef.current?.setSelectionRange(
				result.startPos + 2,
				result.endPos + 2,
				0
			);
		}, 0);
	}

	function handleItalic() {
		const result = checkBlockorCaret();
		if (result.bool === false) {
			setInputData({
				...inputData,
				body: insertBetween(
					inputData.body,
					"_",
					result.startPos,
					result.endPos
				),
			});
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.startPos + 1,
					result.endPos + 1,
					0
				);
			}, 0);
		} else {
			const spacePosPrev = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf(" ");

			let spacePosBack =
				inputData.body
					.substring(result.startPos, inputData.body.length)
					.indexOf(" ") === -1
					? Infinity
					: result.startPos +
					  inputData.body
							.substring(result.startPos, inputData.body.length)
							.indexOf(" ");

			const nextlinePosPrev = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf("\n");

			let nextlinePosBack =
				inputData.body
					.substring(result.startPos, inputData.body.length)
					.indexOf("\n") === -1
					? Infinity
					: result.startPos +
					  inputData.body
							.substring(result.startPos, inputData.body.length)
							.indexOf("\n");

			if (inputData.body.length === result.endPos) {
				spacePosBack = result.endPos;
				nextlinePosBack = result.endPos;
			}

			if (nextlinePosPrev > spacePosPrev) {
				if (nextlinePosBack < spacePosBack) {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"_",
							nextlinePosPrev + 1,
							nextlinePosBack
						),
					});
				} else {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"_",
							nextlinePosPrev + 1,
							spacePosBack + 1
						),
					});
				}
			} else {
				if (nextlinePosBack < spacePosBack) {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"_",
							spacePosPrev + 1,
							nextlinePosBack - 1
						),
					});
				} else {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"_",
							spacePosPrev + 1,
							spacePosBack
						),
					});
				}
			}
		}
		textAreaMarkRef.current?.focus();
		setTimeout(() => {
			textAreaMarkRef.current?.setSelectionRange(
				result.startPos + 1,
				result.endPos + 1,
				0
			);
		}, 0);
	}

	function handleQuoteIcon() {
		const result = checkBlockorCaret();
		if (result.bool === false) {
			setInputData({
				...inputData,
				body: insertBetweenDiff(
					inputData.body,
					"\n\n> ",
					"\n\n",
					result.startPos,
					result.endPos
				),
			});
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.startPos + 4,
					result.endPos + 4,
					0
				);
			}, 0);
		} else {
			const spacePos = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf(" ");

			const nextlinePos = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf("\n");

			const nextlinePosBack =
				inputData.body
					.substring(result.startPos, inputData.body.length)
					.indexOf("\n") === -1
					? inputData.body.length
					: result.startPos +
					  inputData.body
							.substring(result.startPos, inputData.body.length)
							.indexOf("\n");

			if (nextlinePos > spacePos) {
				setInputData({
					...inputData,
					body: insertBetweenDiff(
						inputData.body,
						"\n\n> ",
						"\n\n",
						nextlinePos + 1,
						nextlinePosBack
					),
				});
			} else {
				setInputData({
					...inputData,
					body: insertBetweenDiff(
						inputData.body,
						"\n\n> ",
						"\n\n",
						spacePos + 1,
						nextlinePosBack
					),
				});
			}
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.endPos + 4,
					result.endPos + 4,
					0
				);
			}, 0);
		}
	}

	function handleCode() {
		const result = checkBlockorCaret();
		if (result.bool === false) {
			setInputData({
				...inputData,
				body: insertBetween(
					inputData.body,
					"`",
					result.startPos,
					result.endPos
				),
			});
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.startPos + 1,
					result.endPos + 1,
					0
				);
			}, 0);
		} else {
			const spacePosPrev = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf(" ");

			let spacePosBack =
				inputData.body
					.substring(result.startPos, inputData.body.length)
					.indexOf(" ") === -1
					? Infinity
					: result.startPos +
					  inputData.body
							.substring(result.startPos, inputData.body.length)
							.indexOf(" ");

			const nextlinePosPrev = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf("\n");

			let nextlinePosBack =
				inputData.body
					.substring(result.startPos, inputData.body.length)
					.indexOf("\n") === -1
					? Infinity
					: result.startPos +
					  inputData.body
							.substring(result.startPos, inputData.body.length)
							.indexOf("\n");

			if (inputData.body.length === result.endPos) {
				spacePosBack = result.endPos;
				nextlinePosBack = result.endPos;
			}

			if (nextlinePosPrev > spacePosPrev) {
				if (nextlinePosBack < spacePosBack) {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"`",
							nextlinePosPrev + 1,
							nextlinePosBack
						),
					});
				} else {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"`",
							nextlinePosPrev + 1,
							spacePosBack + 1
						),
					});
				}
			} else {
				if (nextlinePosBack < spacePosBack) {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"`",
							spacePosPrev + 1,
							nextlinePosBack
						),
					});
				} else {
					setInputData({
						...inputData,
						body: insertBetween(
							inputData.body,
							"`",
							spacePosPrev + 1,
							spacePosBack
						),
					});
				}
			}
		}
		textAreaMarkRef.current?.focus();
		setTimeout(() => {
			textAreaMarkRef.current?.setSelectionRange(
				result.startPos + 1,
				result.endPos + 1,
				0
			);
		}, 0);
	}

	function handleLink() {
		const result = checkBlockorCaret();
		if (result.bool === false) {
			setInputData({
				...inputData,
				body: insertBetweenDiff(
					inputData.body,
					"[",
					"](url)",
					result.startPos,
					result.endPos
				),
			});
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.startPos + 1,
					result.endPos + 1,
					0
				);
			}, 0);
		} else {
			const spacePosPrev = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf(" ");

			let spacePosBack =
				inputData.body
					.substring(result.startPos, inputData.body.length)
					.indexOf(" ") === -1
					? Infinity
					: result.startPos +
					  inputData.body
							.substring(result.startPos, inputData.body.length)
							.indexOf(" ");

			const nextlinePosPrev = inputData.body
				.substring(0, result.startPos)
				.lastIndexOf("\n");

			let nextlinePosBack =
				inputData.body
					.substring(result.startPos, inputData.body.length)
					.indexOf("\n") === -1
					? Infinity
					: result.startPos +
					  inputData.body
							.substring(result.startPos, inputData.body.length)
							.indexOf("\n");

			if (inputData.body.length === result.endPos) {
				spacePosBack = result.endPos;
				nextlinePosBack = result.endPos;
			}

			if (nextlinePosPrev > spacePosPrev) {
				if (nextlinePosBack < spacePosBack) {
					setInputData({
						...inputData,
						body: insertBetweenDiff(
							inputData.body,
							"[",
							"](url)",
							nextlinePosPrev + 1,
							nextlinePosBack
						),
					});
				} else {
					setInputData({
						...inputData,
						body: insertBetweenDiff(
							inputData.body,
							"[",
							"](url)",
							nextlinePosPrev + 1,
							spacePosBack + 1
						),
					});
				}
			} else {
				if (nextlinePosBack < spacePosBack) {
					setInputData({
						...inputData,
						body: insertBetweenDiff(
							inputData.body,
							"[",
							"](url)",
							spacePosPrev + 1,
							nextlinePosBack
						),
					});
				} else {
					setInputData({
						...inputData,
						body: insertBetweenDiff(
							inputData.body,
							"[",
							"](url)",
							spacePosPrev + 1,
							spacePosBack
						),
					});
				}
			}
		}
		textAreaMarkRef.current?.focus();
		setTimeout(() => {
			textAreaMarkRef.current?.setSelectionRange(
				result.startPos + 1,
				result.endPos + 1,
				0
			);
		}, 0);
	}

	function handleListUnordered() {
		const result = checkBlockorCaret();
		const nextlinePos =
			inputData.body.substring(0, result.startPos).lastIndexOf("\n") === -1
				? 0
				: inputData.body.substring(0, result.startPos).lastIndexOf("\n") + 1;

		const nextlinePosBack =
			inputData.body
				.substring(result.endPos, inputData.body.length)
				.indexOf("\n") === -1
				? inputData.body.length
				: result.endPos +
				  inputData.body
						.substring(result.endPos, inputData.body.length)
						.indexOf("\n");

		setInputData({
			...inputData,
			body: insert(inputData.body, "- ", nextlinePos),
		});

		if (result.bool === true) {
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.startPos + 2,
					result.endPos + 2
				);
			}, 0);
		} else {
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					nextlinePos,
					nextlinePosBack + 2
				);
			}, 0);
		}
	}

	function getIssueStateReason() {
		if (
			JSON.stringify(issueState) == JSON.stringify(closureStates.closeIssue)
		) {
			return {
				state: "closed",
				state_reason: "completed",
				stateID: 0,
			};
		} else if (
			JSON.stringify(issueState) == JSON.stringify(closureStates.closeComment)
		) {
			return {
				state: "closed",
				state_reason: "completed",
				stateID: 1,
			};
		} else if (
			JSON.stringify(issueState) == JSON.stringify(closureStates.closeComplete)
		) {
			return {
				state: "closed",
				state_reason: "completed",
				stateID: 2,
			};
		} else if (
			JSON.stringify(issueState) == JSON.stringify(closureStates.closeSkip)
		) {
			return {
				state: "closed",
				state_reason: "not_planned",
				stateID: 3,
			};
		} else if (
			JSON.stringify(issueState) ==
			JSON.stringify(closureStates.closeSkipComment)
		) {
			return {
				state: "closed",
				state_reason: "not_planned",
				stateID: 4,
			};
		} else if (
			JSON.stringify(issueState) == JSON.stringify(closureStates.reopen)
		) {
			return {
				state: "open",
				state_reason: "reopened",
				stateID: 5,
			};
		} else if (
			JSON.stringify(issueState) ==
			JSON.stringify(closureStates.closeNotPlanned)
		) {
			return {
				state: "closed",
				state_reason: "not_planned",
				stateID: 6,
			};
		}
	}

	function handleTask() {
		const result = checkBlockorCaret();
		const nextlinePos =
			inputData.body.substring(0, result.startPos).lastIndexOf(" ") === -1
				? 0
				: inputData.body.substring(0, result.startPos).lastIndexOf(" ") + 1;

		const nextlinePosBack =
			inputData.body
				.substring(result.endPos, inputData.body.length)
				.indexOf("\n") === -1
				? inputData.body.length
				: result.endPos +
				  inputData.body
						.substring(result.endPos, inputData.body.length)
						.indexOf("\n");

		if (result.bool === true) {
			setInputData({
				...inputData,
				body: insert(inputData.body, "\n\n- [ ] ", nextlinePos),
			});

			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.startPos + 8,
					result.endPos + 8
				);
			}, 0);
		} else {
			setInputData({
				...inputData,
				body: insertBetweenDiff(
					inputData.body,
					"\n\n- [ ] ",
					"\n\n",
					result.startPos,
					result.endPos
				),
			});
			textAreaMarkRef.current?.focus();
			setTimeout(() => {
				textAreaMarkRef.current?.setSelectionRange(
					result.startPos + 8,
					result.endPos + 8
				);
			}, 0);
		}
	}

	const renderer = {
		listitem(text: string, booleantask: boolean, checked: boolean) {
			if (checked !== undefined) {
				return `<li class='check'>${text}</li>`;
			}
			return `<li>${text}</li>`;
		},
		paragraph(text: string) {
			const mentionText = text.match(/^\@/g);
			const hashText = text.match(/^\#/g);
			if (!hashText && !mentionText) {
				return `<p>${text}</p>`;
			}
			return `<button ${
				mentionText ? "class=mention" : "class=hash"
			}>${text}</button>`;
		},
	};

	marked.use({ renderer });

	marked.setOptions({ breaks: true, gfm: true, langPrefix: "hljs language-" });

	return (
		<div className="w-[inherit] flex">
			<div
				className={`relative flex before:absolute before:top-0 before:bottom-0 before:left-5 md:before:left-20 before:z-[-1] before:content-[''] before:w-[2px] before:bg-[#d8dee4] w-full ${
					param?.timeline?.open
						? param?.timeline?.isFirst
							? "pb-[16px]"
							: "py-[16px]"
						: ""
				} ${param?.topTimeline ? "pt-[16px]" : ""}`}
			>
				<div
					className={`flex w-full bg-[#ffffff] ${
						param?.topTimeline
							? "border-t-[2px] border-solid border-[#d0d7de] md:pt-4"
							: ""
					}`}
				>
					<div className="hidden mr-4 shrink-0 md:block">
						<span>
							<a className="cursor-pointer">
								<img
									src={avatar}
									className="w-[40px] h-[40px] rounded-[50%] overflow-hidden shadow-[0_0_0_1px_rgba(27,31,36,0.15)]"
								/>
							</a>
						</span>
					</div>
					<div className={`grow bg-[#ffffff]`}>
						<div
							className="md:relative md:border md:border-solid md:border-[#d0d7de] md:rounded-md md:before:absolute md:before:top-[11px] md:before:right-[100%] md:before:left-[-14px] md:before:block md:before:w-[8px] md:before:h-[16px] md:before:content-[''] md:before:border-[7px] md:before:border-solid md:before:border-[transparent] md:before:border-r-[#d0d7de]
        md:after:absolute md:after:top-[11px] md:after:right-[100%] md:after:left-[-13px] md:after:block md:after:w-[8px] md:after:h-[16px] md:after:content-[''] md:after:border-[7px] md:after:border-solid md:after:border-[transparent] md:after:border-r-[#ffffff]
        "
						>
							{param?.closeTitleInput ? (
								<div className="mb-4 md:mb-2"></div>
							) : (
								<div className="mb-4 md:p-2 md:mb-2">
									<input
										value={inputData.title}
										autoComplete="off"
										placeholder="Title"
										className="py-[5px] px-[12px] text-[16px] leading-5 bg-no-repeat border border-solid border-[#d0d7de] rounded-[6px] shadow-[inset_0_1px_0_rgba(208,215,222,0.2)] text-[#24292f] w-[100%] bg-[#f6f8fa] focus:bg-[#ffffff] focus:border-[#0969da] focus:outline-0 focus:shadow-[inset_0_0_0_1px_#0969da]"
										onChange={(e) => {
											setInputData({ ...inputData, title: e.target.value });
										}}
									/>
								</div>
							)}
							<div className="flex flex-wrap w-[100%] mb-2 ">
								<div className="w-[100%] md:px-2 md:border-b md:border-solid md:border-[#d0d7de] lg:flex lg:justify-between">
									<div className="lg:flex">
										<button
											className={`text-[14px] ${
												writeOnClick ? "text-[#24292f]" : "text-[#57606a]"
											} font-normal px-[40px] md:px-[16px] py-[8px] border border-solid border-[#d0d7de] w-[50%] ${
												writeOnClick
													? "border-b-[0px] md:rounded-t-md md:border-b-[1px] md:border-b-[#ffffff] md:mb-[-1px]"
													: "md:border-none"
											} ${
												writeOnClick
													? "bg-[#ffffff]"
													: "bg-[#f6f8fa] md:bg-[#ffffff]"
											} md:w-[auto]`}
											onClick={() => setWriteOnClick(true)}
										>
											Write
										</button>
										<button
											className={`text-[14px] ${
												!writeOnClick ? "text-[#24292f]" : "text-[#57606a]"
											} font-normal px-[40px] md:px-[16px] py-[8px] border border-solid border-[#d0d7de] border-l-0 flex-1 ${
												!writeOnClick
													? "bg-[#ffffff]"
													: "bg-[#f6f8fa] md:bg-[#ffffff]"
											} w-[50%] ${
												!writeOnClick
													? "border-b-[0px] md:rounded-t-md md:border-l-[1px] md:border-b-[1px] md:border-b-[#ffffff] md:mb-[-1px]"
													: "md:border-none"
											} md:w-[auto]`}
											onClick={() => setWriteOnClick(false)}
										>
											Preview
										</button>
									</div>
									<div
										className={`hidden whitespace-nowrap px-2 pt-2 flex-wrap items-start justify-between w-[100%]   ${
											writeOnClick ? "lg:flex" : "hidden"
										}`}
									>
										<div className="w-[100%] flex flex-wrap justify-end">
											<button
												className="group p-1 ml-[5px]"
												onClick={() => {
													handleHeading();
												}}
											>
												<HeadingIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-1 ml-[5px]"
												onClick={() => {
													// e.preventDefault();
													// textAreaMarkRef.current?.trigger("bold");
													// const result = checkBlockorCaret();
													// textAreaMarkRef.current?.focus();
													handleBold();
												}}
											>
												<BoldIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-1 ml-[5px]"
												onClick={() => {
													handleItalic();
												}}
											>
												<ItalicIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-1 ml-[5px]"
												onClick={() => {
													handleQuoteIcon();
												}}
											>
												<QuoteIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-1 ml-[5px]"
												onClick={() => {
													handleCode();
												}}
											>
												<CodeIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-1 ml-[5px]"
												onClick={() => {
													handleLink();
												}}
											>
												<LinkIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-1 ml-[5px]"
												onClick={() => {
													handleListUnordered();
												}}
											>
												<ListUnorderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button>
												<ListOrderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-1 ml-[5px]"
												onClick={() => {
													handleTask();
												}}
											>
												<TasklistIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button className="group p-1 mx-1">
												<MentionIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button className="group p-1 mx-1">
												<CrossReferenceIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button className="group p-1 mx-1">
												<ReplyIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
										</div>
									</div>
								</div>
								<div
									className={`flex whitespace-nowrap px-2 pt-2 flex-wrap items-start justify-between w-[100%] md:hidden  ${
										writeOnClick ? "" : "hidden"
									}`}
								>
									<button
										onClick={() =>
											setSmallScreenMarkItemShowOnClick((prev) => !prev)
										}
										className="group py-2 px-1 ml-[5px] mr-[4px]"
									>
										<TypographyIcon className="group-hover:fill-[#0969da] fill-[#57606a] mr-1" />
										{smallScreenMarkItemShowOnClick ? (
											<ChevronDownIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										) : (
											<ChevronUpIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										)}
									</button>
									<div>
										<button
											className="group p-2 ml-[5px]"
											onClick={() => {
												handleQuoteIcon();
											}}
										>
											<QuoteIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button
											className="group p-2 ml-[5px]"
											onClick={() => {
												handleCode();
											}}
										>
											<CodeIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button
											className="group p-2 ml-[5px]"
											onClick={() => {
												handleLink();
											}}
										>
											<LinkIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<div className="hidden xs:inline-block">
											<button className="group p-2 mx-1">
												<MentionIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button className="group p-2 mx-1">
												<ImageIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button className="group p-2 mx-1">
												<CrossReferenceIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button className="group p-2 mx-1">
												<ReplyIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
										</div>
									</div>
									<div className="w-[100%] xs:hidden">
										<button className="group p-2 mx-1">
											<MentionIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button className="group p-2 mx-1">
											<ImageIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button className="group p-2 mx-1">
											<CrossReferenceIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button className="group p-2 mx-1">
											<ReplyIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
									</div>
									{smallScreenMarkItemShowOnClick ? (
										<div className="w-[100%] flex flex-wrap">
											<button
												className="group p-2 pl-[4px] mx-1 ml-[5px]"
												onClick={() => {
													handleHeading();
												}}
											>
												<HeadingIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-2 ml-[5px]"
												onClick={() => {
													// e.preventDefault();
													// textAreaMarkRef.current?.trigger("bold");
													// checkBlockorCaret();
													// textAreaMarkRef.current?.focus();
													handleBold();
												}}
											>
												<BoldIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-2 ml-[5px]"
												onClick={() => {
													handleItalic();
												}}
											>
												<ItalicIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-2 ml-[5px]"
												onClick={() => {
													handleListUnordered();
												}}
											>
												<ListUnorderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button>
												<ListOrderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
											<button
												className="group p-2 ml-[5px]"
												onClick={() => {
													handleTask();
												}}
											>
												<TasklistIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
											</button>
										</div>
									) : (
										<></>
									)}
								</div>
								<div
									className={`hidden whitespace-nowrap px-2 pt-2 flex-wrap items-start justify-between w-[100%]  lg:hidden  ${
										writeOnClick ? "md:flex" : "hidden"
									}`}
								>
									<div
										className={`w-[100%] flex flex-wrap  ${
											writeOnClick ? "" : "hidden"
										}`}
									>
										<button
											className="group p-1 ml-[5px]"
											onClick={() => {
												handleHeading();
											}}
										>
											<HeadingIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button
											className="group p-1 ml-[5px]"
											onClick={(e) => {
												// e.preventDefault();
												// textAreaMarkRef.current?.trigger("bold");
												// checkBlockorCaret();
												// textAreaMarkRef.current?.focus();
												handleBold();
											}}
										>
											<BoldIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button
											className="group p-1 ml-[5px]"
											onClick={() => {
												handleItalic();
											}}
										>
											<ItalicIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button
											className="group p-1 ml-[5px]"
											onClick={() => {
												handleQuoteIcon();
											}}
										>
											<QuoteIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button
											className="group p-1 ml-[5px]"
											onClick={() => {
												handleCode();
											}}
										>
											<CodeIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button
											className="group p-1 ml-[5px]"
											onClick={() => {
												handleLink();
											}}
										>
											<LinkIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button
											className="group p-1 ml-[5px]"
											onClick={() => {
												handleListUnordered();
											}}
										>
											<ListUnorderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button className="group p-1 ml-[5px]">
											<ListOrderedIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button
											className="group p-1 ml-[5px]"
											onClick={() => {
												handleTask();
											}}
										>
											<TasklistIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button className="group p-1 mx-1">
											<MentionIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button className="group p-1 mx-1">
											<CrossReferenceIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
										<button className="group p-1 mx-1">
											<ReplyIcon className="group-hover:fill-[#0969da] fill-[#57606a]" />
										</button>
									</div>
								</div>
							</div>
							<div className="w-[100%]">
								<div
									className={`break-words text-[14px] w-[100%] md:p-2 md:pt-0`}
								>
									<div
										tabIndex={0}
										className={`md:border md:border-solid md:border-[#d0d7de] md:shadow-[inset_0_1px_0_rgba(208,215,222,0.2)] md:rounded-t-md md:border-b-0  ${
											writeOnClick ? "" : "hidden"
										}`}
									>
										<textarea
											ref={textAreaMarkRef}
											value={inputData.body}
											placeholder="Leave a comment"
											className={`block max-h-[100%] h-auto resize-none overflow-hidden p-2 rounded-md text-[14px] bg-[#f6f8fa] ${
												param?.closeTitleInput
													? "h-[100px] min-h-[100px]"
													: "h-[200px] min-h-[200px]"
											} border border-solid border-[#d0d7de] shadow-[inset_0_1px_0_rgba(208,215,222,0.2)] bg-no-repeat w-[100%] outline-0 focus:border-[#0969da] focus:shadow-[inset_0_0_0_1px_#0969da] focus:bg-[#ffffff] md:border-0 md:border-b-[1px] md:border-dashed md:rounded-none md:focus:shadow-none md:focus:border-b-[1px] md:focus:border-dashed md:focus:border-[#0969da] ${
												writeOnClick ? "" : "hidden"
											}`}
											onChange={(e) => {
												setInputData({ ...inputData, body: e.target.value });
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													const result = detectContinue();
													if (result.bool === true) {
														setInputData({ ...inputData, body: result.text });
													}
												}
											}}
										></textarea>
									</div>
									<label
										htmlFor="uploadFile"
										className={`hidden cursor-pointer bg-[#f6f8fa] md:border md:border-solid md:border-[#d0d7de] md:justify-between md:font-normal md:py-[7px] md:px-[10px] md:rounded-b-md md:border-t-[0px] ${
											writeOnClick ? "md:relative md:flex" : "hidden"
										}`}
									>
										<input
											id="uploadFile"
											type="file"
											title=" "
											accept=".gif,.jpeg,.jpg,.mov,.mp4,.png,.svg,.webm,.csv,.docx,.fodg,.fodp,.fods,.fodt,.gz,.log,.md,.odf,.odg,.odp,.ods,.odt,.pdf,.pptx,.tgz,.txt,.xls,.xlsx,.zip"
											className={`hidden bg-[#f6f8fa] overflow-hidden md:min-h-[0px] md:ml-0 md:w-[100%] md:inset-0 md:p-[5px]  ${
												writeOnClick ? " md:absolute" : "hidden"
											}`}
											onChange={(e) => {
												if (e.target.files[0] != null) {
													setFileUploading(true);
													setSelectedFile({
														file: e.target.files[0],
														name: e.target.files[0]?.name,
													});
												}
											}}
										></input>
										<span
											className={`relative pr-2  ${
												writeOnClick ? "" : "hidden"
											}`}
										>
											{fileUploading ? (
												<span className="font-normal text-[13px] text-[#57606a]">
													uploading...
												</span>
											) : (
												<span className="font-normal text-[13px] text-[#57606a]">
													Attach files by dragging & dropping, selecting or
													pasting them.
												</span>
											)}
										</span>
										<a
											href="https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
											className="relative"
										>
											<MarkdownIcon className="fill-[#57606a] hover:fill-[#0969da]" />
										</a>
									</label>

									<div className={`${writeOnClick ? "hidden" : ""} py-2 px-2`}>
										<div
											className={`${writeOnClick ? "hidden" : ""} ${
												param?.closeTitleInput
													? "min-h-[100px]"
													: "min-h-[231px]"
											} border-b border-solid border-[#d0d7de] prose`}
											dangerouslySetInnerHTML={{
												__html: marked(inputData.body),
											}}
										></div>
									</div>
								</div>
							</div>

							<div className={`hidden md:flex mx-2 mb-2`}>
								{param?.closeMarkdownSupportTag ? (
									<div className="flex flex-auto items-center"></div>
								) : (
									<div className="group flex flex-auto items-center">
										<a
											href="https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
											className="group-hover:text-[#0969da] text-[12px] text-[#57606a]"
										>
											<MarkdownIcon className="group-hover:fill-[#0969da] inline-block mr-[6px] overflow-visible align-bottom" />
											Styling with Markdown is supported
										</a>
									</div>
								)}
								{param?.closeIssue?.open ? (
									<div>
										<div className="flex justify-end break-words">
											{param?.closeIssue?.state === 0 ||
											!param?.closeIssue?.state ? (
												<div className="flex justify-center mr-1">
													<button
														className="flex items-center text-[14px] text-[#24292f] bg-[#f6f8fa] py-[5px] px-[16px] rounded-l-md border border-solid border-[rgba(27,31,36,0.15)]"
														onClick={() => {
															param?.closeIssue?.setStateInfoFunction?.(
																getIssueStateReason()
															);
														}}
													>
														{issueState}
													</button>
													<button
														className=" relative text-center bg-[#f6f8fa] py-[5px] px-[16px] rounded-r-md  border border-solid border-[rgba(27,31,36,0.15)] border-l-[0px]"
														onClick={() => setOpenStateOptions((prev) => !prev)}
													>
														<span className=" text-[14px] inline-block w-0 h-0 mb-[2px] border-transparent border-t-[#24292f] border-solid border-4 border-b-0 content-['']"></span>
														<div
															className={`${
																openStateOptions ? "absolute" : "hidden"
															} bg-[#ffffff] z-[15] right-0 border border-solid border-[#d0d7de] w-[300px] mt-3 mb-5 rounded-[6px]`}
														>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-solid hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	inputData.body != "" && inputData.body != null
																		? setIssueState(closureStates.closeComment)
																		: setIssueState(closureStates.closeIssue);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeIssue
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeComment
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeComplete
																				)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<IssueClosedIcon className="fill-[#8250df] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Close as completed
																		</div>
																	</div>

																	<div className="text-[12px] font-medium text-[#57606a] mt-1 truncate">
																		Done, closed, fixed, resolved
																	</div>
																</div>
															</button>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-none hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	inputData.body != "" && inputData.body != null
																		? setIssueState(
																				closureStates.closeSkipComment
																		  )
																		: setIssueState(closureStates.closeSkip);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeSkip
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeSkipComment
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeNotPlanned
																				)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<SkipIcon className="fill-[#57606a] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Close as not planned
																		</div>
																	</div>

																	<div className="text-[12px] font-medium text-[#57606a] mt-1 truncate">
																		Won't fix, can't repro, duplicate, state
																	</div>
																</div>
															</button>
														</div>
													</button>
												</div>
											) : param?.closeIssue?.state === 1 ? (
												<div className="flex justify-center mr-1">
													<button
														className="flex items-center text-[14px] text-[#24292f] bg-[#f6f8fa] py-[5px] px-[16px] rounded-l-md border border-solid border-[rgba(27,31,36,0.15)]"
														onClick={() => {
															param?.closeIssue?.setStateInfoFunction?.(
																getIssueStateReason()
															);
														}}
													>
														{issueState}
													</button>
													<button
														className=" relative text-center bg-[#f6f8fa] py-[5px] px-[16px] rounded-r-md  border border-solid border-[rgba(27,31,36,0.15)] border-l-[0px]"
														onClick={() => setOpenStateOptions((prev) => !prev)}
													>
														<span className=" text-[14px] inline-block w-0 h-0 mb-[2px] border-transparent border-t-[#24292f] border-solid border-4 border-b-0 content-['']"></span>
														<div
															className={`${
																openStateOptions ? "absolute" : "hidden"
															} bg-[#ffffff] z-[15] right-0 border border-solid border-[#d0d7de] w-[300px] mt-3 mb-5 rounded-[6px]`}
														>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b 
											
												"border-solid"
												
										hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	setIssueState(closureStates.reopen);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																			JSON.stringify(closureStates.reopen)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<IssueReopenedIcon className="fill-[#1a7f3c] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f] truncate sm:pt-[2px]">
																			Reopen issue
																		</div>
																	</div>
																</div>
															</button>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-none hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	setIssueState(closureStates.closeComplete);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeIssue
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeComment
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeComplete
																				)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<IssueClosedIcon className="fill-[#8250df] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Close as completed
																		</div>
																	</div>
																</div>
															</button>
														</div>
													</button>
												</div>
											) : (
												<div className="flex justify-center mr-1">
													<button
														className="flex items-center text-[14px] text-[#24292f] bg-[#f6f8fa] py-[5px] px-[16px] rounded-l-md border border-solid border-[rgba(27,31,36,0.15)]"
														onClick={() => {
															param?.closeIssue?.setStateInfoFunction?.(
																getIssueStateReason()
															);
														}}
													>
														{issueState}
													</button>
													<button
														className=" relative text-center bg-[#f6f8fa] py-[5px] px-[16px] rounded-r-md  border border-solid border-[rgba(27,31,36,0.15)] border-l-[0px]"
														onClick={() => setOpenStateOptions((prev) => !prev)}
													>
														<span className=" text-[14px] inline-block w-0 h-0 mb-[2px] border-transparent border-t-[#24292f] border-solid border-4 border-b-0 content-['']"></span>
														<div
															className={`${
																openStateOptions ? "absolute" : "hidden"
															} bg-[#ffffff] z-[15] right-0 border border-solid border-[#d0d7de] w-[300px] mt-3 mb-5 rounded-[6px]`}
														>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b 
											
												"border-solid"
												
										hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	setIssueState(closureStates.reopen);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																			JSON.stringify(closureStates.reopen)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<IssueReopenedIcon className="fill-[#1a7f37] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Reopen issue
																		</div>
																	</div>
																</div>
															</button>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-none hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	setIssueState(closureStates.closeNotPlanned);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeSkip
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeSkipComment
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeNotPlanned
																				)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<SkipIcon className="fill-[#57606a] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Close as not planned
																		</div>
																	</div>
																</div>
															</button>
														</div>
													</button>
												</div>
											)}
											<ButtonShare
												param={{}}
												textColor={"#ffffff"}
												backgroundColor={"#2da44e"}
												textSize={"14px"}
												displayText={"Comment"}
												borderColor={"rgba(27,31,36,0.15)"}
												hoverColor={"#2c974b"}
												hoverBorderColor={"rgba(27,31,36,0.15)"}
												isAble={
													inputData.body != null && inputData.body != ""
														? true
														: false
												}
												onClickFunc={() => {}}
											/>
										</div>
									</div>
								) : param?.editComment?.open ? (
									<>
										<div className="mr-[5px]">
											<ButtonShare
												param={{ hoverTextColor: "#ffffff" }}
												textColor={"#cf222e"}
												backgroundColor={"#f6f8fa"}
												textSize={"14px"}
												displayText={"Cancel"}
												borderColor={"rgba(27,31,36,0.15)"}
												hoverColor={"#a40126"}
												hoverBorderColor={"rgba(27,31,36,0.15)"}
												isAble={true}
												onClickFunc={() => {
													param?.editComment?.cancelClickFunction?.();
												}}
											/>
										</div>
										<ButtonShare
											param={{}}
											textColor={"#ffffff"}
											backgroundColor={"#2da44e"}
											textSize={"14px"}
											displayText={"Update comment"}
											borderColor={"rgba(27,31,36,0.15)"}
											hoverColor={"#2c974b"}
											hoverBorderColor={"rgba(27,31,36,0.15)"}
											isAble={true}
											onClickFunc={() => {
												console.log(
													param?.editComment?.updateCommentActionApiHook
												);
												param?.editComment?.updateCommentActionApiHook?.();

												param?.editComment?.updateIssueActionApiHook({
													...param?.editComment?.editApiData,
													editData: {
														body: inputData.body,
													},
												});
												param?.editComment?.cancelClickFunction?.();
											}}
										/>
									</>
								) : (
									<ButtonShare
										param={{}}
										textColor={"#ffffff"}
										backgroundColor={"#2da44e"}
										textSize={"14px"}
										displayText={"Submit new issue"}
										borderColor={"rgba(27,31,36,0.15)"}
										hoverColor={"#2c974b"}
										hoverBorderColor={"rgba(27,31,36,0.15)"}
										isAble={
											inputData.title != null && inputData.title != ""
												? true
												: false
										}
										onClickFunc={() => {
											param.submitIssue.submitAction();
										}}
									/>
								)}
							</div>

							<div className="flex justify-end mt-2 smd:hidden">
								{param?.closeIssue?.open ? (
									<div>
										<div className="flex justify-end break-words">
											{param?.closeIssue?.state === 0 ||
											!param?.closeIssue?.state ? (
												<div className="flex justify-center mr-1">
													<button
														className="flex items-center text-[14px] text-[#24292f] bg-[#f6f8fa] py-[5px] px-[16px] rounded-l-md border border-solid border-[rgba(27,31,36,0.15)]"
														onClick={() => {
															param?.closeIssue?.setStateInfoFunction?.(
																getIssueStateReason()
															);
														}}
													>
														{issueState}
													</button>
													<button
														className=" relative text-center bg-[#f6f8fa] py-[5px] px-[16px] rounded-r-md  border border-solid border-[rgba(27,31,36,0.15)] border-l-[0px]"
														onClick={() => setOpenStateOptions((prev) => !prev)}
													>
														<span className=" text-[14px] inline-block w-0 h-0 mb-[2px] border-transparent border-t-[#24292f] border-solid border-4 border-b-0 content-['']"></span>
														<div
															className={`${
																openStateOptions ? "absolute" : "hidden"
															} bg-[#ffffff] z-[15] right-0 border border-solid border-[#d0d7de] w-[300px] mt-3 mb-5 rounded-[6px]`}
														>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-solid hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	inputData.body != "" && inputData.body != null
																		? setIssueState(closureStates.closeComment)
																		: setIssueState(closureStates.closeIssue);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeIssue
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeComment
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeComplete
																				)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<IssueClosedIcon className="fill-[#8250df] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Close as completed
																		</div>
																	</div>

																	<div className="text-[12px] font-medium text-[#57606a] mt-1 truncate">
																		Done, closed, fixed, resolved
																	</div>
																</div>
															</button>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-none hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	inputData.body != "" && inputData.body != null
																		? setIssueState(
																				closureStates.closeSkipComment
																		  )
																		: setIssueState(closureStates.closeSkip);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeSkip
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeSkipComment
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeNotPlanned
																				)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<SkipIcon className="fill-[#57606a] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Close as not planned
																		</div>
																	</div>

																	<div className="text-[12px] font-medium text-[#57606a] mt-1 truncate">
																		Won't fix, can't repro, duplicate, state
																	</div>
																</div>
															</button>
														</div>
													</button>
												</div>
											) : param?.closeIssue?.state === 1 ? (
												<div className="flex justify-center mr-1">
													<button
														className="flex items-center text-[14px] text-[#24292f] bg-[#f6f8fa] py-[5px] px-[16px] rounded-l-md border border-solid border-[rgba(27,31,36,0.15)]"
														onClick={() => {
															param?.closeIssue?.setStateInfoFunction?.(
																getIssueStateReason()
															);
														}}
													>
														{issueState}
													</button>
													<button
														className=" relative text-center bg-[#f6f8fa] py-[5px] px-[16px] rounded-r-md  border border-solid border-[rgba(27,31,36,0.15)] border-l-[0px]"
														onClick={() => setOpenStateOptions((prev) => !prev)}
													>
														<span className=" text-[14px] inline-block w-0 h-0 mb-[2px] border-transparent border-t-[#24292f] border-solid border-4 border-b-0 content-['']"></span>
														<div
															className={`${
																openStateOptions ? "absolute" : "hidden"
															} bg-[#ffffff] z-[15] right-0 border border-solid border-[#d0d7de] w-[300px] mt-3 mb-5 rounded-[6px]`}
														>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b 
											
												"border-solid"
												
										hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	setIssueState(closureStates.reopen);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																			JSON.stringify(closureStates.reopen)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<IssueReopenedIcon className="fill-[#1a7f3c] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f] truncate sm:pt-[2px]">
																			Reopen issue
																		</div>
																	</div>
																</div>
															</button>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-none hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	setIssueState(closureStates.closeComplete);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeIssue
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeComment
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeComplete
																				)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<IssueClosedIcon className="fill-[#8250df] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Close as completed
																		</div>
																	</div>
																</div>
															</button>
														</div>
													</button>
												</div>
											) : (
												<div className="flex justify-center mr-1">
													<button
														className="flex items-center text-[14px] text-[#24292f] bg-[#f6f8fa] py-[5px] px-[16px] rounded-l-md border border-solid border-[rgba(27,31,36,0.15)]"
														onClick={() => {
															param?.closeIssue?.setStateInfoFunction?.(
																getIssueStateReason()
															);
														}}
													>
														{issueState}
													</button>
													<button
														className=" relative text-center bg-[#f6f8fa] py-[5px] px-[16px] rounded-r-md  border border-solid border-[rgba(27,31,36,0.15)] border-l-[0px]"
														onClick={() => setOpenStateOptions((prev) => !prev)}
													>
														<span className=" text-[14px] inline-block w-0 h-0 mb-[2px] border-transparent border-t-[#24292f] border-solid border-4 border-b-0 content-['']"></span>
														<div
															className={`${
																openStateOptions ? "absolute" : "hidden"
															} bg-[#ffffff] z-[15] right-0 border border-solid border-[#d0d7de] w-[300px] mt-3 mb-5 rounded-[6px]`}
														>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b 
											
												"border-solid"
												
										hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	setIssueState(closureStates.reopen);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																			JSON.stringify(closureStates.reopen)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<IssueReopenedIcon className="fill-[#1a7f37] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Reopen issue
																		</div>
																	</div>
																</div>
															</button>
															<button
																className={`flex items-start w-full p-4 overflow-hidden text-[#24292f] text-left cursor-pointer border-b border-none hover:bg-[rgba(234,238,242,0.5)] border-b-[hsla(210,18%,87%,1)] pl-[8px] py-2 pr-2`}
																onClick={(e) => {
																	setIssueState(closureStates.closeNotPlanned);
																	setOpenStateOptions(false);
																	e.stopPropagation();
																}}
															>
																<div className="flex items-start mr-1">
																	<CheckIcon
																		className={`${
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeSkip
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeSkipComment
																				) ||
																			JSON.stringify(issueState) ==
																				JSON.stringify(
																					closureStates.closeNotPlanned
																				)
																				? "fill-[#000000]"
																				: "fill-[#ffffff]"
																		}`}
																	/>
																</div>

																<div className="leading-tight min-w-0">
																	<div className="flex items-center">
																		<SkipIcon className="fill-[#57606a] mt-px rounded-[2em] w-[16px] h-[16px] mr-1" />

																		<div className="text-[14px] font-semibold text-[#24292f]truncate sm:pt-[2px]">
																			Close as not planned
																		</div>
																	</div>
																</div>
															</button>
														</div>
													</button>
												</div>
											)}
											<ButtonShare
												param={{}}
												textColor={"#ffffff"}
												backgroundColor={"#2da44e"}
												textSize={"14px"}
												displayText={"Comment"}
												borderColor={"rgba(27,31,36,0.15)"}
												hoverColor={"#2c974b"}
												hoverBorderColor={"rgba(27,31,36,0.15)"}
												isAble={
													inputData.body != null && inputData.body != ""
														? true
														: false
												}
												onClickFunc={() => {}}
											/>
										</div>
									</div>
								) : param?.editComment?.open ? (
									<>
										<div className="mr-[5px]">
											<ButtonShare
												param={{ hoverTextColor: "#ffffff" }}
												textColor={"#cf222e"}
												backgroundColor={"#f6f8fa"}
												textSize={"14px"}
												displayText={"Cancel"}
												borderColor={"rgba(27,31,36,0.15)"}
												hoverColor={"#a40126"}
												hoverBorderColor={"rgba(27,31,36,0.15)"}
												isAble={true}
												onClickFunc={() => {
													param?.editComment?.cancelClickFunction?.();
												}}
											/>
										</div>
										<ButtonShare
											param={{}}
											textColor={"#ffffff"}
											backgroundColor={"#2da44e"}
											textSize={"14px"}
											displayText={"Update comment"}
											borderColor={"rgba(27,31,36,0.15)"}
											hoverColor={"#2c974b"}
											hoverBorderColor={"rgba(27,31,36,0.15)"}
											isAble={true}
											onClickFunc={() => {
												console.log(
													param?.editComment?.updateCommentActionApiHook
												);

												param?.editComment?.updateCommentActionApiHook?.();

												param?.editComment?.updateIssueActionApiHook({
													...param?.editComment?.editApiData,
													editData: {
														body: inputData.body,
													},
												});
												param?.editComment?.cancelClickFunction?.();
											}}
										/>
									</>
								) : (
									<></>
								)}
							</div>
						</div>

						{param?.closeContributionsGuideline ? (
							<></>
						) : (
							<div className="text-[12px] mt-[12px] mb-6 text-[#57606a] md:m-2">
								<InfoIcon className="fill-[#57606a] mr-1" />
								Remember, contributions to this repository should follow our
								<a
									href="https://docs.github.com/articles/github-community-guidelines"
									className="text-[#0969da] hover:underline"
								>
									{" "}
									GitHub Community Guidelines
								</a>
								.
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
