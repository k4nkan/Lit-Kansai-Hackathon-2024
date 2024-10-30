'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import { useAuth } from '../../../context/auth';
import { getEvent } from '../../../firebase/getEvent';

export default function Home() {
  const [waiting, setWaiting] = useState<boolean>(false);
  const router = useRouter();
  const user = useAuth();

  // 現在のイベント、イベントデータの保存先
  const event_now = 'event_1';
  const [eventData, setEventData] = useState<any>(null);

  // 未ログイン時トップに飛ばす
  useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [user, router]);

  if (user === null) {
    return <p>Loading...</p>;
  }

  // ページ表示時にイベント情報を取得
  useEffect(() => {
    const getEventData = async () => {
      try {
        const data = await getEvent(event_now);
        setEventData(data);
        console.log(data);
      } catch (error) {
        console.error('failed to get event data:', error);
      }
    };
    getEventData();
  }, [event_now]);

  //サインアウト
  const signOut = (e: React.MouseEvent) => {
    e.preventDefault();
    setWaiting(true);

    logout()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Logout error:', error?.code);
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  return (
    <div>
      <div>this is top page</div>
      <ul>
        <li>
          <Link href="/top">Top Page</Link>
        </li>
        <li>
          <Link href="/coding">Coding</Link>
        </li>
      </ul>
      <br />
      {eventData ? (
        <div>
          <div>start at:{eventData.start}</div>
          <div>end at:{eventData.end}</div>
          <div>theme:{eventData.theme}</div>
        </div>
      ) : (
        <div>now loading...</div>
      )}
      <br />
      <a href="/top" onClick={signOut}>
        {waiting ? 'now loading' : 'log out'}
      </a>
    </div>
  );
}
