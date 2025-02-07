"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import HardBreak from "@tiptap/extension-hard-break";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";

import { useEffect, useRef } from "react";
import type { Editor } from "@tiptap/core";

interface BodyEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function BodyEditor({ value, onChange }: BodyEditorProps) {
  const isUpdatingFromEditor = useRef(false);

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      HardBreak,
      Bold,
      Paragraph,
      Italic,
      Underline,
      Strike,
      Placeholder.configure({ placeholder: "Enter post body..." }),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: value || "",
    onUpdate({ editor }: { editor: Editor }) {
      isUpdatingFromEditor.current = true;
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && !isUpdatingFromEditor.current && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
    isUpdatingFromEditor.current = false;
  }, [value, editor]);

  if (!editor) return <div>Cargando editor...</div>;

  return (
    <div
      className="w-full p-3 mt-1 text-sm rounded-lg border border-gray-300
                    dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                    text-gray-900 dark:text-white focus:ring-primary-500
                    focus:border-primary-500 transition"
    >
      {/* Barra de herramientas personalizada */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("bold")
              ? "bg-gray-400 dark:bg-gray-900"
              : "bg-transparent"
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("italic")
              ? "bg-gray-400 dark:bg-gray-900"
              : "bg-transparent"
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("underline")
              ? "bg-gray-400 dark:bg-gray-900"
              : "bg-transparent"
          }`}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("strike")
              ? "bg-gray-400 dark:bg-gray-900"
              : "bg-transparent"
          }`}
        >
          <del>S</del>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-2 py-1 border rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-400 dark:bg-gray-900"
              : "bg-transparent"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-2 py-1 border rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-400 dark:bg-gray-900"
              : "bg-transparent"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-2 py-1 border rounded ${
            editor.isActive("heading", { level: 3 })
              ? "bg-gray-400 dark:bg-gray-900"
              : "bg-transparent"
          }`}
        >
          H3
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="w-full p-3 mt-1 text-sm rounded-lg border transition
                   whitespace-pre-wrap break-all"
      />
    </div>
  );
}
