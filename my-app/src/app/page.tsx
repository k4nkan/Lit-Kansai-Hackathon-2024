'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth'; 
import { login } from '../lib/auth';
import { useRouter } from 'next/navigation';

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
      className="min-h-screen flex flex-col items-center justify-center font-mono"
      style={{ backgroundColor: '#060038' }} // 背景色
    >
      {/* タイトル部分 */}
      <h1
        className="text-6xl font-bold mb-20"
        style={{ color: '#A7F002' }} // タイトルの色
      >
        Monster
      </h1>

      {/* 中の枠（カード） */}
      <div
        className="relative p-8 rounded-lg shadow-lg max-w-md w-full"
        style={{ backgroundColor: '#151454' }} // 枠の色
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: '#A7F002' }} // ログインタイトルのテキスト色
        >
          Log in
        </h2>

        <div className="mb-4 flex items-center">
          <span
            className="text-sm font-medium mr-2"
            style={{ color: '#F765A0' }} // ラベルのテキスト色
          >
            Now:
          </span>
          <span
            className="text-lg"
            style={{ color: '#F765A0' }} // 現在のログイン状態のテキスト色
          >
            {user ? user.name : 'Not Logged In'}
          </span>
        </div>

        <button
            onClick={signIn}
            disabled={waiting}
            className={`relative w-full py-4 mt-4 font-bold transition ${
              waiting ? 'cursor-not-allowed' : 'hover:scale-105'
            }`}
            style={{
              backgroundColor: '#3341DF', // ボタンの塗り色
              border: '2px solid transparent',
              borderImage:
                'linear-gradient(90deg, #00FFE6 8%, #B1FF00 50%, #90C400 100%)', // 縁のグラデーション
              borderImageSlice: 1,
              //clipPath: 'polygon(0% 50%, 10% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%)', // 六角形に近いカット
            }}
          >
            <span
              className="text-center block"
              style={{ color: '#A7F002' }} // ボタン内テキストの色
            >
              {waiting ? 'Now Loading' : 'Log in'}
            </span>
          </button>
      </div>
    </div>
  );
}