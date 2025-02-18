"use client";

import { type Editor } from "@tiptap/core";
import {
  Bold,
  Strikethrough,
  Italic,
  Heading2,
  Heading1,
  Heading3,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }
  return (
    <div className="border border-border bg-transparent rounded-lg mb-2 bg-gray-200 dark:bg-gray-700">
      <Toggle
        size={"lg"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 />
      </Toggle>
    </div>
  );
}
