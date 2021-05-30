import EditorJS from "@editorjs/editorjs";

import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Underline from "@editorjs/underline";
import ImageTool from "@editorjs/image";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Delimiter from "@editorjs/delimiter";

function initializeEditorJS(holder, tools = {}, blocks, placeholder, config = {}) {
	const editor = new EditorJS({
		holder,
		tools,
		data: {
			blocks,
		},
		placeholder,
		...config,
		onReady: () => {
			document.querySelector(".codex-editor__redactor").style.padding = "1rem";
		},
	});
	return editor;
}

function editor(holder, blocks = []) {
	return initializeEditorJS(
		holder,
		{
			heading: {
				class: Header,
				config: {
					levels: [3, 4, 5, 6],
					default: 3,
				},
			},
			link: { class: LinkTool, inlineToolbar: true },
			underline: { class: Underline, inlineToolbar: true },
			alignment: AlignmentTuneTool,
			image: {
				class: ImageTool,
				config: {
					additionalRequestHeaders: {
						Authorization: localStorage.getItem("token") ?? "",
					},
					endpoints: {
						byFile: "/api/articles/uploadFile",
					},
				},
			},
			paragraph: {
				class: Paragraph,
				inlineToolbar: true,
			},
			list: {
				class: List,
				inlineToolbar: true,
			},
			delimiter: Delimiter,
		},
		blocks,
		"Start Writing..."
	);
}

export default editor;
