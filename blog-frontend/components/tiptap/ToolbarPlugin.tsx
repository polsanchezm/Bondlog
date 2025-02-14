import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { useState, useEffect } from "react";
import { $getSelection, $isRangeSelection } from "lexical";
import { $createHeadingNode, $createParagraphNode } from "@lexical/rich-text";

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setActiveFormats({
            bold: selection.hasFormat("bold"),
            italic: selection.hasFormat("italic"),
            underline: selection.hasFormat("underline"),
            strikethrough: selection.hasFormat("strikethrough"),
          });
        }
      });
    });
  }, [editor]);

  const toggleFormat = (format: string) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const toggleHeading = (level: number) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      const anchor = selection.anchor.getNode();

      // Esta es una implementación simplificada.
      // Si el nodo actual es un encabezado del mismo nivel, lo convierte a párrafo;
      // de lo contrario, lo convierte a encabezado.
      if (anchor.getType() === "heading" && anchor.getTag() === `h${level}`) {
        anchor.replace($createParagraphNode());
      } else {
        anchor.replace($createHeadingNode(`h${level}`));
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <button
        type="button"
        onClick={() => toggleFormat("bold")}
        className={`px-2 py-1 border rounded ${
          activeFormats.bold ? "bg-gray-400 dark:bg-gray-900" : "bg-transparent"
        }`}
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => toggleFormat("italic")}
        className={`px-2 py-1 border rounded ${
          activeFormats.italic
            ? "bg-gray-400 dark:bg-gray-900"
            : "bg-transparent"
        }`}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => toggleFormat("underline")}
        className={`px-2 py-1 border rounded ${
          activeFormats.underline
            ? "bg-gray-400 dark:bg-gray-900"
            : "bg-transparent"
        }`}
      >
        <u>U</u>
      </button>
      <button
        type="button"
        onClick={() => toggleFormat("strikethrough")}
        className={`px-2 py-1 border rounded ${
          activeFormats.strikethrough
            ? "bg-gray-400 dark:bg-gray-900"
            : "bg-transparent"
        }`}
      >
        <del>S</del>
      </button>
      <button
        type="button"
        onClick={() => toggleHeading(1)}
        className="px-2 py-1 border rounded"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => toggleHeading(2)}
        className="px-2 py-1 border rounded"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => toggleHeading(3)}
        className="px-2 py-1 border rounded"
      >
        H3
      </button>
    </div>
  );
}

export default ToolbarPlugin;
