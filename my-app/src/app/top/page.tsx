'use client';

import Header from '@/componets/hedder';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../../lib/auth';
import { useAuth } from '../../../context/auth';
import { getEvent } from '../../../firebase/getEvent';
import { checkParticipantsExists } from '../../../firebase/checkParticipantsExists';
import Dashboard from '@/componets/Dashboard';
import CardList from '@/componets/cardlist';
import ArchiveCardList from '@/componets/ArchiveCardList';
import { addGroup } from '../../../firebase/addGroup';

export default function Home() {
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();
  const user = useAuth();

  // 現在のイベント、イベントデータの保存先
  const event_now = 'event_1';
  const [group_now, setGroupnNow] = useState<any>(null);
  const [eventData, setEventData] = useState<any>(null);

  // 未ログイン時トップに飛ばす
  useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [user, router]);

  // ページ表示時にイベント情報を取得
  useEffect(() => {
    const getEventData = async () => {
      // イベントデータをeventDataに保存
      try {
        const data = await getEvent(event_now);
        setEventData(data);
        console.log(data);
      } catch (error) {
        console.error('failed to get event data:', error);
      }
      // uidをもとにグループに参加済みか判断
      if (user?.uid) {
        const eventGroup = await checkParticipantsExists(event_now, user.uid);
        console.log(user.uid + 'のグループは' + eventGroup);
        setGroupnNow(eventGroup);
      } else {
        setGroupnNow(null);
      }
    };
    getEventData();
  }, [user, event_now]);

  // group_nowに応じたページ遷移の処理
  const handleMoveToCoding = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (group_now === null) {
      if (user?.uid) {
        console.log('グループ未参加のため参加処理を実行します');
        addGroup(user?.uid, event_now);
        router.push('/coding');
      }
    } else {
      router.push('/coding');
    }
  };

  //サインアウト
  const signOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    setWaiting(true);

    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: '#060038', color: '#FFFFFF', padding: '20px' }}
    >
      {user === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <Header />
          </div>
          <div style={{ marginBottom: '200px' }}>
            <Dashboard />
          </div>
          <div style={{ marginBottom: '200px' }}>
            <CardList />
          </div>
          <div style={{ marginBottom: '200px' }}>
            <ArchiveCardList />
          </div>
          <ul style={{ marginBottom: '20px' }}>
            <li>
              <a href="/coding" onClick={handleMoveToCoding}>
                Coding
              </a>
            </li>
          </ul>
          {eventData ? (
            <div style={{ marginBottom: '20px' }}>
              <div>start at: {eventData.start}</div>
              <div>end at: {eventData.end}</div>
              <div>theme: {eventData.theme}</div>
            </div>
          ) : (
            <div style={{ marginBottom: '20px' }}>now loading...</div>
          )}
          <button onClick={signOut}>
            {waiting ? 'now loading' : 'log out'}
          </button>
        </>
      )}
    </div>
  );
}
