'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { login } from '../lib/auth';
import { useRouter } from 'next/navigation';
import { topPageImage } from '../assets/images/topPageImage';

export default function Home(): JSX.Element {
  const [waiting, setWaiting] = useState<boolean>(false);
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/top');
    }
  }, [user, router]);

  const signIn = async (): Promise<void> => {
    setWaiting(true);
    try {
      await login();
      console.log('ログイン成功');
    } catch (error: any) {
      console.error('エラー:', error?.code || '不明なエラー');
    } finally {
      setWaiting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-40 pb-20"
      style={{
        backgroundColor: '#060038', // 背景色
        fontFamily: '"Silkscreen", monospace' // フォントの適用
      }}
    >
      {/* タイトル部分 */}
      <h1>
        {/* Base64エンコードされた画像を表示 */}
      <img src={topPageImage} alt="Monster" style={{ width: '40vw', height: 'auto',marginBottom:'10vh'}} />
      </h1>

      {/* 中の枠（カード） */}
      <div
        className="relative p-12 rounded-lg shadow-lg max-w-lg w-full flex flex-col items-center"
        style={{
          backgroundColor: '#151454', // 枠の色
          minHeight: '250px', // 最低の高さを指定
        }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: '#A7F002' }} // ログインタイトルのテキスト色
        >
          Welcome
        </h2>

        {/* 中央に配置されたボタン */}
        <button
          onClick={signIn}
          disabled={waiting}
          className={`relative w-60 py-4 mt-4 font-bold transition ${
            waiting ? 'cursor-not-allowed' : 'hover:scale-105'
          }`}
          style={{
            backgroundColor: '#3341DF', // ボタンの塗り色
            border: '2px solid transparent',
            borderImageSlice: 1,
            fontFamily: '"Silkscreen", monospace' // ボタンのフォント
          }}
        >
          <span
            className="text-center block"
            style={{ color: '#A7F002' }} // ボタン内テキストの色
          >
            {waiting ? 'Now Loading' : 'Sign in'}
          </span>
        </button>
      </div>

      {/* Sign up リンク */}
      <div className="mt-20">
        <a
          href="#"
          className="text-sm  hover:underline"
          style={{ fontFamily: '"Silkscreen", monospace' ,color: '#A7F002' }} // フォント適用
        >
          Sign up
        </a>
      </div>
    </div>
  );
}