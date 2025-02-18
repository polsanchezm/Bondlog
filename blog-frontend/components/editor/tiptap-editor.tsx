"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "@/components/editor/toolbar-editor";
import Heading from "@tiptap/extension-heading";
export default function TipTap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {},
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-lg min-h-[150px] border border-border bg-back",
      },
    },
    onUpdate({ editor }: { editor: Editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-neutral dark:prose-invert rounded-lg bg-gray-200 dark:bg-gray-700"
      />
    </div>
  );
}
