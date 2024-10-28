'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';

import useAuth from '../../firebase/useAuth';
import { useRouter } from 'next/navigation';
import { saveCode } from '../../firebase/saveCode';

const CodeMirrorEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useAuth(router);
  const [editorView, setEditorView] = useState<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const state = EditorState.create({
        doc: '// p5.js code goes here...\n\nfunction setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n}',
        extensions: [basicSetup, javascript()],
      });

      const view = new EditorView({
        state,
        parent: editorRef.current,
      });

      setEditorView(view);
      return () => view.destroy();
    }
  }, []);

  const handleSaveCode = async () => {
    if (user && editorView) {
      const code = editorView.state.doc.toString();
      await saveCode(code, user.id);
    } else {
      console.log('ログインしていません');
    }
  };

  return (
    <div>
      <div ref={editorRef} />
      <button onClick={handleSaveCode}>実行</button>
    </div>
  );
};

export default CodeMirrorEditor;
