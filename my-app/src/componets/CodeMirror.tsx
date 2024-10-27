'use client';

import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';

const CodeMirrorEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

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

      return () => view.destroy(); // Cleanup
    }
  }, []);

  return (
    <div>
      <div ref={editorRef} />
      <button>実行</button>
    </div>
  );
};

export default CodeMirrorEditor;
