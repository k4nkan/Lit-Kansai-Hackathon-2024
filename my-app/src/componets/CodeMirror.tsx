// components/CodeMirrorEditor.tsx
import { memo, useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "@codemirror/basic-setup";

export const CodeMirrorEditor = memo(() => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: '// ここにコードを入力', // 初期コードを設定
      extensions: [basicSetup],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, []);

  return <div ref={editorRef} />;
});
