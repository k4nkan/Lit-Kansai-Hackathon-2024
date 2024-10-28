'use client';

import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/client';
import useAuth from '../../firebase/useAuth';

const CodeMirrorEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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

  const saveCode = async (code: string) => {
    if (user && user.uid) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { code }, { merge: true });
      } catch (error) {
        console.error('保存できませんでした：', error);
      }
    } else {
      console.log('ログインしていません');
    }
  };

  return (
    <div>
      <div ref={editorRef} />
      <button onClick={() => saveCode('code')}>実行</button>
    </div>
  );
};

export default CodeMirrorEditor;
