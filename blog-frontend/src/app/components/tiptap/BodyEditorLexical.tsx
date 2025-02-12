"use client";

import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $generateHtmlFromNodes,
  $convertHtmlStringToNodes,
} from "@lexical/html";
import { $getRoot } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import ToolbarPlugin from "./ToolbarPlugin";

interface BodyEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const theme = {
  // Puedes definir aquí los estilos para las clases internas de Lexical.
};

const BodyEditor = ({ value, onChange }: BodyEditorProps) => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError: (error: Error) => {
      throw error;
    },
    // Incluir los nodos que vayas a usar, por ejemplo el HeadingNode para encabezados:
    nodes: [HeadingNode],
  };

  // Plugin para enviar el HTML generado cada vez que cambia el contenido.
  function OnChangeHandler() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          onChange(htmlString);
        });
      });
    }, [editor, onChange]);

    return null;
  }

  // Plugin para actualizar el contenido del editor cuando la prop "value" cambie.
  // Se usa la función de conversión de HTML a nodos.
  function UpdateContentPlugin({ value }: { value: string }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      editor.update(() => {
        // Convierte el HTML recibido a nodos de Lexical
        const parser = new DOMParser();
        parser.parseFromString(value, "text/html"); // Se podría usar si necesitas parsear algún dato extra
        const nodes = $convertHtmlStringToNodes(value, editor);
        $getRoot().clear();
        nodes.forEach((node: any) => {
          $getRoot().append(node);
        });
      });
    }, [value, editor]);

    return null;
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className="w-full p-3 mt-1 text-sm rounded-lg border border-gray-300
                   dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                   text-gray-900 dark:text-white focus:ring-primary-500
                   focus:border-primary-500 transition"
      >
        {/* Barra de herramientas personalizada */}
        <ToolbarPlugin />

        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="w-full p-3 mt-1 text-sm rounded-lg border transition whitespace-pre-wrap break-all" />
            }
            placeholder={
              <div className="editor-placeholder">Enter post body...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangeHandler />
          <UpdateContentPlugin value={value || "<p></p>"} />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default BodyEditor;
