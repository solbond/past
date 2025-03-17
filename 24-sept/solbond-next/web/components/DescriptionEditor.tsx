import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useCallback } from "react"
import { useProxy } from "valtio/utils"
import Icons from "./Icons"
import { NewRouteState } from "./routes/product/manage"

export default function DescriptionEditor() {
	const local = useProxy(NewRouteState)
	const editor = useEditor({
		extensions: [
			StarterKit,
			Link.configure({
				HTMLAttributes: {
					class: "border-b border-[--PrimaryText] cursor-pointer"
				}
			}),

			Placeholder.configure({
				placeholder: "Description …"
			})
		],
		content: "",
		onUpdate: ({ editor }) => {
			local.description = editor.getText()
		},
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-[300px] overflow-auto "
			}
		}
	})
	const setLink = useCallback(() => {
		const previousUrl = editor?.getAttributes("link").href
		const url = window.prompt("URL", previousUrl)

		// cancelled
		if (url === null) {
			return
		}

		// empty
		if (url === "") {
			editor?.chain().focus().extendMarkRange("link").unsetLink().run()

			return
		}

		// update link
		editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
	}, [editor])
	return (
		<div className="shadow-input flex w-full flex-col gap-4 rounded-md border-[1px] p-4">
			<div className="flex justify-evenly gap-[10px] rounded-md bg-[--SecondaryBackground] p-1">
				<button
					onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
					className={`w-fit rounded-md p-1 px-[24px] transition-all ${
						editor?.isActive("codeBlock") ? "bg-[--FillerBackground]" : ""
					}`}
				>
					<Icons name="CodeBlock" />
				</button>
				<button
					onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
					className={`w-fit rounded-md p-1 px-[24px] transition-all ${
						editor?.isActive("heading", { level: 4 }) ? "bg-[--FillerBackground]" : ""
					}`}
				>
					<Icons name="Heading" />
				</button>
				<button
					onClick={() => editor?.chain().focus().toggleBold().run()}
					disabled={!editor?.can().chain().focus().toggleBold().run()}
					className={`w-fit rounded-md p-1 px-[24px] transition-all ${editor?.isActive("bold") ? "bg-[--FillerBackground]" : ""} `}
				>
					<Icons name="Bold" />
				</button>
				<button
					onClick={setLink}
					className={`w-fit rounded-md p-1 px-[24px] transition-all ${editor?.isActive("link") ? "bg-[--FillerBackground]" : ""}`}
				>
					<Icons name="Link" />
				</button>
			</div>

			<EditorContent editor={editor} />
		</div>
	)
}
