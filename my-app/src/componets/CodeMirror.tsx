'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorView, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from '@codemirror/language';
import useAuth from '../../firebase/useAuth';
import { useRouter } from 'next/navigation';
import { saveCode } from '../../firebase/saveCode';
import { getCode } from '../../firebase/getCode';

const customLineNumberTheme = EditorView.theme({
  '.cm-lineNumbers': {
    backgroundColor: '#271D42',
    fontFamily: '"Silkscreen", monospace',
    color: 'white',
    fontSize: '16px',
    paddingRight: '5px',
    width: '35px',
  },
  '.cm-gutters': {
    width: '35px',
  },
});

// カスタムハイライトカラー（白の透明度を下げた色）
const customHighlightTheme = EditorView.theme({
  ".cm-activeLine": {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // 白の透明度を10%に設定
  },
});

const customEditorTheme = EditorView.theme({
  '.cm-content': {
    backgroundColor: '#271D42',
    color: 'white',
    fontFamily: 'monospace',
  },
});

interface CodeMirrorEditorProps {
  event_now: string;
  group_now: string;
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ event_now, group_now }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const { user } = useAuth(router);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [code, setCode] = useState<string>('');
  const [consoleOutput, setConsoleOutput] = useState<string>('');

  useEffect(() => {
    const loadCode = async () => {
      if (!user) return;
      const savedCode = await getCode(user.uid, event_now);
      const initialDoc = savedCode || '';

      if (editorRef.current) {
        const state = EditorState.create({
          doc: initialDoc,
          extensions: [
            javascript(),
            lineNumbers(),
            highlightActiveLine(),
            syntaxHighlighting(defaultHighlightStyle),
            customHighlightTheme, // カスタムテーマを追加
            customLineNumberTheme,
            customEditorTheme,
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

  const handleSaveCode = async () => {
    if (user && editorView) {
      const newCode = editorView.state.doc.toString();
      await saveCode(newCode, user.uid, group_now, event_now);
      setCode(newCode);
    } else {
      console.log('ログインしていません');
    }
  };

  const handleExecuteCode = () => {
    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank';
      setTimeout(() => {
        loadSketchIntoIframe();
      }, 50);
    }
  };

  const loadSketchIntoIframe = () => {
    const userCode = editorView?.state.doc.toString() || '';

    const sketch = `
      <html>
        <head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
        </head>
        <body>
          <script>
            try {
              console.log('p5.jsのコードが実行されました');
              eval(\`${userCode}\`);
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
      iframe.contentWindow?.document.open();
      iframe.contentWindow?.document.write(sketch);
      iframe.contentWindow?.document.close();
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'log' || event.data.type === 'error') {
        setConsoleOutput((prev) => `${prev}\n${event.data.message}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleClearConsole = () => setConsoleOutput('');

  return (
    <div
      style={{
        display: 'flex',
        height: '80vh',
        padding: '20px',
        gap: '20px',
        backgroundColor: '#060038',
      }}
    >
      {/* 左側の情報セクション */}
      <div
        style={{
          width: '20%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'relative',
        }}
      >
        {/* 2 DAYS LEFT ボタン */}
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            left: '20px',
            backgroundColor: '#3341DF',
            color: '#A7F002',
            padding: '10px 15px',
            borderRadius: '8px',
            fontFamily: 'Silkscreen, monospace',
            fontWeight: 'bold',
            fontSize: '20px',
            zIndex: '10',
          }}
        >
          2 DAYS LEFT
        </div>

        <div
          style={{
            padding: '20px',
            paddingTop: '50px',
            height: '30vh',
            backgroundColor: '#271D42',
            clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
            width: '20vw',
          }}
        >
          <h1
            style={{
              fontFamily: 'Suez One',
              fontSize: '80px',
              color: '#A7F002',
              textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
              letterSpacing: '2px',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              margin: 0,
              lineHeight: '0.8',
              marginBottom: '20px',
            }}
          >
            STAR
          </h1>
          <p style={{ color: '#fff' }}>
            <span style={{ color: '#3242DC' }}>FROM:</span>
            <span style={{ color: '#A7F002' }}> 10/28</span>
          </p>
          <p style={{ color: '#fff' }}>
            <span style={{ color: '#3242DC' }}>TO:</span>
            <span style={{ color: '#A7F002' }}> 10/31</span>
          </p>
        </div>

        {/* 自分のプレビュー表示 */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            height: '20vh',
          }}
        >
          <div style={{ marginBottom: '10px', color: '#fff' }}>
            <strong className="user-name">Name: ユーザー1</strong>
            <iframe
              style={{
                width: '100%',
                height: '8vh',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
              srcDoc={`
                <html>
                  <head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
                  </head>
                  <body>
                    <script>
                      try {
                        ${code}
                      } catch (error) {
                        console.error('プレビューエラー:', error);
                      }
                    </script>
                  </body>
                </html>
              `}
            ></iframe>
          </div>
          <div style={{ marginBottom: '10px', color: '#fff' }}>
            <strong className="user-name">Name: ユーザー2</strong>
            <iframe
              style={{
                width: '100%',
                height: '8vh',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
              srcDoc={`
                <html>
                  <head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
                  </head>
                  <body>
                    <script>
                      try {
                        ${code}
                      } catch (error) {
                        console.error('プレビューエラー:', error);
                      }
                    </script>
                  </body>
                </html>
              `}
            ></iframe>
          </div>
          <div style={{ marginBottom: '10px', color: '#fff' }}>
            <strong className="user-name">Name: ユーザー3</strong>
            <iframe
              style={{
                width: '100%',
                height: '8vh',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
              srcDoc={`
                <html>
                  <head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
                  </head>
                  <body>
                    <script>
                      try {
                        ${code}
                      } catch (error) {
                        console.error('プレビューエラー:', error);
                      }
                    </script>
                  </body>
                </html>
              `}
            ></iframe>
          </div>
        </div>
      </div>

      {/* エディタ部分 */}
      <div
        style={{
          width: '40%',
          backgroundColor: '#151454',
          padding: '30px',
          borderRadius: '8px',
          border: '2px solid #F765A0',
        }}
      >
        <div
          ref={editorRef}
          style={{
            height: '70%',
            overflow: 'auto',
            backgroundColor: '#271D42',
            borderRadius: '8px',
            padding: '10px',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          <button
            style={{
              backgroundColor: '#3341DF',
              color: '#A7F002',
              border: 'none',
              padding: '5px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={handleSaveCode}
          >
            SAVE
          </button>
          <button
            style={{
              backgroundColor: '#3341DF',
              color: '#A7F002',
              border: 'none',
              padding: '5px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={handleExecuteCode}
          >
            PLAY
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#1E1438',
            padding: '10px',
            borderRadius: '8px',
            marginTop: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ color: 'white', fontSize: '14px' }}>
              CONSOLE
            </strong>
            <button
              style={{ color: 'white', fontSize: '14px' }}
              onClick={handleClearConsole}
            >
              CLEAR
            </button>
          </div>
        </div>

        <pre
          style={{
            backgroundColor: '#271D42',
            padding: '20px',
            color: 'white',
            height: '20px',
            overflowY: 'auto',
          }}
        >
          {consoleOutput}
        </pre>
      </div>

      <iframe
        id="preview"
        ref={iframeRef}
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: '40%',
          height: '100%',
          borderRadius: '8px',
          backgroundColor: '#151454',
          marginLeft: '10px',
        }}
      ></iframe>
    </div>
  );
};

export default CodeMirrorEditor;