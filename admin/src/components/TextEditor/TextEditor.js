import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import "./textEditor.scss";
import {
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiBold,
  BiCode,
  BiHeading,
  BiItalic,
  BiListOl,
  BiListUl,
  BiParagraph,
  BiRedo,
  BiStrikethrough,
  BiUndo,
} from "react-icons/bi";
import { GrBlockQuote } from "react-icons/gr";
import { GoHorizontalRule } from "react-icons/go";
import ReactTooltip from "react-tooltip";
import UseFormContext from "../../hooks/UseFormContext";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBarContainer">
      <ReactTooltip place="bottom" html={true} />
      <div className="menuBar">
        <div className="left">
          <button
            type="button"
            data-tip="<strong>Bold</strong>"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <BiBold />
          </button>
          <button
            type="button"
            data-tip="<em>Italic</em>"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <BiItalic />
          </button>
          <button
            type="button"
            data-tip="<s>Strike through</s>"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <BiStrikethrough />
          </button>
          <button
            type="button"
            data-tip="<code>Code</code>"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            <BiCode />
          </button>
          <button
            type="button"
            data-tip="<span>Align Left</span>"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            <BiAlignLeft />
          </button>
          <button
            type="button"
            data-tip="<span>Align Center</span>"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            <BiAlignMiddle />
          </button>
          <button
            type="button"
            data-tip="<span>Align Right</span>"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            <BiAlignRight />
          </button>
        </div>
        <div className="middle">
          <button
            type="button"
            data-tip="<span>Paragraph</span>"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            <BiParagraph />
          </button>
          <button
            type="button"
            data-tip="<span>Heading</span>"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            <BiHeading />
          </button>
          <button
            type="button"
            data-tip="<span>Bullet List</span>"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <BiListUl />
          </button>
          <button
            type="button"
            data-tip="<span>Number List</span>"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <BiListOl />
          </button>

          <button
            type="button"
            data-tip="<span>Block Quote</span>"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            <GrBlockQuote />
          </button>
          <button
            type="button"
            data-tip="<span>Horizontal Rule</span>"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <GoHorizontalRule />
          </button>
        </div>
        <div className="right">
          <button
            type="button"
            data-tip="<span>Undo</span>"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <BiUndo />
          </button>
          <button
            type="button"
            data-tip="<span>Redo</span>"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <BiRedo />
          </button>
        </div>
      </div>
    </div>
  );
};

const TextEditor = () => {
  const { setData, output, setOutput } = UseFormContext();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `${output}`,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setData((prevData) => ({ ...prevData, description: html }));
      setOutput(html);
    },
  });
  return (
    <>
      <div className="textEditorContainer">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} name="description" />
      </div>
    </>
  );
};

export default TextEditor;
