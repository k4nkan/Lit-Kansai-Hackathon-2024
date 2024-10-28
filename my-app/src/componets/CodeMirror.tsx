'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import useAuth from '../../firebase/useAuth';
import { useRouter } from 'next/navigation';
import { saveCode } from '../../firebase/saveCode';
import { getCode } from '../../firebase/getCode';

const CodeMirrorEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null); 
  const router = useRouter();
  const { user } = useAuth(router);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [code, setCode] = useState<string>(''); 
  const [consoleOutput, setConsoleOutput] = useState<string>('');

  // エディタの初期化
  useEffect(() => {
    const loadCode = async () => {
      if (!user) return;
      const savedCode = await getCode(user.id);
      const initialDoc = savedCode || ''; 

      if (editorRef.current) {
        const state = EditorState.create({
          doc: initialDoc,
          extensions: [
            javascript(),
            EditorView.lineWrapping,
            keymap.of(defaultKeymap),
            EditorView.editable.of(true),
          ],
        });

        const view = new EditorView({
          state,
          parent: editorRef.current,
        });

        setEditorView(view);
        setCode(initialDoc);

        return () => view.destroy();
      }
    };

    loadCode();
  }, [user]);

  // コードの保存
  const handleSaveCode = async () => {
    if (user && editorView) {
      const newCode = editorView.state.doc.toString();
      await saveCode(newCode, user.id);
      setCode(newCode);
    } else {
      console.log('ログインしていません');
    }
  };

  // コードの実行
  const handleExecuteCode = () => {
    if (iframeRef.current) {
      // iframeをリセット
      iframeRef.current.src = 'about:blank';
      setTimeout(() => {
        loadSketchIntoIframe();
      }, 50);
    }
  };

  // iframeにスケッチをロード
  const loadSketchIntoIframe = () => {
    const userCode = editorView?.state.doc.toString() || ''; // ユーザーが入力したコードを取得

    const sketch = `
      <html>
        <head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
        </head>
        <body>
          <script>
            try {
              console.log('p5.jsのコードが実行されました');
              eval(\`${userCode}\`); // ユーザーコードをevalで実行
            } catch (error) {
              console.error('実行時エラー:', error);
              parent.postMessage({ type: 'error', message: error.message }, '*');
            }
          </script>
        </body>
      </html>
    `;

    const iframe = iframeRef.current;
    if (iframe) {
      console.log('iframeにHTMLを書き込みます');
      iframe.contentWindow?.document.open();
      iframe.contentWindow?.document.write(sketch);
      iframe.contentWindow?.document.close();
      console.log('iframeへの書き込みが完了しました');
    }
  };

  // メッセージの受信
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('メッセージを受信:', event.data);
      if (event.data.type === 'log' || event.data.type === 'error') {
        setConsoleOutput((prev) => `${prev}\n${event.data.message}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // コンソールのクリア
  const handleClearConsole = () => setConsoleOutput('');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          width: '50%',
          backgroundColor: '#1e1e1e',
          color: '#fff',
          padding: '10px',
        }}
      >
        <div ref={editorRef} style={{ height: '70%', overflow: 'auto' }} />
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
          <button onClick={handleSaveCode}>SAVE</button>
          <button onClick={handleExecuteCode}> PLAY </button>
        </div>

        <div
          style={{
            marginTop: '20px',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            height: '20%',
            overflow: 'auto',
            fontFamily: '"Silkscreen", monospace'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>CONSOLE:</strong>
            <button onClick={handleClearConsole}>CLEAR</button>
          </div>
          <pre>{consoleOutput}</pre>
        </div>
      </div>

      <iframe
        id="preview"
        ref={iframeRef}
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: '50%',
          height: '100%',
          border: 'none',
          backgroundColor: '#fff',
          fontFamily: '"Silkscreen", monospace',
        }}
      ></iframe>
    </div>
  );
};

export default CodeMirrorEditor;